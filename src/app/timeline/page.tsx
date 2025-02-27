import { Timeline } from "@/src/components/timeline/Timeline";

export default async function TimelinePage(props : {searchParams? : Promise<{date : string}>}) { 

    const searchParams = await props.searchParams
    const date = searchParams?.date

    return (
        <Timeline date={date}/>
    )
}