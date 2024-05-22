import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "react-hot-toast";
import NavigationBar from "@/components/Navbar";
import { AuthProvider } from "@/context/auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "EU Data Tool",
  description: "CONFESS: Clean Energy Certification",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <Providers>
          <AuthProvider>
            <NavigationBar />
            {children}
          </AuthProvider>
        </Providers>
        <Toaster />
      </body>
    </html>
  );
}
