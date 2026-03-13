import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Alex Carter | Full Stack Developer",
  description: "Personal portfolio of Alex Carter, a passionate full stack developer building modern web experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="noise">{children}</body>
    </html>
  );
}
