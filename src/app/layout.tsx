import type { Metadata, Viewport } from "next";
import { Fraunces, Inter } from "next/font/google";
import { couple, dateLabel } from "@/data/wedding";
import "./globals.css";

/*
  Fraunces cho tiêu đề — serif retro, có trục SOFT/WONK để chữ mềm và hơi
  "lệch" đúng tinh thần playful, và quan trọng nhất là có bộ dấu tiếng Việt.
  (PP Editorial New trong /public/font không hỗ trợ tiếng Việt.)
*/
const fraunces = Fraunces({
  subsets: ["latin", "vietnamese"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const title = `${couple.groom} & ${couple.bride} — ${dateLabel.day}.${dateLabel.month}.${dateLabel.year}`;
const description = `Thiệp cưới của ${couple.groomFull} và ${couple.brideFull}. ${dateLabel.weekday}, ngày ${dateLabel.day}.${dateLabel.month}.${dateLabel.year}.`;

export const metadata: Metadata = {
  title,
  description,
  icons: {
    icon: "/components/40.png",
  },
  openGraph: { 
    title, 
    description, 
    type: "website", 
    locale: "vi_VN",
    images: [
      {
        url: "/couple/couple%201.png",
        width: 1200,
        height: 630,
        alt: "Groom & Bride",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/couple/couple%201.png"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f2e5",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className={`${fraunces.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
