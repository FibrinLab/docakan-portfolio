# doc akan

A minimal, typewriter-style personal portfolio and blog built with Next.js, Tailwind CSS, and MDX.

## Features

- **Minimal Design**: Black and white, text-first aesthetic inspired by academic journals and typewritten manuscripts
- **Projects Showcase**: Display your built, led, and contributed projects with filtering
- **Tech Stack Section**: Interactive collapsible tech stack display
- **Blog**: MDX-based blog with markdown support
- **Admin Interface**: Web-based markdown editor for creating and editing blog posts
- **Consulting Page**: Professional services information
- **Contact Page**: Simple contact information
- **Background Animation**: Subtle typewriter-themed animated background
- **GitHub Contributions**: Displays your GitHub contribution heatmap
- **Social Links**: Configurable social media links in footer and landing page
- **Responsive**: Mobile-friendly design

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
/app
  /page.tsx              # Home page
  /consulting/page.tsx    # Consulting services
  /blog/page.tsx          # Blog listing
  /blog/[slug]/page.tsx   # Individual blog posts
  /contact/page.tsx       # Contact page
  /admin/page.tsx         # Admin login
  /admin/posts/page.tsx   # Admin posts list
  /admin/posts/new/page.tsx # New post editor
  /admin/posts/[slug]/page.tsx # Edit post
/components
  Layout.tsx              # Main layout wrapper
  Header.tsx              # Navigation header
  Footer.tsx              # Footer
/content
  /blog                   # MDX blog posts
/components
  ProjectsSection.tsx     # Projects showcase component
  ProjectCard.tsx         # Individual project card
  TechStack.tsx           # Tech stack display
  TypewriterBackground.tsx # Animated background
  MarkdownEditor.tsx       # Markdown editor component
/lib
  blog.ts                 # Blog post utilities
  projects.ts             # Projects data and utilities
/app/api/admin
  /login/route.ts         # Admin authentication
  /posts/route.ts         # Blog post CRUD API
  /upload/route.ts        # Image upload API
```

## Adding Blog Posts

### Using the Admin Interface (Recommended)

1. Set up your admin password by creating a `.env` file:
```bash
ADMIN_PASSWORD=your-secure-password
```

2. Navigate to `/admin` and log in with your password

3. Click "NEW POST" to create a blog post with:
   - Markdown editor with live preview
   - Code syntax highlighting
   - Image upload support
   - Split view for editing and previewing

### Manual Method

Create new `.mdx` files in `/content/blog/` with frontmatter:

```mdx
---
title: "Your Post Title"
date: "2024-01-15"
readingTime: "5"
excerpt: "A brief excerpt of your post"
---

Your content here...
```

## Adding Projects

Edit `/lib/projects.ts` and add your projects to the `projects` array:

```typescript
{
  id: 'project-1',
  title: 'Clinical Decision Support System',
  description: 'AI-powered CDS for neonatal care workflows with real-time integration',
  tech: ['TypeScript', 'React', 'Python', 'FastAPI', 'PostgreSQL', 'HL7'],
  year: '2024',
  type: 'built', // 'built' | 'contributed' | 'led'
  url: 'https://example.com',
  github: 'https://github.com/username/repo',
  status: 'active', // 'active' | 'archived' | 'completed'
}
```

Projects are automatically sorted by year (newest first) and can be filtered by type (BUILT or CONTRIBUTED).

## Adding Awards

Edit `/lib/awards.ts` and add your awards to the `awards` array:

```typescript
{
  id: 'award-1',
  title: 'First Place',
  event: 'Healthcare Innovation Hackathon',
  year: '2024',
  description: 'Built a real-time patient monitoring system',
  prize: '$10,000',
  url: 'https://example.com',
}
```

Awards will automatically appear on the landing page in the "Awards & Recognition" section.

## GitHub Contributions Heatmap

1. Set your GitHub username in `.env`:
```bash
GITHUB_USERNAME=your-github-username
```

2. (Optional) For higher rate limits, add a GitHub personal access token:
```bash
GITHUB_TOKEN=ghp_your_token_here
```

The heatmap will automatically fetch and display your contribution data on the landing page.

## Social Links

Edit `/lib/social.ts` to add your social media links:

```typescript
export const socialLinks: SocialLink[] = [
  {
    name: 'github',
    url: 'https://github.com/yourusername',
    label: 'GitHub',
  },
  {
    name: 'twitter',
    url: 'https://twitter.com/yourusername',
    label: 'Twitter',
  },
  // Add more links...
];
```

Social links appear in the footer and on the landing page.

## Design Philosophy

This site follows a strict minimal design system:
- Black and white only
- No gradients, cards, or glassmorphism
- Monospace typography (IBM Plex Mono)
- Academic/journal-inspired layout
- Text-first, document-like experience

## Build

```bash
npm run build
npm start
```
