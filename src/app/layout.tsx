import type { Metadata } from "next";
import localFont from "next/font/local";
import {Nunito} from "next/font/google";
import "./globals.css";
import { Header } from "@/src/components/Layout/Header";
import { Footer } from "@/src/components/Layout/Footer";
import { Toaster } from "react-hot-toast";

const deliciousSmallCaps = localFont({
  src: [
    {
      path: "../../public/fonts/Delicious-SmallCaps.otf",
      weight: "400",
    },
  ],
  variable: "--font-delicious-small-caps",
});

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-nunito",
});

export const metadata: Metadata = {
  title:  {
    default: "Work and Travel de Enzo",
    template: "%s - Work and Travel de Enzo",
  },
  description: "Alguna vez has participado en el programa Work and Travel? Bien, pues este es mi primer Work and Travel. Este es un blog donde comparto mis experiencias y aprendizajes, además, intento ayudarte contestando tus preguntas y compartiendo las mejores imágenes que he tomado durante el viaje.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`relative h-[100%] ${deliciousSmallCaps.variable} ${nunito.variable} antialiased flex flex-col`}
      >
        <Header/>
        <Toaster />
        <div className="mt-12"></div>
        {children}
        <div className="py-10"></div>
        <Footer/>
      </body>
    </html>
  );
}
