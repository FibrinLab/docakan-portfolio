import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
  const posts = getBlogPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = getBlogPost(params.slug);
  
  if (!post) {
    notFound();
  }
  
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <article>
        <header className="mb-12">
          <h1 className="text-4xl font-semibold mb-4">{post.title}</h1>
          <div className="text-sm text-black/70">
            <time dateTime={post.date}>{post.date}</time>
            {post.readingTime && (
              <span className="ml-4">{post.readingTime} min read</span>
            )}
          </div>
        </header>
        
        <div className="text-lg leading-relaxed space-y-6 prose prose-lg max-w-none">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-6">{children}</p>,
              h2: ({ children }) => <h2 className="text-2xl font-semibold mt-8 mb-4">{children}</h2>,
              h3: ({ children }) => <h3 className="text-xl font-semibold mt-6 mb-3">{children}</h3>,
              ul: ({ children }) => <ul className="list-none ml-4 space-y-2 mb-6">{children}</ul>,
              li: ({ children }) => <li className="before:content-['•'] before:mr-2">{children}</li>,
              a: ({ href, children }) => (
                <a href={href} className="underline decoration-1 underline-offset-2 hover:no-underline">
                  {children}
                </a>
              ),
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>
      </article>
    </div>
  );
}
