import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database schema types
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          name: string;
          subscription_tier: 'free' | 'pro' | 'enterprise';
          subscription_status: 'active' | 'inactive' | 'cancelled';
          stripe_customer_id?: string;
          encryption_key?: string;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          email: string;
          name: string;
          subscription_tier?: 'free' | 'pro' | 'enterprise';
          subscription_status?: 'active' | 'inactive' | 'cancelled';
          stripe_customer_id?: string;
          encryption_key?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string;
          subscription_tier?: 'free' | 'pro' | 'enterprise';
          subscription_status?: 'active' | 'inactive' | 'cancelled';
          stripe_customer_id?: string;
          encryption_key?: string;
          updated_at?: string;
        };
      };
      notes: {
        Row: {
          id: string;
          user_id: string;
          title: string;
          content: string;
          encrypted_content?: string;
          tags: string[];
          blockchain_hash?: string;
          file_attachments?: string[];
          is_encrypted: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          title: string;
          content: string;
          encrypted_content?: string;
          tags?: string[];
          blockchain_hash?: string;
          file_attachments?: string[];
          is_encrypted?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          title?: string;
          content?: string;
          encrypted_content?: string;
          tags?: string[];
          blockchain_hash?: string;
          file_attachments?: string[];
          is_encrypted?: boolean;
          updated_at?: string;
        };
      };
      blockchain_blocks: {
        Row: {
          id: string;
          user_id: string;
          note_id: string;
          encrypted_data: string;
          hash: string;
          previous_hash: string;
          timestamp: number;
          signature: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          note_id: string;
          encrypted_data: string;
          hash: string;
          previous_hash: string;
          timestamp: number;
          signature: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          note_id?: string;
          encrypted_data?: string;
          hash?: string;
          previous_hash?: string;
          timestamp?: number;
          signature?: string;
        };
      };
      file_uploads: {
        Row: {
          id: string;
          user_id: string;
          filename: string;
          file_path: string;
          file_type: string;
          file_size: number;
          ocr_text?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          filename: string;
          file_path: string;
          file_type: string;
          file_size: number;
          ocr_text?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          filename?: string;
          file_path?: string;
          file_type?: string;
          file_size?: number;
          ocr_text?: string;
        };
      };
    };
  };
}