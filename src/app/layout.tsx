import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeProvider from "@/provider/ThemeProvider";
import TopLoaderProvider from "@/provider/TopLoaderProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Taskifier",
  description: "Manage your tasks at ease.",
  icons : {
    icon : { url : "/icon.svg"}
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning lang="en">
      <body className={inter.className}>
        <ThemeProvider attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange>
          <TopLoaderProvider>
              {children}
          </TopLoaderProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
