import { NextRequest, NextResponse } from "next/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { z } from "zod";

const RevalidateSchema = z.object({
  paths: z.array(z.string()).optional(),
  tags: z.array(z.string()).optional(),
});

export async function POST(request: NextRequest) {
  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.replace("Bearer ", "").trim();

  if (!token) {
    return NextResponse.json(
      { error: { code: "unauthorized", message: "Missing auth token" } },
      { status: 401 }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    body = {};
  }

  const parsed = RevalidateSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: { code: "validation_error", message: "Invalid body" } },
      { status: 400 }
    );
  }

  const { paths = [], tags = [] } = parsed.data;

  for (const path of paths) {
    revalidatePath(path);
  }

  for (const tag of tags) {
    revalidateTag(tag);
  }

  revalidateTag("content");

  return NextResponse.json({ revalidated: true, paths, tags });
}
