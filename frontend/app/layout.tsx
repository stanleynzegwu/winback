import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientProvider from "./Providers/ClientProvider";
import { Navbar, SmoothScrolling } from "./components";
import AuthProviders from "./Providers/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WinBack",
  description: "NGO for underpriviledged children",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* <Navbar /> */}
        <AuthProviders>
          <ClientProvider>
            <SmoothScrolling>{children}</SmoothScrolling>
          </ClientProvider>
        </AuthProviders>
      </body>
    </html>
  );
}
