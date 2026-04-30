import { NextRequest, NextResponse, after } from "next/server";
import { notFound } from "next/navigation";
import { getLinkByShortCode, logClick } from "../../../lib/queries";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  // DB lookup must be outside any try/catch so that notFound() propagates
  // correctly — calling notFound() inside catch would suppress the 404.
  const link = await getLinkByShortCode(code);

  if (!link || !link.isActive) {
    notFound();
  }

  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
    req.headers.get("x-real-ip") ??
    null;

  // Schedule click logging to run after the redirect response is sent.
  // Using after() prevents the geo-lookup latency from blocking the redirect.
  after(() =>
    logClick({
      linkId: link.id,
      userAgent: req.headers.get("user-agent"),
      ip,
      referer: req.headers.get("referer"),
    })
  );

  return NextResponse.redirect(new URL(link.originalUrl), { status: 302 });
}
