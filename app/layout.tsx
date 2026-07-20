import type { Metadata } from "next";
import { Inter, Inter_Tight, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./devcore.css";
import "./devcore-deep.css";

const interTight = Inter_Tight({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-display",
});
const inter = Inter({ subsets: ["latin"], variable: "--font-body" });
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "DevClub — seu futuro, compilado",
  description:
    "Do zero ao contratado com formação, projetos, mentoria, IA e a maior comunidade de programação do Brasil.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className={`${interTight.variable} ${inter.variable} ${jetbrains.variable}`}>
        {children}
      </body>
    </html>
  );
}
