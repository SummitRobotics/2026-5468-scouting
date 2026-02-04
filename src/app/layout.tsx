import type { Metadata } from "next";
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
        <link href="https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300..900;1,300..900&display=swap" rel="stylesheet" as="style" />
      </head>
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
