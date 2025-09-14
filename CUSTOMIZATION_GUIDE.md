# 🚀 Quick Customization Guide

This guide helps you quickly update your portfolio with your personal information.

## 🎯 Priority Files to Update (In Order)

### 1. **Hero Section** - First Impression
**File:** `src/components/CyberHero.tsx`

```typescript
// Line ~15: Update professional titles
const titles = [
  "DEVOPS_ENGINEER",    // ← Change to your title
  "CLOUD_ARCHITECT",    // ← Change to your title  
  "FULL_STACK_DEV"      // ← Change to your title
];

// Line ~80: Update email
const handleEmailClick = () => {
  window.location.href = "mailto:your.email@domain.com"; // ← Your email
};
```

### 2. **Header/Navigation** - Visible on all pages
**File:** `src/components/Header.tsx`

```typescript
// Line ~27: Update your name
<span className="group-hover:animate-glow">YourFirstName</span> // ← First name
<span className="text-gray-400">YourLastName</span>            // ← Last name
```

### 3. **About Section** - Your story
**File:** `src/components/About.tsx`

```typescript
// Update the entire about content with your information
const aboutData = {
  name: "Your Name",
  role: "Your Job Title", 
  bio: "Your professional bio...",
  experience: "X+ years",
  projects: "XX+",
  clients: "XX+"
};
```

### 4. **Skills/Tech Stack** - Your expertise  
**File:** `src/components/TechStack.tsx`

```typescript
// Update with your actual skills
const skills = {
  "Cloud Platforms": ["AWS", "Azure", "GCP"], // ← Your cloud skills
  "DevOps Tools": ["Docker", "Kubernetes"],   // ← Your DevOps skills
  "Languages": ["Python", "JavaScript"],       // ← Your languages
  // Add more categories...
};
```

### 5. **Projects** - Your work
**File:** `src/components/Projects.tsx`

```typescript
const projects = [
  {
    title: "Your Project Name",                    // ← Project title
    description: "What your project does...",      // ← Description
    tech: ["React", "Node.js", "AWS"],            // ← Technologies used
    github: "https://github.com/you/project",     // ← GitHub link
    demo: "https://yourproject.com",              // ← Live demo
    image: "/project-image.png"                   // ← Project image
  }
  // Add more projects...
];
```

### 6. **Contact Information**
**File:** `src/components/Contact.tsx`

```typescript
// Update your contact details
const contact = {
  email: "your.email@domain.com",              // ← Your email
  phone: "+1 (555) 123-4567",                 // ← Your phone  
  location: "Your City, Country",              // ← Your location
  linkedin: "https://linkedin.com/in/you",    // ← LinkedIn
  github: "https://github.com/yourusername"   // ← GitHub
};
```

### 7. **Footer** - Copyright and links
**File:** `src/components/Footer.tsx`

```typescript
// Update copyright
<p>© 2024 Your Name. All rights reserved.</p>  // ← Your name

// Update social links
const socialLinks = [
  { name: "GitHub", url: "https://github.com/you" },
  { name: "LinkedIn", url: "https://linkedin.com/in/you" },
  // Add more...
];
```

## 🔧 Quick Terminal Commands for Testing

After making changes, test your portfolio:

```bash
# 1. Install dependencies (if not done)
npm install

# 2. Start development server
npm run dev

# 3. Open in browser
# Visit: http://localhost:5173 (or the port shown)

# 4. Test build (before deployment)  
npm run build
```

## 📱 Social Media Links Checklist

Update these links throughout the codebase:

- [ ] **GitHub:** `https://github.com/yourusername`
- [ ] **LinkedIn:** `https://linkedin.com/in/yourprofile`
- [ ] **Twitter:** `https://twitter.com/yourusername` 
- [ ] **Email:** `your.email@domain.com`
- [ ] **Phone:** `+1234567890`
- [ ] **Location:** `Your City, Country`

## 🖼️ Images to Replace

Add these images to the `public/` folder:

- [ ] `public/profile-photo.jpg` - Your professional photo
- [ ] `public/og-image.png` - Social media preview (1200x630px)
- [ ] `public/projects/project1.png` - Project screenshots
- [ ] `public/favicon.ico` - Browser icon

## 🎨 Brand Colors (Optional)

To change the color scheme, edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      'neon-green': '#00FF00',    // ← Change primary color
      'neon-pink': '#FF1493',     // ← Change accent color
      'cyber-black': '#000000'    // ← Change background
    }
  }
}
```

## ⚡ Quick SEO Updates

**File:** `src/components/SEO.tsx`

```typescript
// Update default meta information
title = "Your Name - Your Professional Title",
description = "Brief description of what you do...",
keywords = "Your Skills, Technologies, Industry Keywords",
url = "https://yourdomain.com"
```

## 🔍 Search and Replace

Use your code editor to quickly find and replace:

1. **Find:** `Rajesh Avhad` **→ Replace:** `Your Name`
2. **Find:** `rajeshavhad` **→ Replace:** `yourusername`  
3. **Find:** `DevOps Engineer` **→ Replace:** `Your Job Title`
4. **Find:** `rajesh.avhad@email.com` **→ Replace:** `your.email@domain.com`

## 📋 Pre-Launch Checklist

- [ ] Updated all personal information
- [ ] Added your real projects with descriptions
- [ ] Updated social media links
- [ ] Added your professional photo
- [ ] Tested contact form
- [ ] Checked mobile responsiveness
- [ ] Tested all navigation links
- [ ] Verified terminal commands work
- [ ] Added your domain to SEO settings
- [ ] Tested build process (`npm run build`)

## 🚀 Ready to Deploy?

1. **Build the project:**
   ```bash
   npm run build
   ```

2. **Test the build locally:**
   ```bash
   npm run preview
   ```

3. **Deploy to your hosting platform:**
   - Netlify: Connect GitHub repo
   - Vercel: Import from GitHub  
   - GitHub Pages: Use gh-pages package

---

**Need more help?** Check the main `README.md` for detailed instructions!

🎉 **You're all set!** Your cyberpunk portfolio is ready to impress!