import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { ThemeProvider } from "@/components/ThemeProvider";
import { AppProvider } from "@/context/AppContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Interactive Web Application",
  description: `Next.js Interactive Web Application`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="th">
      <body className={inter.className}>
        <ThemeProvider>
          <AppProvider>
            <Navbar />
            <div className="container mx-auto px-4">{children}</div>
          </AppProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
