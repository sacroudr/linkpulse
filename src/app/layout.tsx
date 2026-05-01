import type { Metadata } from "next";
import { Inter, DM_Sans, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "../../lib/theme";
import { ToastProvider } from "../../components/ui/Toast";
import { Analytics } from "@vercel/analytics/next";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta",
});
const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export const metadata: Metadata = {
  title: "LinkPulse — Fast URL Shortener",
  description: "Shorten, track, and analyze your links with LinkPulse.",
  openGraph: {
    title: "LinkPulse — Fast URL Shortener",
    description: "Shorten, track, and analyze your links with LinkPulse.",
    type: "website",
  },
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} ${plusJakarta.variable} ${spaceGrotesk.variable}`}
    >
      <body className="antialiased">
        <a
          href="#main-content"
          className="fixed top-2 left-2 z-[9999] px-4 py-2 font-semibold rounded-md opacity-0 focus:opacity-100 transition-opacity"
          style={{
            backgroundColor: "var(--accent)",
            color: "#fff",
            fontSize: "var(--text-sm)",
          }}
        >
          Skip to main content
        </a>
        <ThemeProvider>
          <ToastProvider>{children}</ToastProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
