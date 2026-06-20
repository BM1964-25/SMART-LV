import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SMART LV Generator",
  description: "Leistungsverzeichnis-Generator für KI-Softwareangebote"
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body>{children}</body>
    </html>
  );
}
