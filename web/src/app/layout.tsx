import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import SmoothScrollProvider from "@/components/SmoothScrollProvider";

export const metadata: Metadata = {
  title: "Trojan Marketplace",
  description: "USC peer-to-peer task marketplace",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-white text-black">
        <SessionProvider>
          <SmoothScrollProvider>
            {children}
          </SmoothScrollProvider>
        </SessionProvider>
      </body>
    </html>
  );
}

