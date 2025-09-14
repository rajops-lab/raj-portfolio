/*
  # PKM System Database Schema

  1. New Tables
    - `users` - User profiles and subscription information
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `name` (text)
      - `subscription_tier` (enum: free, pro, enterprise)
      - `subscription_status` (enum: active, inactive, cancelled)
      - `stripe_customer_id` (text, optional)
      - `encryption_key` (text, encrypted user key)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `notes` - User notes with blockchain integration
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `title` (text)
      - `content` (text)
      - `encrypted_content` (text, optional)
      - `tags` (text array)
      - `blockchain_hash` (text, optional)
      - `file_attachments` (text array, optional)
      - `is_encrypted` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `blockchain_blocks` - Blockchain storage for notes
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `note_id` (uuid, foreign key)
      - `encrypted_data` (text)
      - `hash` (text)
      - `previous_hash` (text)
      - `timestamp` (bigint)
      - `signature` (text)
      - `created_at` (timestamp)
    
    - `file_uploads` - File upload tracking with OCR
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key)
      - `filename` (text)
      - `file_path` (text)
      - `file_type` (text)
      - `file_size` (integer)
      - `ocr_text` (text, optional)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to access only their own data
    - Create indexes for performance optimization

  3. Storage
    - Create storage bucket for file uploads
    - Set up storage policies for user access
*/

-- Create custom types
CREATE TYPE subscription_tier AS ENUM ('free', 'pro', 'enterprise');
CREATE TYPE subscription_status AS ENUM ('active', 'inactive', 'cancelled');

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  name text NOT NULL,
  subscription_tier subscription_tier DEFAULT 'free',
  subscription_status subscription_status DEFAULT 'active',
  stripe_customer_id text,
  encryption_key text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Notes table
CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL DEFAULT '',
  encrypted_content text,
  tags text[] DEFAULT '{}',
  blockchain_hash text,
  file_attachments text[] DEFAULT '{}',
  is_encrypted boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Blockchain blocks table
CREATE TABLE IF NOT EXISTS blockchain_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  note_id uuid NOT NULL REFERENCES notes(id) ON DELETE CASCADE,
  encrypted_data text NOT NULL,
  hash text NOT NULL,
  previous_hash text NOT NULL,
  timestamp bigint NOT NULL,
  signature text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- File uploads table
CREATE TABLE IF NOT EXISTS file_uploads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  filename text NOT NULL,
  file_path text NOT NULL,
  file_type text NOT NULL,
  file_size integer NOT NULL,
  ocr_text text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE blockchain_blocks ENABLE ROW LEVEL SECURITY;
ALTER TABLE file_uploads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for users table
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- RLS Policies for notes table
CREATE POLICY "Users can read own notes"
  ON notes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own notes"
  ON notes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes"
  ON notes
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes"
  ON notes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- RLS Policies for blockchain_blocks table
CREATE POLICY "Users can read own blockchain blocks"
  ON blockchain_blocks
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own blockchain blocks"
  ON blockchain_blocks
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- RLS Policies for file_uploads table
CREATE POLICY "Users can read own file uploads"
  ON file_uploads
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own file uploads"
  ON file_uploads
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own file uploads"
  ON file_uploads
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_notes_user_id ON notes(user_id);
CREATE INDEX IF NOT EXISTS idx_notes_tags ON notes USING GIN(tags);
CREATE INDEX IF NOT EXISTS idx_notes_updated_at ON notes(updated_at DESC);
CREATE INDEX IF NOT EXISTS idx_blockchain_blocks_user_id ON blockchain_blocks(user_id);
CREATE INDEX IF NOT EXISTS idx_blockchain_blocks_note_id ON blockchain_blocks(note_id);
CREATE INDEX IF NOT EXISTS idx_blockchain_blocks_timestamp ON blockchain_blocks(timestamp DESC);
CREATE INDEX IF NOT EXISTS idx_file_uploads_user_id ON file_uploads(user_id);

-- Create storage bucket for file uploads
INSERT INTO storage.buckets (id, name, public) 
VALUES ('pkm-files', 'pkm-files', false)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Users can upload own files"
  ON storage.objects
  FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'pkm-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can read own files"
  ON storage.objects
  FOR SELECT
  TO authenticated
  USING (bucket_id = 'pkm-files' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can delete own files"
  ON storage.objects
  FOR DELETE
  TO authenticated
  USING (bucket_id = 'pkm-files' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers for updated_at
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_notes_updated_at
  BEFORE UPDATE ON notes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();