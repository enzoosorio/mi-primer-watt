import { Welcome } from "@/src/components/Hero/Welcome";
import { HorizontalSlider } from "@/src/components/Hero/HorizontalSlider";
import { StickyNotesMain } from "@/src/components/Hero/StickyNotes";
import { PersonalExperience } from "../components/Hero/PersonalExperience";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Inicio",
  description: "Esta es la página de inicio de mi blog de Work and Travel. Aquí encontrarás las experiencias, algunas notas e imágenes de manera resumida. Te doy bienvenida a que puedas visualizar más contenido en las diferentes páginas de mi blog.",
};
export default function Home() {
  return (
    <main className="w-[95%] mx-auto">
    <Welcome/>
    <HorizontalSlider/>
    <StickyNotesMain/> 
    <PersonalExperience/>
    </main>
  );
}
