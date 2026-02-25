'use client';

import { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

interface MarkdownEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function MarkdownEditor({ value, onChange, placeholder }: MarkdownEditorProps) {
  const [viewMode, setViewMode] = useState<'edit' | 'preview' | 'split'>('edit');
  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = (await response.json()) as any;
      if (data.success) {
        // Insert image markdown at cursor position
        const imageMarkdown = `![${file.name}](${data.url})\n\n`;
        const textarea = document.querySelector('textarea') as HTMLTextAreaElement;
        if (textarea) {
          const start = textarea.selectionStart;
          const end = textarea.selectionEnd;
          const newValue = value.substring(0, start) + imageMarkdown + value.substring(end);
          onChange(newValue);
          
          // Reset cursor position
          setTimeout(() => {
            textarea.focus();
            textarea.setSelectionRange(start + imageMarkdown.length, start + imageMarkdown.length);
          }, 0);
        }
      } else {
        alert(`Upload failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
      // Reset input
      e.target.value = '';
    }
  };

  return (
    <div className="border border-black">
      {/* Toolbar */}
      <div className="border-b border-black flex items-center justify-between p-2 bg-black/5">
        <div className="flex gap-2 text-xs font-mono">
          <button
            onClick={() => setViewMode('edit')}
            className={`px-3 py-1 border border-black transition-all ${
              viewMode === 'edit' ? 'bg-black text-white' : 'hover:bg-black/5'
            }`}
          >
            EDIT
          </button>
          <button
            onClick={() => setViewMode('preview')}
            className={`px-3 py-1 border border-black transition-all ${
              viewMode === 'preview' ? 'bg-black text-white' : 'hover:bg-black/5'
            }`}
          >
            PREVIEW
          </button>
          <button
            onClick={() => setViewMode('split')}
            className={`px-3 py-1 border border-black transition-all ${
              viewMode === 'split' ? 'bg-black text-white' : 'hover:bg-black/5'
            }`}
          >
            SPLIT
          </button>
        </div>
        <label className="text-xs font-mono border border-black px-3 py-1 cursor-pointer hover:bg-black/5">
          {uploading ? 'UPLOADING...' : 'UPLOAD IMAGE'}
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
            disabled={uploading}
          />
        </label>
      </div>

      {/* Editor/Preview */}
      <div className="flex" style={{ minHeight: '500px' }}>
        {(viewMode === 'edit' || viewMode === 'split') && (
          <div className={viewMode === 'split' ? 'w-1/2 border-r border-black' : 'w-full'}>
            <textarea
              value={value}
              onChange={(e) => onChange(e.target.value)}
              placeholder={placeholder || 'Start writing...'}
              className="w-full h-full p-4 font-mono text-sm resize-none focus:outline-none bg-white"
              style={{ minHeight: '500px' }}
            />
          </div>
        )}
        {(viewMode === 'preview' || viewMode === 'split') && (
          <div className={viewMode === 'split' ? 'w-1/2' : 'w-full'}>
            <div className="p-4 overflow-y-auto" style={{ minHeight: '500px', maxHeight: '80vh' }}>
              <ReactMarkdown
                components={{
                  code({ node, inline, className, children, ...props }: any) {
                    const match = /language-(\w+)/.exec(className || '');
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        className="rounded-none border border-black/20 my-2 !bg-black/95"
                        customStyle={{
                          background: '#000',
                          border: '1px solid rgba(0,0,0,0.2)',
                        }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code className="bg-black/10 px-1 py-0.5 font-mono text-sm" {...props}>
                        {children}
                      </code>
                    );
                  },
                  img: ({ src, alt }) => (
                    <img
                      src={src}
                      alt={alt}
                      className="max-w-full h-auto my-4 border border-black/20"
                    />
                  ),
                  p: ({ children }) => <p className="mb-4 leading-relaxed">{children}</p>,
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-semibold mt-4 mb-2">{children}</h3>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-none ml-4 space-y-1 mb-4">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="before:content-['•'] before:mr-2">{children}</li>
                  ),
                  a: ({ href, children }) => (
                    <a
                      href={href}
                      className="underline decoration-1 underline-offset-2 hover:no-underline"
                    >
                      {children}
                    </a>
                  ),
                }}
              >
                {value}
              </ReactMarkdown>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
