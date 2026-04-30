import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "../../../../../lib/auth";
import { getLinkById, deleteLinkById } from "../../../../../lib/queries";

const bulkDeleteSchema = z.object({
  ids: z.array(z.string().min(1)).min(1),
});

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = bulkDeleteSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  try {
    const results = await Promise.all(
      parsed.data.ids.map(async (id) => {
        const link = await getLinkById(id);

        // Skip links that don't exist or belong to another user
        if (!link || link.userId !== session.user.id) return null;

        await deleteLinkById(id);
        return id;
      })
    );

    const deleted = results.filter(Boolean).length;

    return NextResponse.json({ deleted });
  } catch (error) {
    console.error("Bulk delete error:", error);
    return NextResponse.json(
      { error: "Failed to delete links" },
      { status: 500 }
    );
  }
}