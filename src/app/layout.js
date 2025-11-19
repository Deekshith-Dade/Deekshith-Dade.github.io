import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: "Deekshith Dade",
  description: "Deekshith Dade's personal website",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased bg-[var(--night)] text-white`}>
        {children}
      </body>
    </html>
  );
}
