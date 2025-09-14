import matter from 'gray-matter';

export interface ContentMeta {
  title: string;
  date: string;
  excerpt: string;
  author?: string;
  tags?: string[];
  image?: string;
  slug: string;
  readTime?: string;
  category?: string;
  featured?: boolean;
  technologies?: string[];
  github?: string;
  demo?: string;
  status?: string;
}

export interface ContentItem {
  meta: ContentMeta;
  content: string;
  slug: string;
}

// Fetch content from markdown files
export async function fetchContent(type: 'blog' | 'projects' | 'pages'): Promise<ContentItem[]> {
  try {
    // In a real app, you'd fetch this list from an API or build-time generation
    // For demo purposes, we'll simulate with known content
    const contentSlugs = await getContentSlugs(type);
    console.log(`Fetching ${type} content for slugs:`, contentSlugs);
    
    const contentItems = await Promise.all(
      contentSlugs.map(async (slug) => {
        try {
          const url = `/content/${type}/${slug}.md`;
          console.log(`Fetching: ${url}`);
          const response = await fetch(url);
          
          if (!response.ok) {
            console.error(`Failed to fetch ${slug}: ${response.status} ${response.statusText}`);
            throw new Error(`Failed to fetch ${slug}`);
          }
          
          const markdown = await response.text();
          console.log(`Successfully loaded ${slug}, content length:`, markdown.length);
          
          const { data, content } = matter(markdown);
          console.log(`Parsed frontmatter for ${slug}:`, data);
          
          return {
            meta: { ...data, slug } as ContentMeta,
            content,
            slug,
          };
        } catch (error) {
          console.error(`Error processing ${slug}:`, error);
          return null;
        }
      })
    );
    
    // Filter out null results and sort by date (newest first)
    const validItems = contentItems.filter((item): item is ContentItem => item !== null);
    console.log(`Successfully loaded ${validItems.length} items for ${type}`);
    
    return validItems.sort((a, b) => 
      new Date(b.meta.date).getTime() - new Date(a.meta.date).getTime()
    );
  } catch (error) {
    console.error(`Error fetching ${type}:`, error);
    return [];
  }
}

// Get individual content item by slug
export async function fetchContentBySlug(type: 'blog' | 'projects' | 'pages', slug: string): Promise<ContentItem | null> {
  try {
    const response = await fetch(`/content/${type}/${slug}.md`);
    if (!response.ok) {
      return null;
    }
    
    const markdown = await response.text();
    const { data, content } = matter(markdown);
    
    return {
      meta: { ...data, slug } as ContentMeta,
      content,
      slug,
    };
  } catch (error) {
    console.error(`Error fetching ${type}/${slug}:`, error);
    return null;
  }
}

// Get list of available content slugs
async function getContentSlugs(type: 'blog' | 'projects' | 'pages'): Promise<string[]> {
  // This would typically be generated at build time or fetched from an API
  // For now, we'll return known content based on type
  switch (type) {
    case 'blog':
      return ['docker-containers', 'kubernetes-deployment', 'devops-best-practices'];
    case 'projects':
      return ['cloud-infrastructure'];
    case 'pages':
      return ['about-extended', 'services'];
    default:
      return [];
  }
}

// Calculate reading time
export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  const readTime = Math.ceil(words / wordsPerMinute);
  return `${readTime} min read`;
}

// Generate excerpt from content
export function generateExcerpt(content: string, length = 150): string {
  const plainText = content.replace(/[#*`]/g, '').replace(/\n/g, ' ');
  return plainText.length > length 
    ? plainText.substring(0, length).trim() + '...'
    : plainText;
}

// Format date
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
}

// Get content by category or tag
export async function fetchContentByCategory(type: 'blog' | 'projects', category: string): Promise<ContentItem[]> {
  const allContent = await fetchContent(type);
  return allContent.filter(item => 
    item.meta.category?.toLowerCase() === category.toLowerCase() ||
    item.meta.tags?.some(tag => tag.toLowerCase() === category.toLowerCase())
  );
}

// Search content
export async function searchContent(type: 'blog' | 'projects', query: string): Promise<ContentItem[]> {
  const allContent = await fetchContent(type);
  const lowercaseQuery = query.toLowerCase();
  
  return allContent.filter(item => 
    item.meta.title.toLowerCase().includes(lowercaseQuery) ||
    item.meta.excerpt.toLowerCase().includes(lowercaseQuery) ||
    item.content.toLowerCase().includes(lowercaseQuery) ||
    item.meta.tags?.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}