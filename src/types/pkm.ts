export interface User {
  id: string;
  email: string;
  name: string;
  subscription_tier: 'free' | 'pro' | 'enterprise';
  subscription_status: 'active' | 'inactive' | 'cancelled';
  created_at: string;
  updated_at: string;
  encryption_key?: string;
}

export interface Note {
  id: string;
  user_id: string;
  title: string;
  content: string;
  encrypted_content?: string;
  tags: string[];
  blockchain_hash?: string;
  file_attachments?: string[];
  created_at: string;
  updated_at: string;
  is_encrypted: boolean;
}

export interface BlockchainBlock {
  id: string;
  user_id: string;
  note_id: string;
  encrypted_data: string;
  hash: string;
  previous_hash: string;
  timestamp: number;
  signature: string;
}

export interface FileUpload {
  id: string;
  user_id: string;
  filename: string;
  file_path: string;
  file_type: string;
  file_size: number;
  ocr_text?: string;
  created_at: string;
}

export interface SearchResult {
  note: Note;
  relevance: number;
  matchedContent: string[];
  matchedTags: string[];
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  price: number;
  interval: 'month' | 'year';
  features: string[];
  max_notes: number;
  max_storage_mb: number;
  stripe_price_id: string;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}