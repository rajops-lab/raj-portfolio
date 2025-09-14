import React, { useState, useEffect } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Calendar, Clock, Tag, ArrowLeft, Share2, Github, ExternalLink } from 'lucide-react';
import { fetchContentBySlug, ContentItem, formatDate, calculateReadingTime } from '../utils/contentUtils';

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<ContentItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Handle redirects to specific blog pages
  if (slug === 'docker') {
    return <Navigate to="/blog/docker" replace />;
  }
  
  if (slug === 'kubernetes') {
    return <Navigate to="/blog/kubernetes" replace />;
  }

  useEffect(() => {
    const loadPost = async () => {
      if (!slug) return;
      
      setLoading(true);
      setError(null);
      
      try {
        const blogPost = await fetchContentBySlug('blog', slug);
        if (blogPost) {
          // Calculate reading time if not provided
          if (!blogPost.meta.readTime) {
            blogPost.meta.readTime = calculateReadingTime(blogPost.content);
          }
          setPost(blogPost);
        } else {
          setError('Blog post not found');
        }
      } catch (err) {
        console.error('Error loading blog post:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug]);

  const sharePost = async () => {
    const url = window.location.href;
    const title = post?.meta.title;
    
    if (navigator.share && post) {
      try {
        await navigator.share({
          title,
          url,
          text: post.meta.excerpt
        });
      } catch (err) {
        // Fallback to clipboard
        navigator.clipboard.writeText(url);
        alert('URL copied to clipboard!');
      }
    } else {
      // Fallback to clipboard
      navigator.clipboard.writeText(url);
      alert('URL copied to clipboard!');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-neon-green font-mono">Loading article...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-6">📝</div>
          <h1 className="text-3xl font-bold text-white mb-4">Article Not Found</h1>
          <p className="text-gray-400 mb-8">{error || 'The requested blog post could not be found.'}</p>
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 bg-neon-green hover:bg-neon-bright text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-neon"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Blog</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-black">
      {/* Background Effect */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,65,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,65,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Header Image */}
      {post.meta.image && (
        <div className="relative h-96 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyber-black/50 to-cyber-black z-10"></div>
          <img
            src={post.meta.image}
            alt={post.meta.title}
            className="w-full h-full object-cover"
          />
          
          {/* Back Button Overlay */}
          <div className="absolute top-20 left-4 z-20">
            <Link
              to="/blog"
              className="inline-flex items-center space-x-2 bg-cyber-dark/80 backdrop-blur-sm border border-neon-green/30 hover:border-neon-green text-neon-green hover:text-neon-bright px-4 py-2 rounded-lg transition-all duration-300 font-mono"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Blog</span>
            </Link>
          </div>
        </div>
      )}

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Article Header */}
        <div className={`${post.meta.image ? '-mt-32' : 'pt-32'} mb-12 animate-slide-up`}>
          {!post.meta.image && (
            <div className="mb-8">
              <Link
                to="/blog"
                className="inline-flex items-center space-x-2 text-neon-green hover:text-neon-bright transition-colors duration-300 font-mono"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Back to Blog</span>
              </Link>
            </div>
          )}

          <div className="bg-cyber-dark/60 backdrop-blur-sm rounded-lg border border-neon-green/20 p-8 shadow-neon">
            {/* Article Meta */}
            <div className="flex flex-wrap items-center gap-4 mb-6 text-sm">
              <div className="flex items-center space-x-2">
                <Tag className="h-4 w-4 text-neon-green" />
                <span className="text-neon-green font-mono">{post.meta.category}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Calendar className="h-4 w-4" />
                <span className="font-mono">{formatDate(post.meta.date)}</span>
              </div>
              <div className="flex items-center space-x-2 text-gray-400">
                <Clock className="h-4 w-4" />
                <span className="font-mono">{post.meta.readTime}</span>
              </div>
              {post.meta.featured && (
                <div className="bg-neon-green/20 border border-neon-green rounded-full px-3 py-1">
                  <span className="text-neon-green text-xs font-mono font-bold">FEATURED</span>
                </div>
              )}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight animate-glow" style={{textShadow: '0 0 20px rgba(0,255,65,0.3)'}}>
              {post.meta.title}
            </h1>

            {/* Excerpt */}
            <p className="text-xl text-gray-400 leading-relaxed mb-8">
              {post.meta.excerpt}
            </p>

            {/* Author and Actions */}
            <div className="flex items-center justify-between border-t border-neon-green/20 pt-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-neon-green/20 rounded-full flex items-center justify-center border-2 border-neon-green/40">
                  <span className="text-neon-green font-bold text-lg">R</span>
                </div>
                <div>
                  <div className="text-white font-semibold">{post.meta.author || 'Rajesh Avhad'}</div>
                  <div className="text-gray-400 text-sm font-mono">Solution Developer</div>
                </div>
              </div>

              <button
                onClick={sharePost}
                className="flex items-center space-x-2 bg-neon-green/20 hover:bg-neon-green/30 border border-neon-green/40 hover:border-neon-green text-neon-green px-4 py-2 rounded-lg transition-all duration-300 font-mono"
              >
                <Share2 className="h-4 w-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        </div>

        {/* Tags */}
        {post.meta.tags && (
          <div className="mb-12 animate-slide-up" style={{animationDelay: '0.2s'}}>
            <div className="flex flex-wrap gap-3">
              {post.meta.tags.map(tag => (
                <span
                  key={tag}
                  className="px-4 py-2 bg-cyber-dark/60 text-neon-green border border-neon-green/30 hover:border-neon-green hover:bg-neon-green/10 rounded-lg transition-all duration-300 font-mono text-sm cursor-pointer"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Article Content */}
        <article className="prose prose-invert prose-lg max-w-none animate-slide-up" style={{animationDelay: '0.4s'}}>
          <div className="markdown-content">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // Custom heading components with neon styling
                h1: ({children}) => (
                  <h1 className="text-4xl font-bold text-white mb-8 pb-4 border-b border-neon-green/20 animate-glow" style={{textShadow: '0 0 10px rgba(0,255,65,0.3)'}}>
                    {children}
                  </h1>
                ),
                h2: ({children}) => (
                  <h2 className="text-3xl font-bold text-white mt-12 mb-6 text-neon-green">
                    {children}
                  </h2>
                ),
                h3: ({children}) => (
                  <h3 className="text-2xl font-semibold text-white mt-8 mb-4 text-neon-bright">
                    {children}
                  </h3>
                ),
                // Code blocks with neon theme
                code: ({inline, className, children, ...props}) => {
                  if (inline) {
                    return (
                      <code className="bg-cyber-dark/80 text-neon-green px-2 py-1 rounded border border-neon-green/30 font-mono text-sm" {...props}>
                        {children}
                      </code>
                    );
                  }
                  return (
                    <div className="relative my-8">
                      <div className="bg-cyber-dark/90 border border-neon-green/30 rounded-lg overflow-hidden">
                        <div className="flex items-center justify-between bg-cyber-black/50 px-4 py-2 border-b border-neon-green/20">
                          <div className="flex space-x-2">
                            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-neon-green rounded-full"></div>
                          </div>
                          <span className="text-neon-green font-mono text-xs">
                            {className?.replace('language-', '') || 'code'}
                          </span>
                        </div>
                        <pre className="p-4 overflow-x-auto">
                          <code className="text-gray-300 font-mono text-sm leading-relaxed" {...props}>
                            {children}
                          </code>
                        </pre>
                      </div>
                    </div>
                  );
                },
                // Links with neon styling
                a: ({href, children}) => (
                  <a
                    href={href}
                    className="text-neon-green hover:text-neon-bright underline decoration-neon-green/50 hover:decoration-neon-bright transition-all duration-300"
                    target={href?.startsWith('http') ? '_blank' : undefined}
                    rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
                  >
                    {children}
                    {href?.startsWith('http') && <ExternalLink className="inline h-4 w-4 ml-1" />}
                  </a>
                ),
                // Lists with custom styling
                ul: ({children}) => (
                  <ul className="space-y-2 my-6">
                    {children}
                  </ul>
                ),
                li: ({children}) => (
                  <li className="flex items-start space-x-3 text-gray-300">
                    <div className="w-2 h-2 bg-neon-green rounded-full mt-2 flex-shrink-0"></div>
                    <div>{children}</div>
                  </li>
                ),
                // Blockquotes
                blockquote: ({children}) => (
                  <blockquote className="border-l-4 border-neon-green bg-cyber-dark/50 pl-6 py-4 my-8 rounded-r-lg">
                    <div className="text-gray-300 italic">
                      {children}
                    </div>
                  </blockquote>
                ),
                // Tables
                table: ({children}) => (
                  <div className="overflow-x-auto my-8">
                    <table className="w-full border border-neon-green/30 rounded-lg overflow-hidden">
                      {children}
                    </table>
                  </div>
                ),
                th: ({children}) => (
                  <th className="bg-cyber-dark/80 text-neon-green font-bold p-3 text-left border-b border-neon-green/30">
                    {children}
                  </th>
                ),
                td: ({children}) => (
                  <td className="text-gray-300 p-3 border-b border-gray-700">
                    {children}
                  </td>
                ),
                // Paragraphs
                p: ({children}) => (
                  <p className="text-gray-300 leading-relaxed mb-6">
                    {children}
                  </p>
                ),
              }}
            >
              {post.content}
            </ReactMarkdown>
          </div>
        </article>

        {/* Article Footer */}
        <div className="mt-16 pt-8 border-t border-neon-green/20">
          <div className="flex items-center justify-between">
            <div className="text-gray-400 font-mono text-sm">
              Published on {formatDate(post.meta.date)}
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-400 font-mono text-sm">Share this article:</span>
              <button
                onClick={sharePost}
                className="text-neon-green hover:text-neon-bright transition-colors duration-300"
                title="Share article"
              >
                <Share2 className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="mt-16 pb-20">
          <Link
            to="/blog"
            className="inline-flex items-center space-x-2 bg-neon-green hover:bg-neon-bright text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-neon"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to All Articles</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;