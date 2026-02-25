'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = (await response.json()) as { success: boolean; error?: string };

      if (data.success) {
        router.push('/admin/posts');
      } else {
        setError(data.error || 'Invalid password');
      }
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto px-6 py-16">
      <h1 className="text-3xl font-semibold mb-8">Admin Login</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="password" className="block text-sm font-mono mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-black px-4 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-black"
            required
          />
        </div>
        
        {error && (
          <p className="text-sm text-red-600 font-mono">{error}</p>
        )}
        
        <button
          type="submit"
          disabled={loading}
          className="w-full border border-black px-4 py-2 font-mono hover:bg-black hover:text-white transition-all disabled:opacity-50"
        >
          {loading ? 'LOGGING IN...' : 'LOGIN'}
        </button>
      </form>
    </div>
  );
}
