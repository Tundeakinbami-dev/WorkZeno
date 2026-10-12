import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = (await request.json().catch(() => null)) as {
    title?: unknown;
    description?: unknown;
  } | null;
  if (
    !body ||
    typeof body.title !== "string" ||
    body.title.trim().length < 3 ||
    typeof body.description !== "string" ||
    body.description.trim().length < 20
  ) {
    return NextResponse.json(
      { error: "A title and description are required." },
      { status: 400 },
    );
  }
  return NextResponse.json(
    { id: crypto.randomUUID(), status: "DRAFT" },
    { status: 201 },
  );
}
