import React from "react"
import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter } from "next/font/google";

import "./globals.css";

const _playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
});
const _inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Café Raízes | Café Especial & História em Cada Grão",
  description:
    "Conectamos raízes de café desde as fazendas até sua xícara. Café especial com história, sustentabilidade e paixão. Conheça a origem de cada grão em São Paulo.",
  keywords: "café especial, café rastreado, café artesanal, espresso, cafeteria São Paulo, café sustentável",
  authors: [{ name: "Café Raízes" }],
  viewport: "width=device-width, initial-scale=1",
  openGraph: {
    title: "Café Raízes | Café Especial & História",
    description: "Conectamos raízes de café desde as fazendas até sua xícara. Café especial com história, sustentabilidade e paixão.",
    url: "https://caferaizes.com.br",
    siteName: "Café Raízes",
    type: "website",
    locale: "pt_BR",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Café Raízes - Café Especial com História",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Café Raízes | Café Especial & História",
    description: "O melhor café artesanal de São Paulo. Grãos selecionados, torração artesanal e baristas apaixonados.",
    images: ["/og-image.jpg"],
    creator: "@cafearoma",
  },
};

export const viewport: Viewport = {
  themeColor: "#faf8f5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
