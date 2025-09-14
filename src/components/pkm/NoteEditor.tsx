import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, X, Tag, FileText, Shield } from 'lucide-react';
import { Note } from '../../types/pkm';

interface NoteEditorProps {
  note?: Note | null;
  onSave: (title: string, content: string, tags: string[]) => Promise<void>;
  onCancel: () => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({ note, onSave, onCancel }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [newTag, setNewTag] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!title.trim()) {
      return;
    }

    setIsSaving(true);
    try {
      await onSave(title.trim(), content.trim(), tags);
    } finally {
      setIsSaving(false);
    }
  };

  const addTag = (tag: string) => {
    const trimmedTag = tag.trim().toLowerCase();
    if (trimmedTag && !tags.includes(trimmedTag)) {
      setTags(prev => [...prev, trimmedTag]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(prev => prev.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      onCancel();
    } else if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSave();
    }
  };

  return (
    <motion.div
      className="fixed inset-0 bg-cyber-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onKeyDown={handleKeyDown}
    >
      <motion.div
        className="bg-cyber-dark border border-neon-green/30 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-neon-green font-mono flex items-center">
            <FileText className="h-6 w-6 mr-2" />
            {note ? 'Edit Note' : 'New Note'}
          </h2>
          <div className="flex items-center space-x-2">
            {note?.blockchain_hash && (
              <div className="flex items-center space-x-1 text-neon-green text-sm">
                <Shield className="h-4 w-4" />
                <span className="font-mono">Blockchain</span>
              </div>
            )}
            <button
              onClick={onCancel}
              className="p-2 text-gray-400 hover:text-white transition-colors"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Title Input */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-cyber-black border border-neon-green/30 text-white px-4 py-3 rounded-lg font-mono text-lg focus:outline-none focus:border-neon-green"
            autoFocus
          />
        </div>

        {/* Tags Input */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="bg-neon-green/20 border border-neon-green/40 text-neon-green px-3 py-1 rounded-full text-sm font-mono cursor-pointer hover:bg-neon-green/30 transition-colors"
                onClick={() => removeTag(tag)}
              >
                #{tag} ×
              </span>
            ))}
          </div>
          <div className="relative">
            <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Add tags (press Enter)..."
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  addTag(newTag);
                }
              }}
              className="w-full pl-10 pr-4 py-2 bg-cyber-black border border-neon-green/30 text-white rounded font-mono text-sm focus:outline-none focus:border-neon-green"
            />
          </div>
        </div>

        {/* Content Textarea */}
        <div className="mb-6">
          <textarea
            placeholder="Write your note in Markdown..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="w-full bg-cyber-black border border-neon-green/30 text-white px-4 py-3 rounded-lg font-mono resize-none focus:outline-none focus:border-neon-green"
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-400 font-mono">
            {content.length} characters • {content.split(/\s+/).filter(Boolean).length} words
          </div>
          <div className="flex space-x-4">
            <button
              onClick={onCancel}
              className="px-6 py-2 border border-gray-600 text-gray-400 rounded-lg font-mono hover:border-gray-500 transition-colors"
            >
              Cancel
            </button>
            <motion.button
              onClick={handleSave}
              disabled={!title.trim() || isSaving}
              className="px-6 py-2 bg-neon-green text-cyber-black rounded-lg font-mono hover:bg-neon-bright disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSaving ? (
                <div className="w-4 h-4 border-2 border-cyber-black border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="h-4 w-4" />
              )}
              <span>{isSaving ? 'Saving...' : 'Save Note'}</span>
            </motion.button>
          </div>
        </div>

        {/* Keyboard Shortcuts */}
        <div className="mt-4 pt-4 border-t border-neon-green/20 text-xs text-gray-500 font-mono">
          <span>Shortcuts: </span>
          <span className="text-neon-green">Ctrl+Enter</span> to save • 
          <span className="text-neon-green"> Esc</span> to cancel
        </div>
      </motion.div>
    </motion.div>
  );
};