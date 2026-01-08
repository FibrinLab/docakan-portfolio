'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import MarkdownEditor from '@/components/MarkdownEditor';
import { getBlogPost } from '@/lib/blog';

export default function NewPost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [readingTime, setReadingTime] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [slug, setSlug] = useState('');
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  const handleSave = async () => {
    if (!title || !content) {
      alert('Title and content are required');
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/admin/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          content,
          date,
          readingTime,
          excerpt,
          slug: slug || undefined,
        }),
      });

      const data = await response.json();

      if (data.success) {
        router.push('/admin/posts');
      } else {
        alert(`Failed to save: ${data.error}`);
      }
    } catch (error) {
      alert('Failed to save post');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">New Post</h1>
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
            <label className="block text-sm font-mono mb-2">Slug (optional)</label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              className="w-full border border-black px-4 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-black"
              placeholder="auto-generated"
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
