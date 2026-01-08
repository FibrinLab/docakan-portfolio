import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

// Check authentication
function isAuthenticated(request: NextRequest): boolean {
  const auth = request.cookies.get('admin-auth');
  return auth?.value === 'authenticated';
}

// Generate slug from title
function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const posts = fs.readdirSync(postsDirectory)
      .filter((file) => file.endsWith('.mdx') || file.endsWith('.md'))
      .map((file) => {
        const filePath = path.join(postsDirectory, file);
        const fileContents = fs.readFileSync(filePath, 'utf8');
        const { data } = matter(fileContents);
        return {
          slug: file.replace(/\.(mdx|md)$/, ''),
          title: data.title || '',
          date: data.date || '',
          readingTime: data.readingTime || '',
          excerpt: data.excerpt || '',
        };
      });

    return NextResponse.json({ posts });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to load posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { title, content, date, readingTime, excerpt, slug: providedSlug } = await request.json();

    if (!title || !content) {
      return NextResponse.json({ error: 'Title and content are required' }, { status: 400 });
    }

    const slug = providedSlug || generateSlug(title);
    const postDate = date || new Date().toISOString().split('T')[0];

    // Create frontmatter
    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${postDate}"
${readingTime ? `readingTime: "${readingTime}"` : ''}
${excerpt ? `excerpt: "${excerpt.replace(/"/g, '\\"')}"` : ''}
---

`;

    const fullContent = frontmatter + content;
    const filePath = path.join(postsDirectory, `${slug}.mdx`);

    // Ensure directory exists
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    fs.writeFileSync(filePath, fullContent, 'utf8');

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error('Error saving post:', error);
    return NextResponse.json({ error: 'Failed to save post' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { slug, title, content, date, readingTime, excerpt, newSlug } = await request.json();

    if (!slug || !title || !content) {
      return NextResponse.json({ error: 'Slug, title and content are required' }, { status: 400 });
    }

    const postDate = date || new Date().toISOString().split('T')[0];
    const finalSlug = newSlug || slug;

    // Create frontmatter
    const frontmatter = `---
title: "${title.replace(/"/g, '\\"')}"
date: "${postDate}"
${readingTime ? `readingTime: "${readingTime}"` : ''}
${excerpt ? `excerpt: "${excerpt.replace(/"/g, '\\"')}"` : ''}
---

`;

    const fullContent = frontmatter + content;
    const filePath = path.join(postsDirectory, `${finalSlug}.mdx`);
    const oldFilePath = path.join(postsDirectory, `${slug}.mdx`);

    // If slug changed, delete old file
    if (finalSlug !== slug && fs.existsSync(oldFilePath)) {
      fs.unlinkSync(oldFilePath);
    }

    // Ensure directory exists
    if (!fs.existsSync(postsDirectory)) {
      fs.mkdirSync(postsDirectory, { recursive: true });
    }

    fs.writeFileSync(filePath, fullContent, 'utf8');

    return NextResponse.json({ success: true, slug: finalSlug });
  } catch (error) {
    console.error('Error updating post:', error);
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (!slug) {
      return NextResponse.json({ error: 'Slug is required' }, { status: 400 });
    }

    const filePath = path.join(postsDirectory, `${slug}.mdx`);
    const altPath = path.join(postsDirectory, `${slug}.md`);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    } else if (fs.existsSync(altPath)) {
      fs.unlinkSync(altPath);
    } else {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting post:', error);
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 });
  }
}
