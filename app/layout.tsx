import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { cn } from "@/lib/utils";

const font = Open_Sans({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Discord@theBappy",
  description: "Trying clone of Discord",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={cn(font.className, 'bg-white dark:bg-[#313338] antialiased'
        )}>
          <ThemeProvider
          attribute='class'
          defaultTheme="dark"
          enableSystem={false}
          storageKey="discord-theme"
          >{children}</ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
