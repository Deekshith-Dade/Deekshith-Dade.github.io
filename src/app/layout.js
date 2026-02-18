import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["400", "500", "600"],
});

export const metadata = {
  title: { default: "Deekshith Dade", template: "%s | Deekshith Dade" },
  description:
    "ML engineer and researcher specialising in contrastive learning, computer vision, and agentic AI systems.",
  metadataBase: new URL("https://deekshith.me"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Deekshith Dade",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
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
