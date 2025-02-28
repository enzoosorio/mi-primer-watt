import { Timeline } from "@/src/components/timeline/Timeline";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Timeline",
  description: "Timeline photo Gallery de Enzo - Work and Travel",
};
export default async function TimelinePage(props : {searchParams? : Promise<{date : string}>}) { 

    const searchParams = await props.searchParams
    const date = searchParams?.date

    return (
        <Timeline date={date}/>
    )
}