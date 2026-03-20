import type { Metadata } from "next";
import { Suspense } from 'react'

import Header from "./components/header";
import BugSnagProvider from "./components/BugSnagProvider";
import "./globals.css";

import "./styles/style.css";

export const metadata: Metadata = {
  title: "Scouting Selection",
  description: "The 2026 scouting app for Summit robotics",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body
        className={`antialiased`}
      >
              <BugSnagProvider>\n        <Header />


        <Suspense fallback={<div className="mt-6 text-chaos flex place-content-center text-3xl font-bold">Loading...</div>}>
          {children}
        </Suspense>
      </BugSnagProvider>
      </body>
    </html>
  );
}
