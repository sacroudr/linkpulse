import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "../../../../lib/auth";
import { createLink, getLinksByUserId } from "../../../../lib/queries";
import { generateShortCode } from "../../../../lib/nanoid";

const createLinkSchema = z.object({
  originalUrl: z.string().url({ message: "Please enter a valid URL" }),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const userLinks = await getLinksByUserId(session.user.id);
  return NextResponse.json({ links: userLinks });
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = createLinkSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.errors[0].message },
      { status: 400 }
    );
  }

  const shortCode = generateShortCode();

  const link = await createLink({
    userId: session.user.id,
    originalUrl: parsed.data.originalUrl,
    shortCode,
  });

  return NextResponse.json({ link }, { status: 201 });
}