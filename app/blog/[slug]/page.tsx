import { notFound } from "next/navigation";
import { getBlogPost, getBlogPosts } from "@/lib/blog";
import ReactMarkdown from "react-markdown";

export const dynamic = "force-dynamic";

export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = await getBlogPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 md:py-16">
      <article>
        <header className="mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold mb-3 sm:mb-4">{post.title}</h1>
          <div className="text-sm text-black/70">
            <time dateTime={post.date}>{post.date}</time>
            {post.readingTime && (
              <span className="ml-4">{post.readingTime} min read</span>
            )}
          </div>
        </header>

        <div className="text-base sm:text-lg leading-relaxed space-y-4 sm:space-y-6 prose prose-lg max-w-none">
          <ReactMarkdown
            components={{
              p: ({ children }) => <p className="mb-4 sm:mb-6">{children}</p>,
              h2: ({ children }) => <h2 className="text-xl sm:text-2xl font-semibold mt-6 sm:mt-8 mb-3 sm:mb-4">{children}</h2>,
              h3: ({ children }) => <h3 className="text-lg sm:text-xl font-semibold mt-4 sm:mt-6 mb-2 sm:mb-3">{children}</h3>,
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
