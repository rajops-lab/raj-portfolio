import { useState, useEffect } from 'react';
import { NotesService } from '../lib/notes';
import { Note, SearchResult } from '../types/pkm';
import { useAuth } from './useAuth';

export const useNotes = () => {
  const { user } = useAuth();
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notesService, setNotesService] = useState<NotesService | null>(null);

  useEffect(() => {
    if (user) {
      setNotesService(new NotesService(user.id));
    } else {
      setNotesService(null);
      setNotes([]);
    }
  }, [user]);

  const loadNotes = async (page = 1, limit = 20) => {
    if (!notesService) return;

    setLoading(true);
    setError(null);

    try {
      const { notes: fetchedNotes, error: fetchError } = await notesService.getNotes(page, limit);
      
      if (fetchError) {
        setError(fetchError);
      } else {
        setNotes(fetchedNotes);
      }
    } catch (err) {
      setError('Failed to load notes');
      console.error('Load notes error:', err);
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (title: string, content: string, tags: string[] = []) => {
    if (!notesService) return { error: 'Not authenticated' };

    setLoading(true);
    try {
      const encryptionKey = user?.encryption_key;
      const { note, error: createError } = await notesService.createNote(title, content, tags, encryptionKey);
      
      if (createError) {
        setError(createError);
        return { error: createError };
      }

      if (note) {
        setNotes(prev => [note, ...prev]);
      }

      return { error: null };
    } catch (err) {
      const errorMsg = 'Failed to create note';
      setError(errorMsg);
      return { error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const updateNote = async (noteId: string, updates: Partial<Note>) => {
    if (!notesService) return { error: 'Not authenticated' };

    setLoading(true);
    try {
      const encryptionKey = user?.encryption_key;
      const { note, error: updateError } = await notesService.updateNote(noteId, updates, encryptionKey);
      
      if (updateError) {
        setError(updateError);
        return { error: updateError };
      }

      if (note) {
        setNotes(prev => prev.map(n => n.id === noteId ? note : n));
      }

      return { error: null };
    } catch (err) {
      const errorMsg = 'Failed to update note';
      setError(errorMsg);
      return { error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const deleteNote = async (noteId: string) => {
    if (!notesService) return { error: 'Not authenticated' };

    setLoading(true);
    try {
      const { error: deleteError } = await notesService.deleteNote(noteId);
      
      if (deleteError) {
        setError(deleteError);
        return { error: deleteError };
      }

      setNotes(prev => prev.filter(n => n.id !== noteId));
      return { error: null };
    } catch (err) {
      const errorMsg = 'Failed to delete note';
      setError(errorMsg);
      return { error: errorMsg };
    } finally {
      setLoading(false);
    }
  };

  const searchNotes = async (query: string): Promise<SearchResult[]> => {
    if (!notesService || !query.trim()) return [];

    try {
      const { results, error: searchError } = await notesService.searchNotes(query);
      
      if (searchError) {
        setError(searchError);
        return [];
      }

      return results;
    } catch (err) {
      console.error('Search error:', err);
      setError('Search failed');
      return [];
    }
  };

  const getNotesByTag = async (tag: string) => {
    if (!notesService) return [];

    try {
      const { notes: taggedNotes, error: tagError } = await notesService.getNotesByTag(tag);
      
      if (tagError) {
        setError(tagError);
        return [];
      }

      return taggedNotes;
    } catch (err) {
      console.error('Tag filter error:', err);
      setError('Failed to filter by tag');
      return [];
    }
  };

  const getAllTags = async (): Promise<string[]> => {
    if (!notesService) return [];

    try {
      const { tags, error: tagsError } = await notesService.getAllTags();
      
      if (tagsError) {
        setError(tagsError);
        return [];
      }

      return tags;
    } catch (err) {
      console.error('Tags fetch error:', err);
      setError('Failed to fetch tags');
      return [];
    }
  };

  // Load notes when service is available
  useEffect(() => {
    if (notesService) {
      loadNotes();
    }
  }, [notesService]);

  return {
    notes,
    loading,
    error,
    loadNotes,
    createNote,
    updateNote,
    deleteNote,
    searchNotes,
    getNotesByTag,
    getAllTags,
    clearError: () => setError(null),
  };
};