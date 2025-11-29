import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: "AI Bey Business Portal",
  description: "Submit your business information to AI Bey",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}
