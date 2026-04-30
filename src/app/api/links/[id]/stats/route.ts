import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../../lib/auth";
import { getClicksByLinkId, getLinkById } from "../../../../../../lib/queries";
import { buildChartData, getTopEntries } from "../../../../../../lib/stats";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  try {
    const link = await getLinkById(id);

    if (!link) {
      return NextResponse.json({ error: "Link not found" }, { status: 404 });
    }

    if (link.userId !== session.user.id) {
      return NextResponse.json({ error: "Forbidden" }, { status: 403 });
    }

    const clicks = await getClicksByLinkId(id);
    const chartData = buildChartData(clicks);

    return NextResponse.json({
      link,
      totalClicks: clicks.length,
      chartData,
      breakdown: {
        countries: getTopEntries(clicks.map((c) => c.country)),
        cities: getTopEntries(clicks.map((c) => c.city)),
        os: getTopEntries(clicks.map((c) => c.os)),
        referers: getTopEntries(clicks.map((c) => c.referer)),
      },
    });
  } catch (error) {
    console.error("Failed to fetch stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch stats" },
      { status: 500 }
    );
  }
}
