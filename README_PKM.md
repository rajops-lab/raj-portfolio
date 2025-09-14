# 🧠 PKM System - Personal Knowledge Management

A comprehensive, blockchain-powered Personal Knowledge Management system built with React, Supabase, and advanced encryption.

## 🚀 Features

### Core Functionality
- **🔐 Secure Authentication** - Email/password with immediate redirect to dashboard
- **📝 Notes Management** - Full CRUD operations with rich text editing
- **🔗 Blockchain Storage** - Tamper-proof, encrypted note storage
- **🔍 Advanced Search** - Full-text search with AI-powered relevance
- **🏷️ Smart Tagging** - Organize and filter notes by tags
- **📁 File Uploads** - OCR support for images and PDFs
- **💳 Stripe Integration** - Subscription management and billing
- **📱 Responsive Design** - Works on all devices

### Security Features
- **Client-side Encryption** - Notes encrypted before leaving your device
- **Zero-knowledge Architecture** - Even we cannot access your data
- **Blockchain Integrity** - Immutable storage with verification
- **Secure File Storage** - Encrypted file uploads with OCR processing

### Subscription Tiers
- **Free**: 100 notes, 10MB storage, basic search
- **Pro**: Unlimited notes, 1GB storage, blockchain, OCR, API access
- **Enterprise**: Everything + team features, 10GB storage, priority support

## 🛠️ Tech Stack

### Frontend
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **React Hot Toast** for notifications

### Backend & Database
- **Supabase** for database and authentication
- **PostgreSQL** with Row Level Security
- **Supabase Storage** for file uploads
- **Edge Functions** for Stripe integration

### Blockchain & Security
- **Custom Blockchain** implementation
- **AES Encryption** with PBKDF2 key derivation
- **SHA-256 Hashing** for block integrity
- **HMAC Signatures** for authentication

### Third-party Services
- **Stripe** for payment processing
- **Tesseract.js** for OCR functionality
- **Fuse.js** for intelligent search
- **CryptoJS** for encryption

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Supabase account
- Stripe account (for payments)

### Environment Setup

1. **Copy environment variables:**
```bash
cp .env.example .env
```

2. **Configure Supabase:**
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Configure Stripe:**
```env
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

### Database Setup

1. **Connect to Supabase** (click the button in the top right)

2. **Run the migration:**
The database schema will be automatically created when you connect to Supabase.

3. **Configure Stripe products:**
Create products in your Stripe dashboard with these price IDs:
- `price_pro_monthly` for Pro plan
- `price_enterprise_monthly` for Enterprise plan

### Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 📖 Usage Guide

### Getting Started

1. **Visit the PKM System:** Navigate to `/pkm` from the portfolio
2. **Create Account:** Sign up with email and password
3. **Start Creating:** You'll be redirected to `/notes` dashboard
4. **Add Your First Note:** Click "New Note" to begin

### Creating Notes

1. Click **"New Note"** in the dashboard
2. Add a **title** and **content** (supports Markdown)
3. Add **tags** for organization
4. **Save** - note is automatically encrypted and stored

### File Uploads

1. Click **"Upload"** in the dashboard
2. **Drag & drop** or select files (images, PDFs, text)
3. **OCR processing** extracts text automatically
4. **Add to notes** - incorporate extracted text into your notes

### Search & Organization

- **Search bar** - Full-text search across all notes
- **Tag filters** - Click tags to filter notes
- **Grid/List view** - Toggle between viewing modes

### Blockchain Features

- **Automatic encryption** - All notes encrypted client-side
- **Blockchain storage** - Tamper-proof note history
- **Integrity verification** - Verify your data hasn't been modified
- **Secure sharing** - Share encrypted notes securely

## 🔧 API Documentation

### Authentication

```typescript
// Sign up
POST /api/auth/signup
{
  "email": "user@example.com",
  "password": "securepassword",
  "name": "User Name"
}

// Sign in
POST /api/auth/signin
{
  "email": "user@example.com", 
  "password": "securepassword"
}
```

### Notes Management

```typescript
// Get all notes
GET /api/notes?page=1&limit=20

// Create note
POST /api/notes
{
  "title": "My Note",
  "content": "Note content...",
  "tags": ["tag1", "tag2"]
}

// Update note
PUT /api/notes/:id
{
  "title": "Updated title",
  "content": "Updated content..."
}

// Delete note
DELETE /api/notes/:id
```

### Search

```typescript
// Search notes
GET /api/search?q=query&tags=tag1,tag2

// Get notes by tag
GET /api/notes/tag/:tagName
```

### File Upload

```typescript
// Upload file
POST /api/upload
FormData with file

// Get user files
GET /api/files
```

## 🔒 Security Architecture

### Encryption Flow

1. **User Registration** → Generate unique encryption key
2. **Note Creation** → Encrypt content client-side
3. **Blockchain Storage** → Store encrypted data with hash
4. **Retrieval** → Decrypt content client-side
5. **Verification** → Validate blockchain integrity

### Data Protection

- **Client-side encryption** using AES-256
- **Key derivation** with PBKDF2 (10,000 iterations)
- **Blockchain hashing** with SHA-256
- **Digital signatures** with HMAC-SHA256
- **Row Level Security** in database

## 🚀 Deployment

### Supabase Setup

1. Create new Supabase project
2. Run the database migration
3. Configure storage bucket policies
4. Deploy edge functions for Stripe

### Stripe Configuration

1. Create Stripe account
2. Set up products and prices
3. Configure webhooks
4. Add environment variables

### Production Deployment

```bash
# Build the application
npm run build

# Deploy to Vercel/Netlify
# Set environment variables in deployment platform
```

## 🧪 Testing

### Manual Testing Checklist

- [ ] User registration and login
- [ ] Note creation, editing, deletion
- [ ] File upload with OCR
- [ ] Search functionality
- [ ] Tag filtering
- [ ] Blockchain verification
- [ ] Stripe checkout flow
- [ ] Responsive design

### API Testing

Use tools like Postman or curl to test API endpoints:

```bash
# Test note creation
curl -X POST http://localhost:5173/api/notes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{"title":"Test Note","content":"Test content","tags":["test"]}'
```

## 🔧 Configuration

### Subscription Limits

Edit `src/lib/stripe.ts` to modify plan features:

```typescript
const subscriptionPlans = [
  {
    id: 'free',
    max_notes: 100,
    max_storage_mb: 10,
    // ... other features
  }
];
```

### Blockchain Settings

Modify blockchain parameters in `src/lib/blockchain.ts`:

```typescript
// Encryption settings
const PBKDF2_ITERATIONS = 10000;
const AES_KEY_SIZE = 256;
```

## 🐛 Troubleshooting

### Common Issues

**Authentication not working:**
- Check Supabase URL and keys
- Verify RLS policies are enabled
- Check browser console for errors

**File uploads failing:**
- Verify storage bucket exists
- Check file size limits (10MB default)
- Ensure storage policies are configured

**Stripe integration issues:**
- Verify webhook endpoints
- Check Stripe keys in environment
- Test in Stripe dashboard

### Debug Mode

Enable debug logging:

```typescript
// In browser console
localStorage.setItem('pkm_debug', 'true');
```

## 📚 Architecture Details

### Database Schema

```sql
-- Core tables
users (id, email, name, subscription_tier, encryption_key)
notes (id, user_id, title, content, tags, blockchain_hash)
blockchain_blocks (id, user_id, note_id, encrypted_data, hash)
file_uploads (id, user_id, filename, file_path, ocr_text)
```

### Security Model

```
User Input → Client Encryption → Blockchain Storage → Database
     ↓              ↓                    ↓              ↓
  Plain Text → AES Encrypted → Hash Chain → Metadata Only
```

### API Architecture

```
Frontend → Supabase Client → PostgreSQL + RLS
    ↓           ↓                    ↓
React App → Edge Functions → Stripe API
```

## 🤝 Contributing

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push to branch: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🆘 Support

- **Documentation:** Check this README and inline code comments
- **Issues:** Create GitHub issues for bugs or feature requests
- **Email:** Contact for enterprise support

---

**Built with ❤️ by Rajesh Avhad**

*Secure your knowledge. Own your data. Build your future.*