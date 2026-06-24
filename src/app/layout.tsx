import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SMART OfferFlow",
  description: "Vom Angebot bis zur Abrechnung. KI-gestützt, strukturiert, prüffähig."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
