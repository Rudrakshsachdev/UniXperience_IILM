import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import FloatingChatBot from "@/components/ChatBot";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata = {
  title: "IILM Campus 360 — UniXperience",
  description:
    "Explore courses, events, faculty, and campus life at IILM University through the Campus 360 platform.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body suppressHydrationWarning>
        <Navbar />
        <main>{children}</main>
        <Footer />
        <FloatingChatBot />
      </body>
    </html>
  );
}
