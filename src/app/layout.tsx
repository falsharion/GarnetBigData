import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header"
import Footer from "./components/Footer"


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
        className="bg-white overflow-x-hidden"
      ><Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
