'use server';

import localFont from "next/font/local";
import "./globals.css";
import { verifySession } from "@/session/session";
import Navbar from "@/components/NavBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await verifySession();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
          {session.userId !== undefined && <Navbar session={session} />}
          <div className="flex-grow pt-16 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
            {children}
          </div>
        </div>
      </body>
    </html >
  );
}
