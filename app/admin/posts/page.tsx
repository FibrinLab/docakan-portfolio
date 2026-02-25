'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

interface Post {
  slug: string;
  title: string;
  date: string;
  readingTime?: string;
  excerpt?: string;
}

export default function AdminPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const router = useRouter();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/admin/posts');
      if (response.status === 401) {
        router.push('/admin');
        return;
      }
      const data = (await response.json()) as { posts?: Post[]; error?: string };
      if (data.posts) {
        setPosts(data.posts);
      } else {
        setError(data.error || 'Failed to load posts');
      }
    } catch (error) {
      setError('Failed to load posts');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug: string) => {
    if (!confirm(`Delete post "${slug}"?`)) return;

    try {
      const response = await fetch(`/api/admin/posts?slug=${slug}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        fetchPosts();
      } else {
        alert('Failed to delete post');
      }
    } catch (error) {
      alert('Failed to delete post');
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="font-mono">Loading...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-semibold">Blog Posts</h1>
        <Link
          href="/admin/posts/new"
          className="border border-black px-4 py-2 font-mono text-sm hover:bg-black hover:text-white transition-all"
        >
          NEW POST
        </Link>
      </div>

      {error && (
        <p className="text-sm text-red-600 font-mono mb-4">{error}</p>
      )}

      <div className="space-y-0 border-t border-black">
        {posts.length === 0 ? (
          <p className="py-8 text-black/60 font-mono">No posts yet. Create your first post!</p>
        ) : (
          posts.map((post) => (
            <div
              key={post.slug}
              className="border-b border-black py-4 flex items-center justify-between"
            >
              <div className="flex-1">
                <Link
                  href={`/admin/posts/${post.slug}`}
                  className="text-xl font-semibold hover:underline block mb-1"
                >
                  {post.title}
                </Link>
                <div className="text-sm text-black/60 font-mono">
                  <span>{post.date}</span>
                  {post.readingTime && <span className="ml-4">{post.readingTime} min</span>}
                </div>
              </div>
              <div className="flex gap-2">
                <Link
                  href={`/admin/posts/${post.slug}`}
                  className="text-xs font-mono border border-black px-3 py-1 hover:bg-black hover:text-white transition-all"
                >
                  EDIT
                </Link>
                <button
                  onClick={() => handleDelete(post.slug)}
                  className="text-xs font-mono border border-black px-3 py-1 hover:bg-black hover:text-white transition-all"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
