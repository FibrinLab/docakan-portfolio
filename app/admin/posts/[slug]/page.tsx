'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import MarkdownEditor from '@/components/MarkdownEditor';

export default function EditPost() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState('');
  const [readingTime, setReadingTime] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [newSlug, setNewSlug] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Load post data
    const loadPost = async () => {
      try {
        const response = await fetch('/api/admin/posts');
        if (response.status === 401) {
          router.push('/admin');
          return;
        }
        const data = (await response.json()) as { posts?: any[] };
        const post = data.posts?.find((p: any) => p.slug === slug);

        if (post) {
          // Fetch full content
          const fullResponse = await fetch(`/api/admin/posts/${slug}`);
          if (fullResponse.ok) {
            const fullData = (await fullResponse.json()) as any;
            setTitle(fullData.title || '');
            setContent(fullData.content || '');
            setDate(fullData.date || '');
            setReadingTime(fullData.readingTime || '');
            setExcerpt(fullData.excerpt || '');
            setNewSlug(slug);
          }
        }
      } catch (error) {
        console.error('Error loading post:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPost();
  }, [slug, router]);

  const handleSave = async () => {
    if (!title || !content) {
      alert('Title and content are required');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/admin/posts', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          title,
          content,
          date,
          readingTime,
          excerpt,
          newSlug: newSlug !== slug ? newSlug : undefined,
        }),
      });

      const data = (await response.json()) as { success: boolean; slug?: string; error?: string };

      if (data.success) {
        if (data.slug !== slug) {
          router.push(`/admin/posts/${data.slug}`);
        } else {
          router.push('/admin/posts');
        }
      } else {
        alert(`Failed to save: ${data.error}`);
      }
    } catch (error) {
      alert('Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-6 py-16">
        <p className="font-mono">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Edit Post</h1>
        <div className="flex gap-2">
          <button
            onClick={() => router.back()}
            className="border border-black px-4 py-2 font-mono text-sm hover:bg-black hover:text-white transition-all"
          >
            CANCEL
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="border border-black px-4 py-2 font-mono text-sm bg-black text-white hover:bg-black/80 transition-all disabled:opacity-50"
          >
            {saving ? 'SAVING...' : 'SAVE'}
          </button>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-mono mb-2">Title *</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-black px-4 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-black"
            placeholder="Post title"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-mono mb-2">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full border border-black px-4 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
          <div>
            <label className="block text-sm font-mono mb-2">Reading Time (min)</label>
            <input
              type="text"
              value={readingTime}
              onChange={(e) => setReadingTime(e.target.value)}
              className="w-full border border-black px-4 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="5"
            />
          </div>
          <div>
            <label className="block text-sm font-mono mb-2">Slug</label>
            <input
              type="text"
              value={newSlug}
              onChange={(e) => setNewSlug(e.target.value)}
              className="w-full border border-black px-4 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-mono mb-2">Excerpt</label>
          <textarea
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
            className="w-full border border-black px-4 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-black"
            rows={2}
            placeholder="Brief excerpt for the blog listing"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-mono mb-2">Content *</label>
        <MarkdownEditor value={content} onChange={setContent} />
      </div>
    </div>
  );
}
