import { redirect, notFound } from "next/navigation";
import { after } from "next/server";
import { headers } from "next/headers";
import { getLinkByShortCode, logClick } from "../../../lib/queries";

export default async function ShortCodePage({
  params,
}: {
  params: Promise<{ code: string }>;
}) {
  const { code } = await params;
  const link = await getLinkByShortCode(code);

  if (!link) {
    notFound();
  }

  if (!link.isActive) {
    redirect("/link-inactive");
  }

  const headersList = await headers();
  const ip =
    headersList.get("x-forwarded-for")?.split(",")[0].trim() ??
    headersList.get("x-real-ip") ??
    null;

  after(() =>
    logClick({
      linkId: link.id,
      userAgent: headersList.get("user-agent"),
      ip,
      referer: headersList.get("referer"),
    })
  );

  redirect(link.originalUrl);
}
