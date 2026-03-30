import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Simon Three Test",
  description: "Three.js practice routes with raw Three.js scenes",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
