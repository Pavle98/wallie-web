import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wallie - Vertical Wall Printing | Belgrade, Serbia",
  description: "Direct-to-wall vertical printing technology in Belgrade. Transform any surface with UV-curable ink. Up to 4m height. Waterproof. Eco-friendly.",
  icons: {
    icon: [
      { url: "/logo.svg", type: "image/svg+xml" },
      { url: "/logo.svg", sizes: "any", type: "image/svg+xml" },
    ],
    shortcut: "/logo.svg",
    apple: [
      { url: "/logo.svg", sizes: "180x180", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
