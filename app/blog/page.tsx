import Link from "next/link";
import { getBlogPosts } from "@/lib/blog";

export default function Blog() {
  const posts = getBlogPosts();
  
  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <h1 className="text-4xl font-semibold mb-12">Blog</h1>
      
      <div className="space-y-8 max-w-2xl">
        {posts.map((post) => (
          <article key={post.slug} className="border-b border-black pb-8 last:border-0">
            <Link href={`/blog/${post.slug}`} className="block hover:no-underline">
              <h2 className="text-2xl font-semibold mb-2">{post.title}</h2>
              <div className="text-sm text-black/70 mb-3">
                <time dateTime={post.date}>{post.date}</time>
                {post.readingTime && (
                  <span className="ml-4">{post.readingTime} min read</span>
                )}
              </div>
              {post.excerpt && (
                <p className="text-base leading-relaxed">{post.excerpt}</p>
              )}
            </Link>
          </article>
        ))}
      </div>
    </div>
  );
}
