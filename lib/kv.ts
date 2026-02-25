import { getCloudflareContext } from "@opennextjs/cloudflare";

export interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  readingTime?: string;
  excerpt?: string;
  content: string;
}

async function getKV() {
  const { env } = await getCloudflareContext();
  return (env as any).BLOG_KV as KVNamespace;
}

const POST_PREFIX = "post:";
const INDEX_KEY = "posts:index";

export async function getAllPosts(): Promise<Omit<BlogPostData, "content">[]> {
  const kv = await getKV();
  const index = await kv.get<string[]>(INDEX_KEY, "json");
  if (!index || index.length === 0) return [];

  const posts = await Promise.all(
    index.map(async (slug) => {
      const post = await kv.get<BlogPostData>(`${POST_PREFIX}${slug}`, "json");
      if (!post) return null;
      const { content, ...metadata } = post;
      return metadata;
    })
  );

  return posts
    .filter((p): p is Omit<BlogPostData, "content"> => p !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getPost(slug: string): Promise<BlogPostData | null> {
  const kv = await getKV();
  return kv.get<BlogPostData>(`${POST_PREFIX}${slug}`, "json");
}

export async function savePost(post: BlogPostData): Promise<void> {
  const kv = await getKV();
  await kv.put(`${POST_PREFIX}${post.slug}`, JSON.stringify(post));

  // Update index
  const index = (await kv.get<string[]>(INDEX_KEY, "json")) || [];
  if (!index.includes(post.slug)) {
    index.push(post.slug);
    await kv.put(INDEX_KEY, JSON.stringify(index));
  }
}

export async function deletePost(slug: string): Promise<void> {
  const kv = await getKV();
  await kv.delete(`${POST_PREFIX}${slug}`);

  // Update index
  const index = (await kv.get<string[]>(INDEX_KEY, "json")) || [];
  const updated = index.filter((s) => s !== slug);
  await kv.put(INDEX_KEY, JSON.stringify(updated));
}

export async function renamePost(
  oldSlug: string,
  newSlug: string,
  post: BlogPostData
): Promise<void> {
  const kv = await getKV();
  await kv.delete(`${POST_PREFIX}${oldSlug}`);
  await kv.put(`${POST_PREFIX}${newSlug}`, JSON.stringify(post));

  // Update index
  const index = (await kv.get<string[]>(INDEX_KEY, "json")) || [];
  const updated = index.filter((s) => s !== oldSlug);
  if (!updated.includes(newSlug)) {
    updated.push(newSlug);
  }
  await kv.put(INDEX_KEY, JSON.stringify(updated));
}
