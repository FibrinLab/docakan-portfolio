import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getAllPosts as getKVPosts, getPost as getKVPost } from "./kv";

const postsDirectory = path.join(process.cwd(), "content/blog");

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  readingTime?: string;
  excerpt?: string;
  content: string;
}

// Read posts from local markdown files (baked in at build time)
function getFilePosts(): BlogPost[] {
  try {
    if (!fs.existsSync(postsDirectory)) return [];
    return fs
      .readdirSync(postsDirectory)
      .filter((file) => file.endsWith(".mdx") || file.endsWith(".md"))
      .map((file) => {
        const slug = file.replace(/\.(mdx|md)$/, "");
        const fileContents = fs.readFileSync(
          path.join(postsDirectory, file),
          "utf8"
        );
        const { data, content } = matter(fileContents);
        return {
          slug,
          title: data.title || slug,
          date: data.date || new Date().toISOString().split("T")[0],
          readingTime: data.readingTime,
          excerpt: data.excerpt,
          content,
        };
      });
  } catch {
    return [];
  }
}

function getFilePost(slug: string): BlogPost | null {
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
  } catch {
    return null;
  }
}

// Merge file-based posts with KV posts (KV takes priority for same slug)
export async function getBlogPosts(): Promise<Omit<BlogPost, "content">[]> {
  const filePosts = getFilePosts();
  let kvPosts: Omit<BlogPost, "content">[] = [];

  try {
    kvPosts = await getKVPosts();
  } catch {
    // KV not available (e.g. during build), use file posts only
  }

  // Merge: KV posts override file posts with same slug
  const postMap = new Map<string, Omit<BlogPost, "content">>();

  for (const post of filePosts) {
    const { content, ...metadata } = post;
    postMap.set(post.slug, metadata);
  }

  for (const post of kvPosts) {
    postMap.set(post.slug, post);
  }

  return Array.from(postMap.values()).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogPost(slug: string): Promise<BlogPost | null> {
  // Try KV first
  try {
    const kvPost = await getKVPost(slug);
    if (kvPost) return kvPost;
  } catch {
    // KV not available
  }

  // Fall back to file
  return getFilePost(slug);
}
