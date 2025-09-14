import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, Image, File, CheckCircle, AlertCircle } from 'lucide-react';
import { FileUploadService } from '../../lib/fileUpload';
import { useAuth } from '../../hooks/useAuth';
import toast from 'react-hot-toast';

interface FileUploadModalProps {
  onClose: () => void;
}

export const FileUploadModal: React.FC<FileUploadModalProps> = ({ onClose }) => {
  const { user } = useAuth();
  const [uploading, setUploading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [uploadService] = useState(() => user ? new FileUploadService(user.id) : null);

  const onDrop = async (acceptedFiles: File[]) => {
    if (!uploadService) {
      toast.error('Upload service not available');
      return;
    }

    setUploading(true);
    
    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const { upload, error } = await uploadService.uploadFile(file);
        
        if (error) {
          toast.error(`Failed to upload ${file.name}: ${error}`);
          return null;
        }
        
        toast.success(`${file.name} uploaded successfully!`);
        return upload;
      });

      const results = await Promise.all(uploadPromises);
      const successfulUploads = results.filter(Boolean);
      
      setUploadedFiles(prev => [...prev, ...successfulUploads]);
    } catch (error) {
      toast.error('Upload failed');
      console.error('Upload error:', error);
    } finally {
      setUploading(false);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.bmp'],
      'application/pdf': ['.pdf'],
      'text/*': ['.txt', '.md'],
    },
    maxSize: 10 * 1024 * 1024, // 10MB
    multiple: true,
  });

  const getFileIcon = (fileType: string) => {
    if (fileType.startsWith('image/')) return Image;
    if (fileType === 'application/pdf') return FileText;
    return File;
  };

  return (
    <motion.div
      className="fixed inset-0 bg-cyber-black/90 backdrop-blur-md z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-cyber-dark border border-neon-green/30 rounded-lg p-6 max-w-2xl w-full max-h-[80vh] overflow-y-auto"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-neon-green font-mono flex items-center">
            <Upload className="h-6 w-6 mr-2" />
            Upload Files
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Upload Area */}
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? 'border-neon-green bg-neon-green/10'
              : 'border-neon-green/30 hover:border-neon-green/60 hover:bg-neon-green/5'
          }`}
        >
          <input {...getInputProps()} />
          
          <Upload className="h-12 w-12 text-neon-green mx-auto mb-4" />
          
          {isDragActive ? (
            <p className="text-neon-green font-mono">Drop files here...</p>
          ) : (
            <div>
              <p className="text-white font-mono mb-2">
                Drag & drop files here, or click to select
              </p>
              <p className="text-gray-400 text-sm font-mono">
                Supports: Images, PDFs, Text files (max 10MB)
              </p>
            </div>
          )}
        </div>

        {/* Upload Progress */}
        {uploading && (
          <div className="mt-6 p-4 bg-cyber-black/50 rounded-lg border border-neon-green/20">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 border-2 border-neon-green border-t-transparent rounded-full animate-spin"></div>
              <span className="text-neon-green font-mono">Processing files...</span>
            </div>
          </div>
        )}

        {/* Uploaded Files List */}
        {uploadedFiles.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-white mb-4 font-mono">Uploaded Files</h3>
            <div className="space-y-3">
              {uploadedFiles.map((file, index) => {
                const FileIcon = getFileIcon(file.file_type);
                return (
                  <div
                    key={file.id}
                    className="flex items-center space-x-3 p-3 bg-cyber-black/50 rounded-lg border border-neon-green/20"
                  >
                    <FileIcon className="h-5 w-5 text-neon-green" />
                    <div className="flex-1">
                      <div className="text-white font-mono text-sm">{file.filename}</div>
                      <div className="text-gray-400 text-xs font-mono">
                        {(file.file_size / 1024 / 1024).toFixed(2)} MB
                        {file.ocr_text && ' • OCR processed'}
                      </div>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-400" />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* OCR Results */}
        {uploadedFiles.some(f => f.ocr_text) && (
          <div className="mt-6">
            <h3 className="text-lg font-bold text-white mb-4 font-mono">Extracted Text</h3>
            <div className="space-y-3">
              {uploadedFiles
                .filter(f => f.ocr_text)
                .map((file) => (
                  <div
                    key={file.id}
                    className="p-4 bg-cyber-black/50 rounded-lg border border-neon-green/20"
                  >
                    <div className="text-neon-green font-mono text-sm mb-2">{file.filename}</div>
                    <div className="text-gray-300 text-sm max-h-32 overflow-y-auto">
                      {file.ocr_text}
                    </div>
                    <button
                      onClick={() => {
                        setContent(prev => prev + '\n\n' + file.ocr_text);
                        toast.success('Text added to note');
                      }}
                      className="mt-2 text-xs text-neon-green hover:text-neon-bright transition-colors font-mono"
                    >
                      Add to note
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex justify-end space-x-4 mt-6 pt-6 border-t border-neon-green/20">
          <button
            onClick={onClose}
            className="px-6 py-2 border border-gray-600 text-gray-400 rounded-lg font-mono hover:border-gray-500 transition-colors"
          >
            Close
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};