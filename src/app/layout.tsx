import NextUiProvider from "./NextUiProvider"
import type { Metadata } from "next"
import "./globals.css"
import { SessionProvider } from "next-auth/react"
import { auth } from "@/auth"
import Navbar from "@/components/navbar/Navbar"
import { Raleway } from "next/font/google"
import { Toaster } from "react-hot-toast"

const raleway = Raleway({ subsets: ['latin'] })


export const metadata: Metadata = {
  title: "Blogsnap",
  description: "Share your blogs with blogsnap"
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth()
  return (
    <SessionProvider session={session}>
      <html lang="en">
        <body className={`${raleway.className} text-gray-800`}>
          <NextUiProvider>
            <Navbar />
            {children}
          </NextUiProvider>
          <Toaster position="bottom-right" toastOptions={{
            style: {
              background: "#1f2937",
              color: "white",
              padding: "15px 50px"
            },
          }} />
        </body>
      </html>
    </SessionProvider>
  );
}
