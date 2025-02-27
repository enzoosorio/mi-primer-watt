
import { Suspense} from "react";
// import TimelineMock from "@/src/utils/timelineMock.json";

import { TimelineWrapperForBar } from "./TimelineWrapperForBar";
import { TimelineBarSkeleton } from "@/src/skeletons/TimelineBarSkeleton";
import { TimelineWrapperForContent } from "./TimelineWrapperForContent";
import { TimelineContentSkeleton } from "@/src/skeletons/TimelineContentSkeleton";


interface TimelineProps {
  date : string | undefined
}


export const Timeline = ({date} : TimelineProps) => {

  return (
      
    <div className="relative  flex flex-col lg:flex-row items-center justify-center gap-6 w-full min-h-[100dvh]  lg:min-h-[600px] mt-10">
      <Suspense fallback={<TimelineBarSkeleton/>}>
        <TimelineWrapperForBar/>
      </Suspense>
      <Suspense fallback={<TimelineContentSkeleton/>}>
      <TimelineWrapperForContent date={date}/>
      </Suspense>
    </div>
    
  );
};