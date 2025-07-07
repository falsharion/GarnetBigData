import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Garnet Big Data",
  description: "Building tomorrow's Data-Driven organization today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className="bg-white"
      >
        {children}
      </body>
    </html>
  );
}
