# 🌃 Cyberpunk Portfolio - Rajesh Avhad

A stunning cyberpunk-themed portfolio website built with React, TypeScript, and Tailwind CSS. Features a Night City aesthetic with neon effects, interactive terminal, and smooth animations.

![Portfolio Preview](https://via.placeholder.com/800x400/000000/00FFFF?text=Cyberpunk+Portfolio)

## 🚀 Features

- **🎨 Cyberpunk Night City Theme** - Dark aesthetic with neon glows and matrix effects
- **💻 Interactive Terminal** - Fully functional command-line interface
- **📱 Responsive Design** - Works perfectly on all devices
- **⚡ Performance Optimized** - Lazy loading and code splitting
- **🔍 SEO Ready** - Meta tags, Open Graph, and structured data
- **♿ Accessible** - ARIA labels, keyboard navigation, and screen reader support
- **📊 Analytics Ready** - Built-in tracking for user interactions
- **🎭 Smooth Animations** - Framer Motion powered transitions

## 🛠️ Tech Stack

- **Frontend:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS with custom cyberpunk theme
- **Animations:** Framer Motion
- **Routing:** React Router DOM
- **Icons:** Lucide React
- **SEO:** React Helmet Async

## 📁 Project Structure

```
raj_portfolio/
├── public/
│   ├── index.html
│   └── assets/
├── src/
│   ├── components/          # Reusable components
│   │   ├── About.tsx        # About section
│   │   ├── Contact.tsx      # Contact form
│   │   ├── CyberHero.tsx    # Hero section
│   │   ├── Footer.tsx       # Footer component
│   │   ├── Header.tsx       # Navigation header
│   │   ├── Projects.tsx     # Projects showcase
│   │   ├── TechStack.tsx    # Skills/technologies
│   │   └── InteractiveTerminal.tsx  # Terminal interface
│   ├── pages/               # Page components
│   │   ├── Blog.tsx         # Blog listing
│   │   ├── BlogPost.tsx     # Individual blog post
│   │   └── blog/            # Blog content
│   ├── utils/               # Utility functions
│   └── styles/              # CSS and theme files
├── package.json
└── README.md
```

## 🎯 How to Customize Your Portfolio

### 1. Personal Information

#### Update Basic Info in Multiple Files:

**📍 `src/components/SEO.tsx`** - Meta tags and SEO
```typescript
const SEO: React.FC<SEOProps> = ({
  title = "YOUR NAME - Your Title",
  description = "Your professional description...",
  keywords = "Your Keywords, Skills, Technologies",
  url = "https://yourdomain.com",
  // ...
});
```

**📍 `src/components/CyberHero.tsx`** - Hero section
```typescript
// Update the professional titles array
const titles = [
  "YOUR_TITLE_1",
  "YOUR_TITLE_2", 
  "YOUR_TITLE_3"
];

// Update contact information
const handleEmailClick = () => {
  window.location.href = "mailto:your.email@domain.com";
};
```

**📍 `src/components/Header.tsx`** - Navigation header
```typescript
<span className="group-hover:animate-glow">YourFirstName</span>
<span className="text-gray-400 group-hover:text-neon-bright transition-colors duration-300">YourLastName</span>
```

**📍 `src/components/About.tsx`** - About section
```typescript
// Update your bio, background, and personal information
const aboutContent = {
  name: "Your Name",
  title: "Your Professional Title",
  bio: "Your professional bio...",
  // ... other details
};
```

**📍 `src/components/Footer.tsx`** - Footer information
```typescript
// Update copyright and social links
<p className="text-gray-400">© 2024 Your Name. All rights reserved.</p>
```

### 2. Social Links & Contact

**📍 `src/components/Contact.tsx`** - Contact information
```typescript
// Update your contact details
const contactInfo = {
  email: "your.email@domain.com",
  phone: "+1234567890",
  location: "Your City, Country",
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourusername",
  twitter: "https://twitter.com/yourusername"
};
```

**📍 `src/components/SEO.tsx`** - Social media links for structured data
```typescript
"sameAs": [
  "https://github.com/yourusername",
  "https://linkedin.com/in/yourprofile", 
  "https://twitter.com/yourusername"
]
```

### 3. Skills & Technologies

**📍 `src/components/TechStack.tsx`** - Update your skill set
```typescript
const technologies = [
  {
    category: "Your Category 1",
    skills: ["Skill1", "Skill2", "Skill3"]
  },
  {
    category: "Your Category 2", 
    skills: ["Skill4", "Skill5", "Skill6"]
  },
  // Add more categories...
];
```

**📍 `src/components/SEO.tsx`** - Skills for SEO
```typescript
"knowsAbout": [
  "Your Skill 1",
  "Your Skill 2",
  "Your Skill 3"
  // Add your skills...
]
```

### 4. Projects Portfolio

**📍 `src/components/Projects.tsx`** - Main projects showcase
```typescript
const projects = [
  {
    id: 1,
    title: "Your Project Title",
    description: "Brief project description",
    tech: ["Tech1", "Tech2", "Tech3"],
    github: "https://github.com/yourusername/project",
    demo: "https://your-demo-url.com",
    image: "/path-to-your-image.png"
  },
  // Add more projects...
];
```

**📍 `src/components/ProjectShowcase.tsx`** - Featured projects (if using)
```typescript
const projects: Project[] = [
  {
    id: 1,
    title: "Your Featured Project",
    description: "Short description",
    longDescription: "Detailed description...",
    tech: ["Technology stack"],
    github: "https://github.com/yourusername/repo",
    demo: "https://demo-url.com",
    stats: { stars: 0, forks: 0 }, // GitHub stats
    featured: true
  }
];
```

### 5. Blog Content

**📍 `src/pages/blog/`** - Create your blog posts
```typescript
// Create new .tsx files for each blog post
// Example: docker.tsx, kubernetes.tsx, your-topic.tsx

// Update author information in existing blog posts
<span>By Your Name</span>
```

**📍 `src/pages/Blog.tsx`** - Blog listing page
```typescript
// Update featured blog posts and categories
const featuredPosts = [
  {
    title: "Your Blog Post Title",
    excerpt: "Brief description...", 
    date: "2024-01-01",
    slug: "your-post-slug",
    category: "Your Category"
  }
];
```

### 6. Terminal Commands

**📍 `src/components/InteractiveTerminal.tsx`** - Customize terminal
```typescript
// Update the help command with your information
case 'help':
  return `Available commands:
  about     - Learn about Your Name
  skills    - View technical skills
  projects  - Browse my projects
  contact   - Get in touch
  blog      - Read my blog posts
  clear     - Clear terminal
  exit      - Return to portfolio`;
```

### 7. Analytics & Tracking

**📍 `src/utils/analytics.ts`** - Analytics configuration
```typescript
// Replace with your Google Analytics ID
(window as any).gtag('config', 'YOUR_GA_MEASUREMENT_ID', {
  page_path: path,
});
```

**📍 Create `.env` file in root:**
```env
VITE_GA_MEASUREMENT_ID=your_google_analytics_id
VITE_SITE_URL=https://yourdomain.com
VITE_AUTHOR_EMAIL=your.email@domain.com
```

### 8. Domain & Deployment

**📍 `public/index.html`** - Update meta information
```html
<title>Your Name - Your Professional Title</title>
<meta name="description" content="Your portfolio description">
```

**📍 `package.json`** - Update project information
```json
{
  "name": "your-portfolio",
  "description": "Your portfolio description",
  "author": "Your Name <your.email@domain.com>",
  "homepage": "https://yourdomain.com"
}
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/your-portfolio.git
cd your-portfolio
```

2. **Install dependencies**
```bash
npm install
```

3. **Install additional SEO dependencies**
```bash
npm install react-helmet-async
```

4. **Create environment file**
```bash
cp .env.example .env
# Edit .env with your information
```

5. **Start development server**
```bash
npm run dev
```

6. **Build for production**
```bash
npm run build
```

## 🎨 Customization Tips

### Colors & Theme
- Primary colors are defined in `tailwind.config.js`
- Neon effects use cyan (`#00FFFF`) and purple (`#8B5CF6`) 
- You can modify the color scheme in the config file

### Fonts
- Currently uses system fonts and mono fonts
- You can add custom fonts in `index.html` or `main.tsx`

### Animations
- All animations are in individual components
- Powered by Framer Motion - check their docs for more options
- Cyberpunk effects are in `src/components/CyberpunkEffects.tsx`

### Adding New Sections
1. Create component in `src/components/`
2. Import and add to `src/components/PortfolioLanding.tsx`
3. Update navigation in `src/components/Header.tsx`

## 📱 Deployment

### Netlify (Recommended)
1. Connect your GitHub repository
2. Build command: `npm run build` 
3. Publish directory: `dist`

### Vercel
1. Import your GitHub repository
2. Framework preset: Vite
3. Build command: `npm run build`
4. Output directory: `dist`

### GitHub Pages
1. Install gh-pages: `npm install --save-dev gh-pages`
2. Add to package.json scripts: `"deploy": "gh-pages -d dist"`
3. Run: `npm run build && npm run deploy`

## 🔧 Configuration Files

- `vite.config.ts` - Vite configuration
- `tailwind.config.js` - Tailwind CSS configuration
- `tsconfig.json` - TypeScript configuration
- `.env` - Environment variables (create from .env.example)

## 📈 Performance Tips

- Images should be optimized (WebP format recommended)
- Keep bundle size under 1MB for optimal loading
- Use lazy loading for images and heavy components
- Enable gzip compression on your hosting platform

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Need Help?

- Check the component files for inline comments
- All styling uses Tailwind CSS classes
- Animations are handled by Framer Motion
- Terminal functionality is in `InteractiveTerminal.tsx`

## 🎯 Quick Checklist

- [ ] Update personal information in all components
- [ ] Replace social media links
- [ ] Add your projects to Projects.tsx
- [ ] Update skills in TechStack.tsx
- [ ] Customize terminal commands
- [ ] Add your blog posts
- [ ] Configure analytics
- [ ] Update meta tags and SEO
- [ ] Test responsive design
- [ ] Deploy to your domain

---

**Made with ❤️ and lots of ☕**

*Happy coding! 🚀*