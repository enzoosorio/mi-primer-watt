import Image from "next/image";
import { Welcome } from "@/src/components/Hero/Welcome";
import { HorizontalSlider } from "@/src/components/Hero/HorizontalSlider";
import { StickyNotesMain } from "@/src/components/Hero/StickyNotes";
import { PersonalExperience } from "../components/Hero/PersonalExperience";

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
