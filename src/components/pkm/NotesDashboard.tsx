import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Search, 
  Filter, 
  Grid, 
  List, 
  Tag, 
  Calendar,
  Clock,
  Edit,
  Trash2,
  FileText,
  Shield,
  LogOut
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useNotes } from '../../hooks/useNotes';
import { Note } from '../../types/pkm';
import { NoteEditor } from './NoteEditor';
import { FileUploadModal } from './FileUploadModal';
import toast from 'react-hot-toast';

export const NotesDashboard: React.FC = () => {
  const { user, signOut } = useAuth();
  const { notes, loading, error, createNote, updateNote, deleteNote, searchNotes, getAllTags } = useNotes();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showEditor, setShowEditor] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [searchResults, setSearchResults] = useState<Note[]>([]);

  useEffect(() => {
    loadTags();
  }, [notes]);

  useEffect(() => {
    handleSearch();
  }, [searchQuery, selectedTag, notes]);

  const loadTags = async () => {
    const tags = await getAllTags();
    setAllTags(tags);
  };

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const results = await searchNotes(searchQuery);
      setSearchResults(results.map(r => r.note));
    } else {
      setSearchResults([]);
    }
  };

  const filteredNotes = React.useMemo(() => {
    let filtered = searchQuery ? searchResults : notes;
    
    if (selectedTag) {
      filtered = filtered.filter(note => note.tags.includes(selectedTag));
    }
    
    return filtered;
  }, [notes, searchResults, selectedTag, searchQuery]);

  const handleCreateNote = async (title: string, content: string, tags: string[]) => {
    const { error } = await createNote(title, content, tags);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Note created successfully!');
      setShowEditor(false);
    }
  };

  const handleUpdateNote = async (title: string, content: string, tags: string[]) => {
    if (!editingNote) return;
    
    const { error } = await updateNote(editingNote.id, { title, content, tags });
    if (error) {
      toast.error(error);
    } else {
      toast.success('Note updated successfully!');
      setShowEditor(false);
      setEditingNote(null);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm('Are you sure you want to delete this note?')) return;
    
    const { error } = await deleteNote(noteId);
    if (error) {
      toast.error(error);
    } else {
      toast.success('Note deleted successfully!');
    }
  };

  const handleSignOut = async () => {
    await signOut();
    toast.success('Signed out successfully');
  };

  return (
    <div className="min-h-screen bg-cyber-black text-white">
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }} />
      </div>

      {/* Header */}
      <header className="relative bg-cyber-black/90 backdrop-blur-md border-b border-neon-green/20 py-4 shadow-cyber z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-neon-green font-mono">PKM System</h1>
              <div className="hidden sm:flex items-center space-x-2 text-sm">
                <div className="w-2 h-2 bg-neon-green rounded-full animate-pulse"></div>
                <span className="text-gray-400 font-mono">Welcome, {user?.name}</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-400 font-mono">
                {user?.subscription_tier.toUpperCase()}
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-gray-400 hover:text-neon-green transition-colors"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden sm:inline">Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Controls */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.button
                onClick={() => {
                  setEditingNote(null);
                  setShowEditor(true);
                }}
                className="flex items-center space-x-2 bg-gradient-to-r from-neon-green to-neon-bright text-cyber-black font-bold px-6 py-3 rounded-lg hover:from-neon-bright hover:to-neon-green transition-all duration-300 transform hover:scale-105 shadow-neon"
                whileHover={{ boxShadow: '0 0 25px rgba(0,255,65,0.6)' }}
                whileTap={{ scale: 0.95 }}
              >
                <Plus className="h-5 w-5" />
                <span>New Note</span>
              </motion.button>

              <button
                onClick={() => setShowUploadModal(true)}
                className="flex items-center space-x-2 border border-neon-green/50 text-neon-green hover:bg-neon-green/10 px-4 py-3 rounded-lg transition-all"
              >
                <FileText className="h-5 w-5" />
                <span className="hidden sm:inline">Upload</span>
              </button>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded ${viewMode === 'grid' ? 'bg-neon-green text-cyber-black' : 'text-neon-green border border-neon-green/30'}`}
              >
                <Grid className="h-5 w-5" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded ${viewMode === 'list' ? 'bg-neon-green text-cyber-black' : 'text-neon-green border border-neon-green/30'}`}
              >
                <List className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neon-green" />
              <input
                type="text"
                placeholder="Search your knowledge..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-cyber-dark/60 border border-neon-green/30 text-white rounded-lg focus:outline-none focus:border-neon-green font-mono"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedTag(null)}
                className={`px-3 py-2 rounded-full text-sm font-mono transition-colors ${
                  !selectedTag 
                    ? 'bg-neon-green text-cyber-black' 
                    : 'border border-neon-green/30 text-neon-green hover:bg-neon-green/20'
                }`}
              >
                All ({notes.length})
              </button>
              {allTags.slice(0, 5).map(tag => (
                <button
                  key={tag}
                  onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                  className={`px-3 py-2 rounded-full text-sm font-mono transition-colors ${
                    selectedTag === tag
                      ? 'bg-neon-green text-cyber-black'
                      : 'border border-neon-green/30 text-neon-green hover:bg-neon-green/20'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="mb-6 p-4 bg-red-900/20 border border-red-500/30 rounded-lg text-red-400 font-mono">
            {error}
          </div>
        )}

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-neon-green border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-neon-green font-mono">Loading notes...</p>
          </div>
        )}

        {/* Notes Display */}
        {!loading && (
          <>
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
                    className="bg-neon-green text-cyber-black px-6 py-3 rounded-lg font-mono hover:bg-neon-bright transition-colors"
                  >
                    Create First Note
                  </button>
                )}
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredNotes.map((note, index) => (
                  <NoteCard
                    key={note.id}
                    note={note}
                    index={index}
                    viewMode={viewMode}
                    onEdit={(note) => {
                      setEditingNote(note);
                      setShowEditor(true);
                    }}
                    onDelete={handleDeleteNote}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Modals */}
      <AnimatePresence>
        {showEditor && (
          <NoteEditor
            note={editingNote}
            onSave={editingNote ? handleUpdateNote : handleCreateNote}
            onCancel={() => {
              setShowEditor(false);
              setEditingNote(null);
            }}
          />
        )}
        
        {showUploadModal && (
          <FileUploadModal
            onClose={() => setShowUploadModal(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

interface NoteCardProps {
  note: Note;
  index: number;
  viewMode: 'grid' | 'list';
  onEdit: (note: Note) => void;
  onDelete: (noteId: string) => void;
}

const NoteCard: React.FC<NoteCardProps> = ({ note, index, viewMode, onEdit, onDelete }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <motion.div
      className={`group bg-cyber-dark/60 backdrop-blur-sm border border-neon-green/20 rounded-lg overflow-hidden hover:border-neon-green/60 transition-all duration-300 cursor-pointer ${
        viewMode === 'list' ? 'flex items-center p-4' : 'p-6'
      }`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -2, boxShadow: '0 0 25px rgba(0,255,65,0.2)' }}
    >
      {/* Blockchain indicator */}
      {note.blockchain_hash && (
        <div className="absolute top-2 right-2">
          <Shield className="h-4 w-4 text-neon-green" title="Stored on blockchain" />
        </div>
      )}

      <div className={viewMode === 'list' ? 'flex-1' : ''}>
        <div className="flex items-center justify-between mb-3">
          <span className="px-2 py-1 bg-neon-green/20 text-neon-green text-xs rounded font-mono">
            {note.tags[0] || 'note'}
          </span>
          <span className="text-xs text-gray-400 font-mono">
            {formatDate(note.updated_at)}
          </span>
        </div>
        
        <h3 className="text-lg font-bold text-white mb-2 line-clamp-2 group-hover:text-neon-green transition-colors">
          {note.title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-4 line-clamp-3">
          {note.content.substring(0, 150)}...
        </p>
        
        <div className="flex flex-wrap gap-1 mb-4">
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

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-xs text-gray-400">
            <Clock className="h-3 w-3" />
            <span>{Math.ceil(note.content.length / 200)} min read</span>
          </div>
          
          <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit(note);
              }}
              className="p-2 text-gray-400 hover:text-neon-green transition-colors"
            >
              <Edit className="h-4 w-4" />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDelete(note.id);
              }}
              className="p-2 text-gray-400 hover:text-red-400 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};