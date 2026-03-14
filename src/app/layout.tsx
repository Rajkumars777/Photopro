import type { Metadata } from "next";
import { Outfit, Inter } from "next/font/google";
import "./globals.css";

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PhotoPro | Perfecting Student Photo Framing",
  description: "A high-precision AI photography pipeline for schools. Automate student roster matching, frame generation, and batch exports.",
  keywords: ["photography", "school photos", "AI automation", "student framing"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${inter.variable} dark`} id="main-html">
      <body className={`${outfit.className} w-full overflow-x-hidden antialiased`}>
        {children}
      </body>
    </html>
  );
}
