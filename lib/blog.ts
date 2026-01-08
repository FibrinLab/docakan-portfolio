import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readingTime?: string;
  excerpt?: string;
  content: string;
}

function getPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) {
    return [];
  }
  return fs.readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
    .map((file) => file.replace(/\.(mdx|md)$/, ""));
}

export function getBlogPosts(): Omit<BlogPost, "content">[] {
  const slugs = getPostSlugs();
  const posts = slugs
    .map((slug) => {
      const post = getBlogPost(slug);
      if (!post) return null;
      const { content, ...metadata } = post;
      return metadata;
    })
    .filter((post): post is Omit<BlogPost, "content"> => post !== null);
  
  return posts.sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getBlogPost(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
    const altPath = path.join(postsDirectory, `${slug}.md`);
    
    let filePath: string;
    if (fs.existsSync(fullPath)) {
      filePath = fullPath;
    } else if (fs.existsSync(altPath)) {
      filePath = altPath;
    } else {
      return null;
    }
    
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContents);
    
    return {
      slug,
      title: data.title || slug,
      date: data.date || new Date().toISOString().split("T")[0],
      readingTime: data.readingTime,
      excerpt: data.excerpt,
      content,
    };
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error);
    return null;
  }
}
