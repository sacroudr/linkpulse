// import { NextRequest, NextResponse } from "next/server";
// import { getLinkByShortCode, logClick } from "../../../lib/queries";

// export async function GET(
//   req: NextRequest,
//   { params }: { params: Promise<{ code: string }> }
// ) {
//   const { code } = await params;

//   try {
//     const link = await getLinkByShortCode(code);

//     if (!link) {
//       return NextResponse.redirect(new URL("/", req.url));
//     }

//     await logClick({
//       linkId: link.id,
//       userAgent: req.headers.get("user-agent"),
//     });

//     return NextResponse.redirect(new URL(link.originalUrl));
//   } catch (error) {
//     console.error("Redirect error:", error);
//     return NextResponse.redirect(new URL("/", req.url));
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { getLinkByShortCode, logClick } from "../../../lib/queries";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ code: string }> }
) {
  const { code } = await params;

  try {
    const link = await getLinkByShortCode(code);

    if (!link) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Check if link is active
    if (!link.isActive) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Get IP from headers (Vercel sets x-forwarded-for)
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ??
      req.headers.get("x-real-ip") ??
      null;

    const referer = req.headers.get("referer");

    await logClick({
      linkId: link.id,
      userAgent: req.headers.get("user-agent"),
      ip,
      referer,
    });

    return NextResponse.redirect(new URL(link.originalUrl));
  } catch (error) {
    console.error("Redirect error:", error);
    return NextResponse.redirect(new URL("/", req.url));
  }
}