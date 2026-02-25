import { NextRequest, NextResponse } from "next/server";
import { getPost } from "@/lib/kv";

function isAuthenticated(request: NextRequest): boolean {
  const auth = request.cookies.get("admin-auth");
  return auth?.value === "authenticated";
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { slug } = await params;
    const post = await getPost(slug);

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(post);
  } catch (error) {
    console.error("Error loading post:", error);
    return NextResponse.json(
      { error: "Failed to load post" },
      { status: 500 }
    );
  }
}
