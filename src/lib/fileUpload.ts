import { supabase } from './supabase';
import { ocrService } from './ocr';
import { FileUpload } from '../types/pkm';

export class FileUploadService {
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
  }

  /**
   * Upload file to Supabase storage
   */
  async uploadFile(file: File, folder = 'uploads'): Promise<{ upload: FileUpload | null; error: string | null }> {
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${this.userId}/${Date.now()}.${fileExt}`;
      const filePath = `${folder}/${fileName}`;

      // Upload to Supabase storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('pkm-files')
        .upload(filePath, file);

      if (uploadError) {
        return { upload: null, error: uploadError.message };
      }

      // Process OCR if it's an image or PDF
      let ocrText = '';
      if (file.type.startsWith('image/') || file.type === 'application/pdf') {
        const { text, error: ocrError } = await ocrService.processFile(file);
        if (!ocrError) {
          ocrText = text;
        }
      }

      // Save file metadata to database
      const { data: fileRecord, error: dbError } = await supabase
        .from('file_uploads')
        .insert({
          user_id: this.userId,
          filename: file.name,
          file_path: uploadData.path,
          file_type: file.type,
          file_size: file.size,
          ocr_text: ocrText || null,
        })
        .select()
        .single();

      if (dbError) {
        return { upload: null, error: dbError.message };
      }

      return { upload: fileRecord, error: null };
    } catch (error) {
      console.error('File upload error:', error);
      return { upload: null, error: 'Failed to upload file' };
    }
  }

  /**
   * Get user's uploaded files
   */
  async getUserFiles(): Promise<{ files: FileUpload[]; error: string | null }> {
    try {
      const { data: files, error } = await supabase
        .from('file_uploads')
        .select('*')
        .eq('user_id', this.userId)
        .order('created_at', { ascending: false });

      if (error) {
        return { files: [], error: error.message };
      }

      return { files: files || [], error: null };
    } catch (error) {
      console.error('Error fetching files:', error);
      return { files: [], error: 'Failed to fetch files' };
    }
  }

  /**
   * Delete uploaded file
   */
  async deleteFile(fileId: string): Promise<{ error: string | null }> {
    try {
      // Get file info first
      const { data: file, error: fetchError } = await supabase
        .from('file_uploads')
        .select('file_path')
        .eq('id', fileId)
        .eq('user_id', this.userId)
        .single();

      if (fetchError) {
        return { error: fetchError.message };
      }

      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('pkm-files')
        .remove([file.file_path]);

      if (storageError) {
        console.error('Storage deletion error:', storageError);
      }

      // Delete from database
      const { error: dbError } = await supabase
        .from('file_uploads')
        .delete()
        .eq('id', fileId)
        .eq('user_id', this.userId);

      if (dbError) {
        return { error: dbError.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Error deleting file:', error);
      return { error: 'Failed to delete file' };
    }
  }

  /**
   * Get file download URL
   */
  async getFileUrl(filePath: string): Promise<{ url: string | null; error: string | null }> {
    try {
      const { data, error } = await supabase.storage
        .from('pkm-files')
        .createSignedUrl(filePath, 3600); // 1 hour expiry

      if (error) {
        return { url: null, error: error.message };
      }

      return { url: data.signedUrl, error: null };
    } catch (error) {
      console.error('Error getting file URL:', error);
      return { url: null, error: 'Failed to get file URL' };
    }
  }
}