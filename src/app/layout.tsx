import type { Metadata } from "next";
import { Poppins, Alex_Brush } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
});

const alexBrush = Alex_Brush({
  variable: "--font-alex-brush",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Discover Animal - Upload your cutest animal video",
  description: "Upload your cutest animal video and get paid when your clip goes viral!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${alexBrush.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
