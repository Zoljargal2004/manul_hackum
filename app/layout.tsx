import type React from "react";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { Navigation } from "@/components/navigation";

const _geist = Geist({ subsets: ["cyrillic"] });
const _geistMono = Geist_Mono({ subsets: ["cyrillic"] });

export const metadata: Metadata = {
  title: "Мануул",
  description: "Төв Азийн зэрлэг муур",
  icons: {
    icon: {
      url: "/hackum-symbol.png"
    }
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`font-sans antialiased`}>
        <Navigation />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
