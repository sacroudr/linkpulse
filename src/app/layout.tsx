// import { Inter, JetBrains_Mono } from "next/font/google";
// import "./globals.css";

// const inter = Inter({
//   subsets: ["latin"],
//   variable: "--font-inter",
// });

// const jetbrainsMono = JetBrains_Mono({
//   subsets: ["latin"],
//   variable: "--font-mono",
// });

// export const metadata = {
//   title: "LinkPulse",
//   description: "Simple, fast URL shortener",
// };

// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode;
// }) {
//   return (
//     <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
//       <body className="bg-[#09090b] text-white antialiased font-sans">
//         {children}
//       </body>
//     </html>
//   );
// }

import { Inter, DM_Sans, Plus_Jakarta_Sans, Space_Grotesk } from "next/font/google";
// import { ThemeProvider } from "@/lib/theme";
import "./globals.css";
import { ThemeProvider } from "../../lib/theme";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm-sans" });
const plusJakarta = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-plus-jakarta" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk" });

export const metadata = {
  title: "Shorly",
  description: "Simple, fast URL shortener",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${dmSans.variable} ${plusJakarta.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-[#09090b] text-white antialiased">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}