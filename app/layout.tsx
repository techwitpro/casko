import type { Metadata } from "next";
import { Cormorant_Garamond, Manrope } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: "MORNI — All-Day Breakfast & Specialty Coffee | Canggu, Bali",
  description:
    "A breakfast room on the road to Batu Bolong. Breakfast from open to close, with specialty coffee roasted down the road. Canggu, Bali. Open daily 7:00 – 17:00.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico" },
    ],
    apple: [
      { url: "/icon.svg" },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${manrope.variable} h-full antialiased selection:bg-[#D4B879] selection:text-[#191E1B]`}
    >
      <body className="min-h-full flex flex-col bg-[#191E1B] text-[#F1EAD9]">
        {children}
      </body>
    </html>
  );
}
