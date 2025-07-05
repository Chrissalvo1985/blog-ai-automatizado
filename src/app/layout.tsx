import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "AutoBlog - AI-Powered Blog",
    template: "%s | AutoBlog",
  },
  description: "AI-Powered Automated Blog with fresh content daily. Discover trending topics, insights, and expert perspectives.",
  keywords: ["blog", "AI", "automation", "content", "technology", "insights"],
  authors: [{ name: "AutoBlog" }],
  creator: "AutoBlog",
  publisher: "AutoBlog",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.SITE_URL || "http://localhost:3000"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "AutoBlog - AI-Powered Blog",
    description: "AI-Powered Automated Blog with fresh content daily",
    url: "/",
    siteName: "AutoBlog",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "AutoBlog - AI-Powered Blog",
    description: "AI-Powered Automated Blog with fresh content daily",
    creator: "@autoblog",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 selection:bg-blue-100 dark:selection:bg-blue-900 selection:text-blue-900 dark:selection:text-blue-100`}>
        <div className="min-h-screen flex flex-col">
          {children}
        </div>
      </body>
    </html>
  );
}
