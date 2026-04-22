import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "../../../../lib/auth";
import { createLink, getLinksByUserId } from "../../../../lib/queries";
import { generateShortCode } from "../../../../lib/nanoid";

const createLinkSchema = z.object({
  originalUrl: z
    .string()
    .url({ message: "Please enter a valid URL" })
    .refine(
      (url) => url.startsWith("http://") || url.startsWith("https://"),
      { message: "Only http and https URLs are allowed" }
    ),
});

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const userLinks = await getLinksByUserId(session.user.id);
    return NextResponse.json({ links: userLinks });
  } catch (error) {
    console.error("Failed to fetch links:", error);
    return NextResponse.json(
      { error: "Failed to fetch links" },
      { status: 500 }
    );
  }
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

  try {
    const link = await createLink({
      userId: session.user.id,
      originalUrl: parsed.data.originalUrl,
      shortCode,
    });

    return NextResponse.json({ link }, { status: 201 });
  } catch (error) {
    console.error("Failed to create link:", error);
    return NextResponse.json(
      { error: "Failed to create link" },
      { status: 500 }
    );
  }
}