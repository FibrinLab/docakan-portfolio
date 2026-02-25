import { NextRequest, NextResponse } from "next/server";
import { getAllPosts, savePost, deletePost, renamePost, getPost } from "@/lib/kv";

function isAuthenticated(request: NextRequest): boolean {
  const auth = request.cookies.get("admin-auth");
  return auth?.value === "authenticated";
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export async function GET(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const posts = await getAllPosts();
    return NextResponse.json({ posts });
  } catch (error) {
    console.error("Error loading posts:", error);
    return NextResponse.json(
      { error: "Failed to load posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, content, date, readingTime, excerpt, slug: providedSlug } =
      (await request.json()) as any;

    if (!title || !content) {
      return NextResponse.json(
        { error: "Title and content are required" },
        { status: 400 }
      );
    }

    const slug = providedSlug || generateSlug(title);
    const postDate = date || new Date().toISOString().split("T")[0];

    await savePost({
      slug,
      title,
      date: postDate,
      readingTime: readingTime || undefined,
      excerpt: excerpt || undefined,
      content,
    });

    return NextResponse.json({ success: true, slug });
  } catch (error) {
    console.error("Error saving post:", error);
    return NextResponse.json(
      { error: "Failed to save post" },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug, title, content, date, readingTime, excerpt, newSlug } =
      (await request.json()) as any;

    if (!slug || !title || !content) {
      return NextResponse.json(
        { error: "Slug, title and content are required" },
        { status: 400 }
      );
    }

    const postDate = date || new Date().toISOString().split("T")[0];
    const finalSlug = newSlug || slug;

    const postData = {
      slug: finalSlug,
      title,
      date: postDate,
      readingTime: readingTime || undefined,
      excerpt: excerpt || undefined,
      content,
    };

    if (finalSlug !== slug) {
      await renamePost(slug, finalSlug, postData);
    } else {
      await savePost(postData);
    }

    return NextResponse.json({ success: true, slug: finalSlug });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get("slug");

    if (!slug) {
      return NextResponse.json(
        { error: "Slug is required" },
        { status: 400 }
      );
    }

    await deletePost(slug);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      { error: "Failed to delete post" },
      { status: 500 }
    );
  }
}
