import { supabase } from './supabase';
import { PKMBlockchain } from './blockchain';
import { Note, SearchResult } from '../types/pkm';
import Fuse from 'fuse.js';

export class NotesService {
  private blockchain: PKMBlockchain;
  private userId: string;

  constructor(userId: string) {
    this.userId = userId;
    this.blockchain = new PKMBlockchain(userId);
  }

  /**
   * Create a new note
   */
  async createNote(
    title: string,
    content: string,
    tags: string[] = [],
    encryptionKey?: string
  ): Promise<{ note: Note | null; error: string | null }> {
    try {
      const noteData = {
        user_id: this.userId,
        title,
        content,
        tags,
        is_encrypted: !!encryptionKey,
      };

      const { data: note, error } = await supabase
        .from('notes')
        .insert(noteData)
        .select()
        .single();

      if (error) {
        return { note: null, error: error.message };
      }

      // Store in blockchain if encryption key provided
      if (encryptionKey) {
        try {
          const block = await this.blockchain.createBlock(note, encryptionKey);
          
          // Update note with blockchain hash
          await supabase
            .from('notes')
            .update({ blockchain_hash: block.hash })
            .eq('id', note.id);

          note.blockchain_hash = block.hash;
        } catch (blockchainError) {
          console.error('Blockchain storage failed:', blockchainError);
          // Note is still created, just not on blockchain
        }
      }

      return { note, error: null };
    } catch (error) {
      console.error('Error creating note:', error);
      return { note: null, error: 'Failed to create note' };
    }
  }

  /**
   * Get all notes for user
   */
  async getNotes(page = 1, limit = 20): Promise<{
    notes: Note[];
    total: number;
    error: string | null;
  }> {
    try {
      const offset = (page - 1) * limit;

      const { data: notes, error, count } = await supabase
        .from('notes')
        .select('*', { count: 'exact' })
        .eq('user_id', this.userId)
        .order('updated_at', { ascending: false })
        .range(offset, offset + limit - 1);

      if (error) {
        return { notes: [], total: 0, error: error.message };
      }

      return { notes: notes || [], total: count || 0, error: null };
    } catch (error) {
      console.error('Error fetching notes:', error);
      return { notes: [], total: 0, error: 'Failed to fetch notes' };
    }
  }

  /**
   * Get a specific note by ID
   */
  async getNote(noteId: string): Promise<{ note: Note | null; error: string | null }> {
    try {
      const { data: note, error } = await supabase
        .from('notes')
        .select('*')
        .eq('id', noteId)
        .eq('user_id', this.userId)
        .single();

      if (error) {
        return { note: null, error: error.message };
      }

      return { note, error: null };
    } catch (error) {
      console.error('Error fetching note:', error);
      return { note: null, error: 'Failed to fetch note' };
    }
  }

  /**
   * Update a note
   */
  async updateNote(
    noteId: string,
    updates: Partial<Note>,
    encryptionKey?: string
  ): Promise<{ note: Note | null; error: string | null }> {
    try {
      const { data: note, error } = await supabase
        .from('notes')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', noteId)
        .eq('user_id', this.userId)
        .select()
        .single();

      if (error) {
        return { note: null, error: error.message };
      }

      // Update blockchain if encryption key provided
      if (encryptionKey && note) {
        try {
          await this.blockchain.createBlock(note, encryptionKey);
        } catch (blockchainError) {
          console.error('Blockchain update failed:', blockchainError);
        }
      }

      return { note, error: null };
    } catch (error) {
      console.error('Error updating note:', error);
      return { note: null, error: 'Failed to update note' };
    }
  }

  /**
   * Delete a note
   */
  async deleteNote(noteId: string): Promise<{ error: string | null }> {
    try {
      const { error } = await supabase
        .from('notes')
        .delete()
        .eq('id', noteId)
        .eq('user_id', this.userId);

      if (error) {
        return { error: error.message };
      }

      return { error: null };
    } catch (error) {
      console.error('Error deleting note:', error);
      return { error: 'Failed to delete note' };
    }
  }

  /**
   * Search notes using Fuse.js
   */
  async searchNotes(query: string): Promise<{ results: SearchResult[]; error: string | null }> {
    try {
      const { notes, error } = await this.getNotes(1, 1000); // Get all notes for search

      if (error) {
        return { results: [], error };
      }

      const fuse = new Fuse(notes, {
        keys: [
          { name: 'title', weight: 0.4 },
          { name: 'content', weight: 0.3 },
          { name: 'tags', weight: 0.3 },
        ],
        threshold: 0.3,
        includeScore: true,
        includeMatches: true,
      });

      const fuseResults = fuse.search(query);

      const results: SearchResult[] = fuseResults.map((result) => ({
        note: result.item,
        relevance: 1 - (result.score || 0),
        matchedContent: result.matches
          ?.filter(match => match.key === 'content')
          .map(match => match.value || '') || [],
        matchedTags: result.matches
          ?.filter(match => match.key === 'tags')
          .map(match => match.value || '') || [],
      }));

      return { results, error: null };
    } catch (error) {
      console.error('Error searching notes:', error);
      return { results: [], error: 'Search failed' };
    }
  }

  /**
   * Get notes by tag
   */
  async getNotesByTag(tag: string): Promise<{ notes: Note[]; error: string | null }> {
    try {
      const { data: notes, error } = await supabase
        .from('notes')
        .select('*')
        .eq('user_id', this.userId)
        .contains('tags', [tag])
        .order('updated_at', { ascending: false });

      if (error) {
        return { notes: [], error: error.message };
      }

      return { notes: notes || [], error: null };
    } catch (error) {
      console.error('Error fetching notes by tag:', error);
      return { notes: [], error: 'Failed to fetch notes' };
    }
  }

  /**
   * Get all tags for user
   */
  async getAllTags(): Promise<{ tags: string[]; error: string | null }> {
    try {
      const { data: notes, error } = await supabase
        .from('notes')
        .select('tags')
        .eq('user_id', this.userId);

      if (error) {
        return { tags: [], error: error.message };
      }

      const allTags = new Set<string>();
      notes?.forEach(note => {
        note.tags?.forEach(tag => allTags.add(tag));
      });

      return { tags: Array.from(allTags).sort(), error: null };
    } catch (error) {
      console.error('Error fetching tags:', error);
      return { tags: [], error: 'Failed to fetch tags' };
    }
  }
}