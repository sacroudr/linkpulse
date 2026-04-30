interface LinkRow {
  shortCode: string;
  originalUrl: string;
  clickCount: number;
  createdAt: Date | string;
  isActive: boolean;
}

export function exportLinksToCSV(links: LinkRow[], filename = "links.csv") {
  const headers = [
    "Short Code",
    "Original URL",
    "Clicks",
    "Created At",
    "Status",
  ];

  const rows = links.map((link) => [
    `/${link.shortCode}`,
    link.originalUrl,
    String(link.clickCount),
    new Date(link.createdAt).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }),
    link.isActive ? "Active" : "Inactive",
  ]);

  const csvContent = [headers, ...rows]
    .map((row) =>
      row
        .map((cell) => `"${String(cell).replace(/"/g, '""')}"`)
        .join(",")
    )
    .join("\n");

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}