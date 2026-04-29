// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "../../../../../../lib/auth";
// import { getLinkById, getClicksByLinkId } from "../../../../../../lib/queries";

// function fillDateGaps(
//   grouped: Record<string, number>,
//   clicks: { clickedAt: Date }[]
// ): { date: string; count: number }[] {
//   if (clicks.length === 0) return [];

//   const dates = Object.keys(grouped).sort();
//   const start = new Date(dates[0]);
//   const end = new Date(dates[dates.length - 1]);
//   const result = [];

//   const current = new Date(start);
//   while (current <= end) {
//     const dateStr = current.toISOString().split("T")[0];
//     result.push({ date: dateStr, count: grouped[dateStr] ?? 0 });
//     current.setDate(current.getDate() + 1);
//   }

//   return result;
// }

// export async function GET(
//   _req: NextRequest,
//   { params }: { params: Promise<{ id: string }> }
// ) {
//   const session = await auth();
//   if (!session?.user?.id) {
//     return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const { id } = await params;

//   try {
//     const link = await getLinkById(id);

//     if (!link) {
//       return NextResponse.json({ error: "Link not found" }, { status: 404 });
//     }

//     if (link.userId !== session.user.id) {
//       return NextResponse.json({ error: "Forbidden" }, { status: 403 });
//     }

//     const clicks = await getClicksByLinkId(id);

//     const groupedByDay = clicks.reduce((acc, click) => {
//       const day = click.clickedAt.toISOString().split("T")[0];
//       acc[day] = (acc[day] || 0) + 1;
//       return acc;
//     }, {} as Record<string, number>);

//     const chartData = fillDateGaps(groupedByDay, clicks);

//     return NextResponse.json({
//       link,
//       totalClicks: clicks.length,
//       chartData,
//     });
//   } catch (error) {
//     console.error("Failed to fetch stats:", error);
//     return NextResponse.json(
//       { error: "Failed to fetch stats" },
//       { status: 500 }
//     );
//   }
// }

import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../../lib/auth";
import { getClicksByLinkId, getLinkById } from "../../../../../../lib/queries";
// import { auth } from "lib/auth";
// import { getLinkById, getClicksByLinkId } from "/lib/queries";

function fillDateGaps(
  grouped: Record<string, number>,
  clicks: { clickedAt: Date }[]
): { date: string; count: number }[] {
  if (clicks.length === 0) return [];

  const dates = Object.keys(grouped).sort();
  const start = new Date(dates[0]);
  const end = new Date(dates[dates.length - 1]);
  const result = [];

  const current = new Date(start);
  while (current <= end) {
    const dateStr = current.toISOString().split("T")[0];
    result.push({ date: dateStr, count: grouped[dateStr] ?? 0 });
    current.setDate(current.getDate() + 1);
  }

  return result;
}

function getTopEntries(
  items: (string | null)[],
  limit = 5
): { name: string; count: number }[] {
  const counts: Record<string, number> = {};

  for (const item of items) {
    if (!item) continue;
    counts[item] = (counts[item] || 0) + 1;
  }

  return Object.entries(counts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
}

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

    const groupedByDay = clicks.reduce((acc, click) => {
      const day = new Date(click.clickedAt).toISOString().split("T")[0];
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const chartData = fillDateGaps(groupedByDay, clicks);

    // Breakdown data
    const topCountries = getTopEntries(clicks.map((c) => c.country));
    const topCities = getTopEntries(clicks.map((c) => c.city));
    const topOs = getTopEntries(clicks.map((c) => c.os));
    const topReferers = getTopEntries(clicks.map((c) => c.referer));

    return NextResponse.json({
      link,
      totalClicks: clicks.length,
      chartData,
      breakdown: {
        countries: topCountries,
        cities: topCities,
        os: topOs,
        referers: topReferers,
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