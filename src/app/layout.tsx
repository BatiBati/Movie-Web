"use client";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { PropsWithChildren, Suspense, useEffect, useState } from "react";
import { Header } from "@/app/_components/Header";
import { Footer } from "@/app/_components/Footer";
import { IsDarkProvider } from "@/app/_components/Provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }: PropsWithChildren) {
  const [isDark, setIsDark] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    if (theme == "0") {
      setIsDark(false);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", isDark ? "1" : "0");
  }, [isDark]);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${isDark ? "dark" : ""
          }`}
      >
        <Suspense>
          <IsDarkProvider
            isDark={isDark}
            setIsDark={setIsDark}
            loading={loading}
            setLoading={setLoading}
          >
            <Header href={"/"} />
            <div style={{ minHeight: "calc(100vh - 339px)" }}>{children}</div>
            <div className="w-full flex justify-center">
              <Footer />
            </div>
          </IsDarkProvider>
        </Suspense>
      </body>
    </html>
  );
}
