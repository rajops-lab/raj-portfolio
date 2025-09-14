import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Clock, Tag, Search, Filter, ArrowLeft } from 'lucide-react';
import { fetchContent, ContentItem, formatDate } from '../utils/contentUtils';

const Blog = () => {
  const [posts, setPosts] = useState<ContentItem[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const blogPosts = await fetchContent('blog');
        
        if (blogPosts.length === 0) {
          // Fallback to static blog posts if markdown loading fails
          const fallbackPosts: ContentItem[] = [
            {
              meta: {
                title: "Mastering Docker: Containerization Made Simple",
                date: "2024-01-15",
                excerpt: "A comprehensive guide to Docker containerization, from basics to advanced deployment strategies. Learn Docker commands, best practices, and production deployment.",
                author: "Rajesh Avhad",
                tags: ["Docker", "DevOps", "Containerization", "Production"],
                image: "https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=600",
                category: "DevOps",
                featured: true,
                readTime: "15 min read",
                slug: "docker"
              },
              content: "# Mastering Docker: Containerization Made Simple\n\nDocker has revolutionized the way we develop, ship, and run applications...",
              slug: "docker"
            },
            {
              meta: {
                title: "Kubernetes: Orchestrating Containers at Scale",
                date: "2024-01-10",
                excerpt: "Learn how Kubernetes manages containerized applications across clusters with automated deployment, scaling, and management. Complete guide with kubectl commands and best practices.",
                author: "Rajesh Avhad",
                tags: ["Kubernetes", "DevOps", "Cloud", "Container Orchestration"],
                image: "https://images.pexels.com/photos/1089438/pexels-photo-1089438.jpeg?auto=compress&cs=tinysrgb&w=600",
                category: "Cloud",
                featured: true,
                readTime: "20 min read",
                slug: "kubernetes"
              },
              content: "# Kubernetes: Orchestrating Containers at Scale\n\nKubernetes has become the de facto standard for container orchestration...",
              slug: "kubernetes"
            },
            {
              meta: {
                title: "DevOps Best Practices for Modern Teams",
                date: "2023-12-20",
                excerpt: "Essential DevOps practices, tools, and methodologies for building efficient, scalable, and reliable software delivery pipelines.",
                author: "Rajesh Avhad",
                tags: ["DevOps", "CI/CD", "Automation", "Best Practices"],
                image: "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=600",
                category: "DevOps",
                featured: true,
                readTime: "10 min read",
                slug: "devops-best-practices"
              },
              content: "# DevOps Best Practices for Modern Teams\n\nDevOps has transformed how we build, deploy, and maintain software...",
              slug: "devops-best-practices"
            }
          ];
          setPosts(fallbackPosts);
          setFilteredPosts(fallbackPosts);
        } else {
          setPosts(blogPosts);
          setFilteredPosts(blogPosts);
        }
      } catch (error) {
        console.error('Error loading blog posts:', error);
        // Show fallback content on error
        const fallbackPosts: ContentItem[] = [
          {
            meta: {
              title: "Blog posts loading...",
              date: "2024-01-15",
              excerpt: "Content is being loaded from markdown files. Please check the console for any loading issues.",
              author: "Rajesh Avhad",
              tags: ["Loading"],
              category: "System",
              slug: "loading"
            },
            content: "Loading...",
            slug: "loading"
          }
        ];
        setPosts(fallbackPosts);
        setFilteredPosts(fallbackPosts);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  useEffect(() => {
    let filtered = posts;

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(post => 
        post.meta.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(post =>
        post.meta.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.meta.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.meta.tags?.some(tag => 
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    setFilteredPosts(filtered);
  }, [posts, searchTerm, selectedCategory]);

  const categories = ['all', ...new Set(posts.map(post => post.meta.category).filter(Boolean))];

  if (loading) {
    return (
      <div className="min-h-screen bg-cyber-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-neon-green border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-neon-green font-mono">Loading blog posts...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cyber-black text-neon-electric font-mono relative overflow-hidden">
      {/* Cyberpunk Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,255,255,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,255,255,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '30px 30px'
        }} />
      </div>
      
      {/* Animated scan lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-neon-electric to-transparent animate-pulse" 
             style={{top: '15%', animationDuration: '4s'}} />
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-cyberpunk-pink to-transparent animate-pulse" 
             style={{top: '50%', animationDuration: '5s', animationDelay: '2s'}} />
        <div className="absolute w-full h-0.5 bg-gradient-to-r from-transparent via-neon-green to-transparent animate-pulse" 
             style={{top: '85%', animationDuration: '6s', animationDelay: '1s'}} />
      </div>
      
      {/* Cyberpunk Header */}
      <header className="relative bg-cyber-black/90 backdrop-blur-md border-b border-neon-electric/30 py-6 shadow-neon z-10">
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-neon-electric to-transparent"></div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <Link 
            to="/" 
            className="group inline-flex items-center text-neon-electric hover:text-neon-bright transition-all duration-300 font-mono border border-neon-electric/30 hover:border-neon-electric px-4 py-2 rounded-lg backdrop-blur-sm hover:shadow-neon"
          >
            <ArrowLeft className="h-5 w-5 mr-2 group-hover:animate-bounce" />
            <span className="group-hover:animate-glow">[ESC] Back to Portfolio</span>
          </Link>
        </div>
      </header>
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Header */}
        <div className="text-center mb-16 animate-slide-up">
          <div className="inline-flex items-center space-x-2 mb-4">
            <div className="h-px w-12 bg-neon-green"></div>
            <span className="text-neon-green font-mono text-sm tracking-wide">&lt; BLOG_POSTS /&gt;</span>
            <div className="h-px w-12 bg-neon-green"></div>
          </div>
          <h1 className="text-5xl font-bold text-white mb-6 animate-glow" style={{textShadow: '0 0 20px rgba(0,255,65,0.3)'}}>
            Technical <span className="text-neon-green">Blog</span>
          </h1>
          <p className="text-gray-400 text-xl max-w-3xl mx-auto leading-relaxed">
            Deep dives into <span className="text-neon-green font-semibold">DevOps</span>, 
            <span className="text-neon-green font-semibold"> Cloud Architecture</span>, and 
            <span className="text-neon-bright font-semibold"> Modern Development</span> practices.
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 animate-slide-up" style={{animationDelay: '0.2s'}}>
          <div className="flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
            {/* Search */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neon-green" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-cyber-dark/60 border border-neon-green/30 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-neon-green transition-all duration-300 font-mono"
              />
            </div>

            {/* Category Filter */}
            <div className="relative">
              <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-neon-green" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="pl-12 pr-8 py-3 bg-cyber-dark/60 border border-neon-green/30 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-neon-green focus:border-neon-green transition-all duration-300 font-mono min-w-[150px]"
              >
                {categories.map(category => (
                  <option key={category} value={category} className="bg-cyber-dark text-white">
                    {category === 'all' ? 'All Categories' : category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        <div className="text-center mb-8">
          <span className="text-neon-green font-mono text-sm">
            Showing {filteredPosts.length} of {posts.length} articles
          </span>
        </div>

        {/* Blog Posts Grid */}
        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {filteredPosts.map((post, index) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group relative bg-cyber-dark/60 backdrop-blur-sm rounded-lg overflow-hidden border border-neon-green/20 hover:border-neon-green/60 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-neon-lg animate-slide-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                {/* Corner decorations */}
                <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-neon-green/40 group-hover:border-neon-green transition-colors duration-300 z-10"></div>
                <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-neon-green/40 group-hover:border-neon-green transition-colors duration-300 z-10"></div>
                <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-neon-green/40 group-hover:border-neon-green transition-colors duration-300 z-10"></div>
                <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-neon-green/40 group-hover:border-neon-green transition-colors duration-300 z-10"></div>

                {/* Glow overlay */}
                <div className="absolute inset-0 bg-neon-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Featured badge */}
                {post.meta.featured && (
                  <div className="absolute top-4 right-4 z-20">
                    <div className="bg-neon-green/20 border border-neon-green rounded-full px-3 py-1">
                      <span className="text-neon-green text-xs font-mono font-bold">FEATURED</span>
                    </div>
                  </div>
                )}

                {/* Image */}
                {post.meta.image && (
                  <div className="h-48 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-cyber-dark via-transparent to-transparent z-10"></div>
                    <img
                      src={post.meta.image}
                      alt={post.meta.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                )}

                <div className="p-6 space-y-4">
                  {/* Category and Date */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center space-x-2">
                      <Tag className="h-4 w-4 text-neon-green" />
                      <span className="text-neon-green font-mono">{post.meta.category}</span>
                    </div>
                    <div className="flex items-center space-x-4 text-gray-400">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span className="font-mono text-xs">{formatDate(post.meta.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span className="font-mono text-xs">{post.meta.readTime}</span>
                      </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-white group-hover:text-neon-green transition-colors duration-300 leading-tight">
                    {post.meta.title}
                  </h2>

                  {/* Excerpt */}
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed">
                    {post.meta.excerpt}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {post.meta.tags?.slice(0, 3).map(tag => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-cyber-gray/50 text-neon-green text-xs rounded-full border border-neon-green/30 hover:border-neon-green hover:bg-neon-green/10 transition-all duration-300 font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                    {post.meta.tags && post.meta.tags.length > 3 && (
                      <span className="px-3 py-1 bg-cyber-gray/50 text-gray-400 text-xs rounded-full border border-gray-600 font-mono">
                        +{post.meta.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Read more indicator */}
                  <div className="flex items-center justify-between pt-4 border-t border-cyber-light/20">
                    <span className="text-neon-green font-mono text-sm group-hover:animate-glow">
                      Read Article →
                    </span>
                    <div className="flex space-x-1">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className="w-1.5 h-1.5 bg-neon-green rounded-full group-hover:animate-pulse" style={{animationDelay: `${i * 0.1}s`}} />
                      ))}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-6">🔍</div>
            <h3 className="text-2xl font-bold text-white mb-4">No articles found</h3>
            <p className="text-gray-400 mb-8">
              {searchTerm || selectedCategory !== 'all' 
                ? 'Try adjusting your search or filter criteria.'
                : 'Blog posts are being loaded...'}
            </p>
            {(searchTerm || selectedCategory !== 'all') && (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('all');
                }}
                className="bg-neon-green hover:bg-neon-bright text-black font-bold py-3 px-6 rounded-lg transition-all duration-300 transform hover:scale-105 shadow-neon"
              >
                Clear Filters
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Blog;