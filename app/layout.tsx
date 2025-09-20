import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Adhan — Prayer Times",
  description: "Clean Next.js Adhan app with countdown and settings.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-slate-50 text-slate-900 min-h-dvh">{children}</body>
    </html>
  );
}
