import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ziggy — Your PhD sidekick",
  description: "A cheerful personal work OS for PhD applications."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
