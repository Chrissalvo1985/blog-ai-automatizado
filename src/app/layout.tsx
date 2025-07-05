import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Blog de Chris",
    template: "%s | Blog de Chris",
  },
  description: "Blog personal de Chris Salvo: tecnología, innovación y exploración digital.",
  keywords: ["blog", "AI", "automation", "content", "technology", "insights"],
  authors: [{ name: "Chris Salvo" }],
  creator: "Chris Salvo",
  publisher: "Chris Salvo",
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
    title: "Blog de Chris",
    description: "Blog personal de Chris Salvo: tecnología, innovación y exploración digital.",
    url: "/",
    siteName: "Blog de Chris",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog de Chris",
    description: "Blog personal de Chris Salvo: tecnología, innovación y exploración digital.",
    creator: "@chrissalvo1985",
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
