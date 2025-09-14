# 🚀 PKM System - Implementation Starter

## 📋 **Phase 1 MVP - Start Building Today**

### 1. **Project Setup & Structure**

```bash
# Create PKM system within your existing portfolio
mkdir src/pkm
cd src/pkm

# Directory structure
src/pkm/
├── components/           # React components
│   ├── NoteEditor.tsx   # Markdown editor
│   ├── NoteList.tsx     # Virtual note list
│   ├── SearchBar.tsx    # Search interface
│   ├── TagCloud.tsx     # Tag visualization
│   └── KnowledgeGraph.tsx # Basic graph view
├── hooks/               # Custom React hooks
│   ├── useNotes.ts      # Note management
│   ├── useSearch.ts     # Search logic
│   └── useSync.ts       # Sync functionality
├── lib/                 # Core utilities
│   ├── storage.ts       # Local storage layer
│   ├── search.ts        # Search engine
│   ├── sync.ts          # Sync protocol
│   └── markdown.ts      # Markdown processing
├── types/               # TypeScript definitions
│   └── index.ts         # Core types
└── pages/               # Page components
    ├── Dashboard.tsx    # Main PKM dashboard
    ├── NotePage.tsx     # Individual note view
    └── SearchPage.tsx   # Search results
```

### 2. **Core TypeScript Types**

```typescript
// src/pkm/types/index.ts
export interface Note {
  id: string;
  title: string;
  content: string;
  tags: string[];
  type: 'note' | 'task' | 'meeting' | 'idea' | 'journal';
  created: Date;
  updated: Date;
  metadata: NoteMetadata;
  linkedNotes: string[];
  attachments: Attachment[];
}

export interface NoteMetadata {
  author: string;
  source?: string;
  location?: string;
  project?: string;
  priority?: 'low' | 'medium' | 'high';
  status?: 'draft' | 'active' | 'archived';
  reviewDate?: Date;
}

export interface Attachment {
  id: string;
  type: 'image' | 'pdf' | 'audio' | 'video';
  filename: string;
  size: number;
  url: string;
  ocrText?: string;
}

export interface SearchResult {
  note: Note;
  relevance: number;
  matchedContent: string[];
  matchedTags: string[];
}

export interface KnowledgeGraphNode {
  id: string;
  title: string;
  type: string;
  tags: string[];
  connections: number;
  lastAccessed: Date;
}

export interface KnowledgeGraphEdge {
  source: string;
  target: string;
  weight: number;
  type: 'reference' | 'tag' | 'temporal' | 'semantic';
}
```

### 3. **Storage Layer (IndexedDB + Local-First)**

```typescript
// src/pkm/lib/storage.ts
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface PKMSchema extends DBSchema {
  notes: {
    key: string;
    value: Note;
    indexes: {
      'by-tags': string[];
      'by-type': string;
      'by-updated': Date;
      'by-created': Date;
    };
  };
  attachments: {
    key: string;
    value: Attachment;
  };
  settings: {
    key: string;
    value: any;
  };
}

class PKMStorage {
  private db: IDBPDatabase<PKMSchema> | null = null;

  async init() {
    this.db = await openDB<PKMSchema>('pkm-database', 1, {
      upgrade(db) {
        // Notes store
        const noteStore = db.createObjectStore('notes', { keyPath: 'id' });
        noteStore.createIndex('by-tags', 'tags', { multiEntry: true });
        noteStore.createIndex('by-type', 'type');
        noteStore.createIndex('by-updated', 'updated');
        noteStore.createIndex('by-created', 'created');

        // Attachments store
        db.createObjectStore('attachments', { keyPath: 'id' });
        
        // Settings store
        db.createObjectStore('settings', { keyPath: 'key' });
      },
    });
  }

  async createNote(note: Omit<Note, 'id' | 'created' | 'updated'>): Promise<Note> {
    const fullNote: Note = {
      ...note,
      id: crypto.randomUUID(),
      created: new Date(),
      updated: new Date(),
    };

    await this.db!.put('notes', fullNote);
    return fullNote;
  }

  async updateNote(id: string, updates: Partial<Note>): Promise<Note> {
    const existing = await this.db!.get('notes', id);
    if (!existing) throw new Error('Note not found');

    const updated: Note = {
      ...existing,
      ...updates,
      updated: new Date(),
    };

    await this.db!.put('notes', updated);
    return updated;
  }

  async deleteNote(id: string): Promise<void> {
    await this.db!.delete('notes', id);
  }

  async getAllNotes(): Promise<Note[]> {
    return await this.db!.getAll('notes');
  }

  async getNotesByTag(tag: string): Promise<Note[]> {
    return await this.db!.getAllFromIndex('notes', 'by-tags', tag);
  }

  async searchNotes(query: string): Promise<Note[]> {
    const allNotes = await this.getAllNotes();
    const searchTerms = query.toLowerCase().split(' ');
    
    return allNotes.filter(note => {
      const searchText = `${note.title} ${note.content} ${note.tags.join(' ')}`.toLowerCase();
      return searchTerms.every(term => searchText.includes(term));
    });
  }
}

export const storage = new PKMStorage();
```

### 4. **Search Engine with MiniSearch**

```typescript
// src/pkm/lib/search.ts
import MiniSearch from 'minisearch';

class PKMSearchEngine {
  private miniSearch: MiniSearch;

  constructor() {
    this.miniSearch = new MiniSearch({
      fields: ['title', 'content', 'tags'],
      storeFields: ['title', 'tags', 'type', 'created'],
      searchOptions: {
        fuzzy: 0.2,
        prefix: true,
        boost: { title: 2, tags: 1.5 },
        combineWith: 'AND'
      }
    });
  }

  indexNotes(notes: Note[]) {
    this.miniSearch.removeAll();
    this.miniSearch.addAll(notes.map(note => ({
      id: note.id,
      title: note.title,
      content: note.content,
      tags: note.tags.join(' '),
      type: note.type,
      created: note.created.toISOString()
    })));
  }

  search(query: string): SearchResult[] {
    const results = this.miniSearch.search(query);
    return results.map(result => ({
      note: result as any, // Will be populated from storage
      relevance: result.score,
      matchedContent: result.match || [],
      matchedTags: []
    }));
  }

  autoSuggest(query: string): string[] {
    return this.miniSearch.autoSuggest(query);
  }
}

export const searchEngine = new PKMSearchEngine();
```

### 5. **React Hooks for State Management**

```typescript
// src/pkm/hooks/useNotes.ts
import { useState, useEffect } from 'react';
import { storage } from '../lib/storage';
import { searchEngine } from '../lib/search';

export function useNotes() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadNotes();
  }, []);

  const loadNotes = async () => {
    try {
      setLoading(true);
      await storage.init();
      const allNotes = await storage.getAllNotes();
      setNotes(allNotes);
      searchEngine.indexNotes(allNotes);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load notes');
    } finally {
      setLoading(false);
    }
  };

  const createNote = async (noteData: Omit<Note, 'id' | 'created' | 'updated'>) => {
    try {
      const newNote = await storage.createNote(noteData);
      setNotes(prev => [newNote, ...prev]);
      searchEngine.indexNotes([newNote, ...notes]);
      return newNote;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create note');
    }
  };

  const updateNote = async (id: string, updates: Partial<Note>) => {
    try {
      const updatedNote = await storage.updateNote(id, updates);
      setNotes(prev => prev.map(note => note.id === id ? updatedNote : note));
      searchEngine.indexNotes(notes);
      return updatedNote;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update note');
    }
  };

  const deleteNote = async (id: string) => {
    try {
      await storage.deleteNote(id);
      setNotes(prev => prev.filter(note => note.id !== id));
      searchEngine.indexNotes(notes);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete note');
    }
  };

  const searchNotes = (query: string): Note[] => {
    if (!query.trim()) return notes;
    const results = searchEngine.search(query);
    return results.map(result => 
      notes.find(note => note.id === result.note.id)
    ).filter(Boolean) as Note[];
  };

  return {
    notes,
    loading,
    error,
    createNote,
    updateNote,
    deleteNote,
    searchNotes,
    refreshNotes: loadNotes
  };
}
```

### 6. **Note Editor Component**

```typescript
// src/pkm/components/NoteEditor.tsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Save, Tag, Calendar, Type } from 'lucide-react';

interface NoteEditorProps {
  note?: Note;
  onSave: (noteData: Omit<Note, 'id' | 'created' | 'updated'>) => void;
  onCancel: () => void;
}

export const NoteEditor: React.FC<NoteEditorProps> = ({
  note,
  onSave,
  onCancel
}) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [tags, setTags] = useState<string[]>(note?.tags || []);
  const [type, setType] = useState<Note['type']>(note?.type || 'note');
  const [newTag, setNewTag] = useState('');

  const handleSave = () => {
    if (!title.trim()) return;
    
    onSave({
      title: title.trim(),
      content: content.trim(),
      tags,
      type,
      metadata: {
        author: 'You', // Replace with actual user
      },
      linkedNotes: [],
      attachments: []
    });
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

  return (
    <motion.div
      className="fixed inset-0 bg-cyber-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-cyber-dark border border-neon-green/30 rounded-lg p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-neon-green font-mono">
            {note ? 'Edit Note' : 'New Note'}
          </h2>
          <div className="flex items-center space-x-2">
            <select
              value={type}
              onChange={(e) => setType(e.target.value as Note['type'])}
              className="bg-cyber-black border border-neon-green/30 text-neon-green px-3 py-1 rounded font-mono text-sm"
            >
              <option value="note">Note</option>
              <option value="task">Task</option>
              <option value="meeting">Meeting</option>
              <option value="idea">Idea</option>
              <option value="journal">Journal</option>
            </select>
          </div>
        </div>

        {/* Title */}
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

        {/* Tags */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map(tag => (
              <span
                key={tag}
                className="bg-neon-green/20 border border-neon-green/40 text-neon-green px-3 py-1 rounded-full text-sm font-mono cursor-pointer hover:bg-neon-green/30"
                onClick={() => removeTag(tag)}
              >
                #{tag} ×
              </span>
            ))}
          </div>
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
            className="w-full bg-cyber-black border border-neon-green/30 text-white px-4 py-2 rounded font-mono text-sm focus:outline-none focus:border-neon-green"
          />
        </div>

        {/* Content */}
        <div className="mb-6">
          <textarea
            placeholder="Write your note in Markdown..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={15}
            className="w-full bg-cyber-black border border-neon-green/30 text-white px-4 py-3 rounded-lg font-mono resize-none focus:outline-none focus:border-neon-green"
          />
        </div>

        {/* Actions */}
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
            <button
              onClick={handleSave}
              disabled={!title.trim()}
              className="px-6 py-2 bg-neon-green text-black rounded-lg font-mono hover:bg-neon-bright disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
            >
              <Save className="h-4 w-4" />
              <span>Save Note</span>
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
```

### 7. **PKM Dashboard Component**

```typescript
// src/pkm/pages/Dashboard.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Grid, List, Tag } from 'lucide-react';
import { useNotes } from '../hooks/useNotes';
import { NoteEditor } from '../components/NoteEditor';

export const PKMDashboard: React.FC = () => {
  const { notes, loading, createNote, updateNote, deleteNote, searchNotes } = useNotes();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | undefined>();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const filteredNotes = React.useMemo(() => {
    let filtered = searchQuery ? searchNotes(searchQuery) : notes;
    if (selectedTag) {
      filtered = filtered.filter(note => note.tags.includes(selectedTag));
    }
    return filtered;
  }, [notes, searchQuery, selectedTag]);

  const allTags = React.useMemo(() => {
    const tagSet = new Set<string>();
    notes.forEach(note => note.tags.forEach(tag => tagSet.add(tag)));
    return Array.from(tagSet).sort();
  }, [notes]);

  const handleSaveNote = async (noteData: Omit<Note, 'id' | 'created' | 'updated'>) => {
    if (editingNote) {
      await updateNote(editingNote.id, noteData);
    } else {
      await createNote(noteData);
    }
    setShowEditor(false);
    setEditingNote(undefined);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center">
        <div className="text-neon-green font-mono">Loading your knowledge base...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-black text-white font-mono">
      {/* Header */}
      <div className="border-b border-neon-green/30 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-neon-green">Knowledge Base</h1>
            <button
              onClick={() => {
                setEditingNote(undefined);
                setShowEditor(true);
              }}
              className="bg-neon-green text-black px-6 py-2 rounded-lg font-mono hover:bg-neon-bright transition-colors flex items-center space-x-2"
            >
              <Plus className="h-5 w-5" />
              <span>New Note</span>
            </button>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neon-green" />
              <input
                type="text"
                placeholder="Search your knowledge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-cyber-dark border border-neon-green/30 text-white rounded-lg focus:outline-none focus:border-neon-green"
              />
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-cyber-dark border border-neon-green/30 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-neon-green text-black' : 'text-neon-green'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-neon-green text-black' : 'text-neon-green'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Tags Filter */}
          <div className="flex flex-wrap gap-2 mt-4">
            <button
              onClick={() => setSelectedTag(null)}
              className={`px-3 py-1 rounded-full text-sm font-mono transition-colors ${
                !selectedTag 
                  ? 'bg-neon-green text-black' 
                  : 'border border-neon-green/30 text-neon-green hover:bg-neon-green/20'
              }`}
            >
              All ({notes.length})
            </button>
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                className={`px-3 py-1 rounded-full text-sm font-mono transition-colors ${
                  selectedTag === tag
                    ? 'bg-neon-green text-black'
                    : 'border border-neon-green/30 text-neon-green hover:bg-neon-green/20'
                }`}
              >
                #{tag} ({notes.filter(note => note.tags.includes(tag)).length})
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Notes Grid/List */}
      <div className="max-w-7xl mx-auto p-6">
        {filteredNotes.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">📝</div>
            <h3 className="text-2xl font-bold text-neon-green mb-4">
              {searchQuery || selectedTag ? 'No matching notes' : 'Start building your knowledge base'}
            </h3>
            <p className="text-gray-400 mb-8">
              {searchQuery || selectedTag 
                ? 'Try adjusting your search or filters'
                : 'Create your first note to begin capturing your thoughts and ideas'}
            </p>
            {!(searchQuery || selectedTag) && (
              <button
                onClick={() => setShowEditor(true)}
                className="bg-neon-green text-black px-6 py-3 rounded-lg font-mono hover:bg-neon-bright transition-colors"
              >
                Create First Note
              </button>
            )}
          </div>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
            {filteredNotes.map((note, index) => (
              <motion.div
                key={note.id}
                className="bg-cyber-dark border border-neon-green/20 rounded-lg p-6 hover:border-neon-green/60 transition-all cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                onClick={() => {
                  setEditingNote(note);
                  setShowEditor(true);
                }}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`px-2 py-1 rounded text-xs font-mono ${
                    note.type === 'task' ? 'bg-yellow-500/20 text-yellow-400' :
                    note.type === 'meeting' ? 'bg-blue-500/20 text-blue-400' :
                    note.type === 'idea' ? 'bg-purple-500/20 text-purple-400' :
                    'bg-neon-green/20 text-neon-green'
                  }`}>
                    {note.type}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(note.updated).toLocaleDateString()}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                  {note.title}
                </h3>
                
                <p className="text-gray-400 text-sm mb-4 line-clamp-3">
                  {note.content.substring(0, 150)}...
                </p>
                
                <div className="flex flex-wrap gap-1">
                  {note.tags.slice(0, 3).map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-neon-green/10 border border-neon-green/30 text-neon-green text-xs rounded font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                  {note.tags.length > 3 && (
                    <span className="px-2 py-1 bg-gray-700 text-gray-400 text-xs rounded font-mono">
                      +{note.tags.length - 3}
                    </span>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Note Editor Modal */}
      {showEditor && (
        <NoteEditor
          note={editingNote}
          onSave={handleSaveNote}
          onCancel={() => {
            setShowEditor(false);
            setEditingNote(undefined);
          }}
        />
      )}
    </div>
  );
};
```

### 8. **Integration with Your Portfolio**

```typescript
// Add to your src/App.tsx routes
<Route path="/knowledge/*" element={<PKMDashboard />} />

// Add to your src/components/Header.tsx navigation
{ name: 'Knowledge', href: '/knowledge' }
```

### 9. **Installation Commands**

```bash
# Install dependencies
npm install idb minisearch framer-motion lucide-react

# Optional: Add PWA support
npm install workbox-webpack-plugin workbox-window

# Optional: Add markdown processing
npm install remark remark-html remark-gfm
```

### 10. **Next Steps**

Once you have this MVP running:

1. **Add sync functionality** (Git-based or CouchDB)
2. **Implement OCR** for physical notes (Tesseract.js)
3. **Add knowledge graph visualization** (D3.js)
4. **Integrate AI features** (Ollama for local AI)
5. **Build mobile app** (React Native)

This starter gives you a solid foundation for a powerful PKM system that's completely self-owned and integrated into your portfolio!

Want me to help you implement any specific part of this?