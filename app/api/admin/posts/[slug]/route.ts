import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'content/blog');

function isAuthenticated(request: NextRequest): boolean {
  const auth = request.cookies.get('admin-auth');
  return auth?.value === 'authenticated';
}

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const slug = params.slug;
    const filePath = path.join(postsDirectory, `${slug}.mdx`);
    const altPath = path.join(postsDirectory, `${slug}.md`);

    let filePathToUse: string;
    if (fs.existsSync(filePath)) {
      filePathToUse = filePath;
    } else if (fs.existsSync(altPath)) {
      filePathToUse = altPath;
    } else {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const fileContents = fs.readFileSync(filePathToUse, 'utf8');
    const { data, content } = matter(fileContents);

    return NextResponse.json({
      slug,
      title: data.title || '',
      date: data.date || '',
      readingTime: data.readingTime || '',
      excerpt: data.excerpt || '',
      content,
    });
  } catch (error) {
    console.error('Error loading post:', error);
    return NextResponse.json({ error: 'Failed to load post' }, { status: 500 });
  }
}
