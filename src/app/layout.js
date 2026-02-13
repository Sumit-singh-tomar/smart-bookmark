import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Providers } from "@/redux/Providers";
import GetUser from "@/components/GetUser";
import { Toaster } from "react-hot-toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Smart Bookmark",
  description: "Smart Bookmark",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Script
          src="https://accounts.google.com/gsi/client"
          strategy="afterInteractive"
        />
        <Providers>
          <GetUser />
          <Toaster
            position="top-right"
            toastOptions={{
              success: {
                style: {
                  background: "#4BB543",
                  color: "#fff",
                },
              },
              error: {
                style: {
                  background: "#EF4444",
                  color: "#fff",
                },
              },
            }}
          />
          {children}
        </Providers>
      </body>
    </html>
  );
}