/**
 * Counts occurrences of each non-null item and returns the top `limit` entries
 * sorted by descending count. Used for countries, cities, OS, and referer breakdowns.
 */
export function getTopEntries(
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

/**
 * Groups raw click records by calendar day and fills every day between the first
 * and last click with a zero-count entry, producing a contiguous series for charts.
 */
export function buildChartData(
  clicks: { clickedAt: Date }[]
): { date: string; count: number }[] {
  if (clicks.length === 0) return [];

  const grouped = clicks.reduce(
    (acc, click) => {
      const day = new Date(click.clickedAt).toISOString().split("T")[0];
      acc[day] = (acc[day] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  const dates = Object.keys(grouped).sort();
  const start = new Date(dates[0]);
  const end = new Date(dates[dates.length - 1]);
  const result: { date: string; count: number }[] = [];

  const current = new Date(start);
  while (current <= end) {
    const dateStr = current.toISOString().split("T")[0];
    result.push({ date: dateStr, count: grouped[dateStr] ?? 0 });
    current.setDate(current.getDate() + 1);
  }

  return result;
}
