# Content Management System - User Guide

## 📝 Overview

Your portfolio now includes a dynamic content management system that allows you to create and manage blog posts and projects using Markdown files. This system automatically loads content from markdown files in the `public/content/` directory.

## 📁 Folder Structure

```
public/content/
├── blog/           # Blog posts
├── projects/       # Project descriptions  
└── pages/          # Static pages (optional)
```

## ✍️ Creating Blog Posts

### 1. Create a new markdown file in `public/content/blog/`

Example: `public/content/blog/my-new-post.md`

### 2. Add frontmatter (metadata) at the top:

```markdown
---
title: "My Amazing Blog Post"
date: "2024-01-20"
excerpt: "A brief description of what this post is about"
author: "Rajesh Avhad"
tags: ["JavaScript", "React", "Web Development"]
image: "https://example.com/image.jpg"
category: "Development"
featured: true
readTime: "5 min read"
---

# Your Blog Content Here

Write your blog content using standard Markdown syntax...
```

### 3. Update content slugs in `src/utils/contentUtils.ts`

Add your new post slug to the blog array:

```typescript
case 'blog':
  return ['docker-containers', 'kubernetes-deployment', 'devops-best-practices', 'my-new-post'];
```

## 🚀 Creating Projects

### 1. Create a markdown file in `public/content/projects/`

Example: `public/content/projects/awesome-project.md`

### 2. Add project frontmatter:

```markdown
---
title: "Awesome Project Name"
date: "2024-01-15"
excerpt: "Brief project description"
technologies: ["React", "Node.js", "MongoDB"]
github: "https://github.com/username/project"
demo: "https://project-demo.com"
status: "Production"
category: "Web Development"
featured: true
image: "https://example.com/project-image.jpg"
---

# Project Documentation

Detailed project description, architecture, features, etc...
```

### 3. Add to project slugs:

```typescript
case 'projects':
  return ['cloud-infrastructure', 'awesome-project'];
```

## 🎨 Frontmatter Fields

### Blog Posts
- `title`: Post title (required)
- `date`: Publication date in YYYY-MM-DD format (required)
- `excerpt`: Brief description for cards/previews (required)
- `author`: Author name (optional, defaults to "Rajesh Avhad")
- `tags`: Array of tags (optional)
- `image`: Featured image URL (optional)
- `category`: Post category (optional)
- `featured`: Boolean for featured posts (optional)
- `readTime`: Estimated reading time (optional, auto-calculated)

### Projects
- `title`: Project name (required)
- `date`: Project completion/start date (required)
- `excerpt`: Brief project description (required)
- `technologies`: Array of technologies used (optional)
- `github`: GitHub repository URL (optional)
- `demo`: Live demo URL (optional)
- `status`: Project status (e.g., "Production", "In Progress") (optional)
- `category`: Project category (optional)
- `featured`: Boolean for featured projects (optional)
- `image`: Project screenshot/image URL (optional)

## 🖼️ Adding Images

### Method 1: Use External URLs
```markdown
image: "https://images.pexels.com/photos/123456/example.jpg"
```

### Method 2: Use Local Images
1. Add images to the `public/` folder
2. Reference them with a path starting with `/`
```markdown
image: "/my-project-screenshot.png"
```

## 🔧 Troubleshooting

### Blog posts not showing?
1. Check browser console for errors
2. Verify markdown files are in the correct folder
3. Ensure frontmatter syntax is correct
4. Make sure content slug is added to `contentUtils.ts`

### Search not working?
- The search functionality searches through titles, excerpts, and tags
- Make sure your content has proper frontmatter with these fields

### Images not loading?
- For local images, place them in the `public/` folder
- Use absolute paths starting with `/` for local images
- External images should use full URLs with `https://`

## 🎯 Testing Your Content

1. Visit `/test-markdown.html` to test if markdown files are accessible
2. Check the browser console for any loading errors
3. The system includes fallback content if markdown files fail to load

## 📊 Current Content Files

Your portfolio currently includes these sample files:
- `docker-containers.md` - Docker best practices blog post
- `kubernetes-deployment.md` - Kubernetes deployment guide
- `devops-best-practices.md` - DevOps methodologies post
- `cloud-infrastructure.md` - Cloud infrastructure project

## 🚀 Next Steps

1. Replace sample content with your own blog posts and projects
2. Update the content slugs in `contentUtils.ts` when adding new content
3. Customize the styling in the blog and project components if needed
4. Consider adding more content types (tutorials, case studies, etc.)

## 💡 Tips

- Use descriptive filenames for your markdown files
- Keep frontmatter consistent across posts
- Optimize images for web (use appropriate sizes)
- Write engaging excerpts for better preview cards
- Use relevant tags for better searchability