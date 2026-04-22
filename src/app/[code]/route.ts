import { NextRequest, NextResponse } from "next/server";
import { getLinkByShortCode, logClick } from "../../../lib/queries";
import { redirect } from "next/navigation";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  const link = await getLinkByShortCode(code);

  if (!link) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  await logClick({
    linkId: link.id,
    userAgent: req.headers.get("user-agent"),
  });

  redirect(link.originalUrl);
}