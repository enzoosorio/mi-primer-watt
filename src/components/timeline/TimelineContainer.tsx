"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
// import TimelineMock from "@/src/utils/timelineMock.json";
import { IAlbumWithId } from "@/src/lib/timeline/getAllDatesTimeline";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import toast from "react-hot-toast";

interface TimelineContainerProps {
  className?: string;
  currentDate: string;
  datesTimeline: IAlbumWithId[];
}



export const TimelineContainer = ({
  className,
  currentDate,
  datesTimeline,
}: TimelineContainerProps) => {
  const containerTimelineRef = useRef<HTMLDivElement>(null);
  const buttonSliderRef = useRef<HTMLDivElement>(null);
  const containerDatesTimelineRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(true);
  const [timelineBarHeight, setTimelineBarHeight] = useState(100);
  const [translateY, setTranslateY] = useState(0)
  const [timelineMobileOpen, setTimelineMobileOpen] = useState(false);
  const searchParams = useSearchParams();

  const pathname = usePathname();
  const { replace } = useRouter();

  const settingSearchParams = useCallback((term: string) => { 
    const params = new URLSearchParams(searchParams);
    if (term) {
      params.set("date", term);
    } else {
      params.delete("date");
    }
    replace(`${pathname}?${params.toString()}`);
  }, [searchParams, pathname, replace]);

  const handleButtonDate = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>, term: string) => {
    try {
        settingSearchParams(term)
  
      if (containerTimelineRef.current && buttonSliderRef.current) {
        const button = e.currentTarget;
        const container = containerTimelineRef.current;
  
        const buttonRect = button.getBoundingClientRect();
        const containerRect = container.getBoundingClientRect();
        const buttonOffsetTop = buttonRect.top - containerRect.top + container.scrollTop;
        const sliderTop = (buttonOffsetTop + button.offsetHeight / 2 - buttonSliderRef.current.offsetHeight / 2) - 24;
  
        buttonSliderRef.current.style.transform = `translateY(${sliderTop}px)`;
        setTranslateY(sliderTop)
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const initTimelineBar = () => {
      setTimeout(() => {
      if (containerDatesTimelineRef.current && containerTimelineRef.current && buttonSliderRef.current) {
        const datesContainerRect = containerDatesTimelineRef.current.getBoundingClientRect();
        const datesContainerScrollHeight = containerDatesTimelineRef.current.scrollHeight;
        
        const datesContentHeight = datesContainerRect.height;
        
        if(datesContainerScrollHeight > datesContentHeight){
          setTimelineBarHeight(datesContainerScrollHeight)
        }
        else {  
          setTimelineBarHeight(datesContentHeight)
        }


      }else{
        toast.error("Error al cargar contenido")
      }
    }, 500);
    }
   
    initTimelineBar()

  }, []);

  useEffect(() => {

    const params = new URLSearchParams(searchParams);
    const date = params.get("date")
    
    setTimeout(() => {
      if(currentDate && !date){
        settingSearchParams(currentDate)
      }else if (date && containerTimelineRef.current && buttonSliderRef.current) {
          const buttons = Array.from(document.querySelectorAll("[data-date]")) as HTMLButtonElement[];
        const buttonPicked = buttons.find((button) => button.getAttribute("data-date") === date);
        console.log({buttonPicked})
        
          if (buttonPicked && containerTimelineRef.current && buttonSliderRef.current) {
            console.log("esta pasandooo")
            const container = containerTimelineRef.current;
            const buttonRect = buttonPicked.getBoundingClientRect();
            const containerRect = container.getBoundingClientRect(); 
            const buttonOffsetTop = buttonRect.top - containerRect.top + container.scrollTop;
            const sliderTop = (buttonOffsetTop + buttonPicked.offsetHeight / 2 - buttonSliderRef.current.offsetHeight / 2) - 24;
  
            buttonSliderRef.current.style.transform = `translateY(${sliderTop}px)`;
            setTranslateY(sliderTop);
        }  
      }
    }, 500);
  }, [searchParams, timelineMobileOpen, settingSearchParams, currentDate])

  
  
  useEffect(() => {
    function handleResizeComponent() {
      setIsMobile(window.innerWidth < 1024);
    }
    window.addEventListener("resize", handleResizeComponent);
    
    handleResizeComponent()
    return () => window.removeEventListener("resize", handleResizeComponent);
  }, []);

  
  return (
    <>
      <button
        onClick={() => setTimelineMobileOpen(true)}
        className="block lg:hidden bg-yellow rounded-xl px-4 py-2 text-black font-delicious-small-caps w-max cursor-pointer hover:bg-rose transition-colors text-xl"
      >
        Linea de tiempo
      </button>
      {datesTimeline.length > 0 && isMobile === false ? (
        <div
          ref={containerTimelineRef}
          className={twMerge(
            `scrollNone flex shadow-lg relative flex-col items-start justify-start gap-6 w-[30%] min-h-[700px] rounded-xl overflow-y-scroll`,
            className
          )}
        >
          <div
            style={{ height: `${timelineBarHeight - 64}px` }}
            className="absolute top-3 left-1/2 my-6 -translate-x-1/2 w-3 bg-gray rounded-lg transition-all duration-500 "
          ></div>
          <div 
          ref={containerDatesTimelineRef }
          className="containerTimeline py-6 px-1 absolute left-0 flex flex-col items-center justify-start gap-20 w-full">
            {datesTimeline.map((item, index) => (
              <div
                className="dateBoxes relative flex flex-row items-center odd:justify-start justify-end w-full gap-6 font-nunito h-[2rem] bg-amber-100/20 rounded-xl p-2 group"
                key={index}
              >
                <p className="font-nunito group-hover:font-bold transition-all">
                  {item.date.toString().split("T")[0]}
                </p>
                <button
                  data-date={item.date.toString().split("T")[0]}
                  onClick={(e) => handleButtonDate(e, item.date.toString().split("T")[0])}
                  className={`absolute left-1/2 cursor-pointer -translate-x-1/2 top-0 ${
                    currentDate === item.date.toString().split("T")[0]
                  } border border-gray rounded-full w-8 h-8 font-nunito font-bold hover:bg-gray-500 transition-all duration-500`}
                ></button>
              </div>
            ))}
            <div
              ref={buttonSliderRef}
              style={{transform: `translateY(${translateY}px)`}}
              className="buttonSlider transition-all ease-out duration-500 flex w-8 h-8 rounded-full bg-gray-600 absolute top-6 left-1/2 -translate-x-1/2"
            ></div>
          </div>
        </div>
      ) : 
      datesTimeline.length > 0 &&
        isMobile === true ? (
        <div className={`absolute inset-0 z-50 ${timelineMobileOpen ? "left-0" : "left-[200%]"} bg-white top-0 left-0 flex flex-col items-center justify-center gap-6 `}>
          <button
            onClick={() => setTimelineMobileOpen(false)}
            className="text-xl bg-amber-200 rounded-xl w-max mx-auto cursor-pointer hover:bg-rose transition-colors px-4 py-2 hover:text-white"
          >
            X
          </button>
          <div
            ref={containerTimelineRef}
            className={twMerge(
              `scrollNone flex shadow-lg relative flex-col items-start justify-start gap-6 w-[45%] min-h-[700px] rounded-xl overflow-y-scroll`,
              className
            )}
          >
            <div
            // -48 o -72
              style={{ height: `${timelineBarHeight - 64}px` }}
              className="absolute top-10 left-1/2 -translate-x-1/2 w-3 bg-gray rounded-lg transition-all duration-500"
            ></div>
            <div 
            ref={containerDatesTimelineRef}
            className="containerTimeline  py-6 px-1 absolute left-0 flex flex-col items-center justify-start gap-20 w-full">
              {datesTimeline.map((item, index) => (
                <div
                  className="dateBoxes relative flex flex-row items-center odd:justify-start justify-end w-full gap-6 font-nunito h-[2rem] bg-amber-100/20 rounded-xl p-2 group"
                  key={index}
                >
                  <p className="font-nunito group-hover:font-bold transition-all">
                    {item.date.toString().split("T")[0]}
                  </p>
                  <button
                    data-date={item.date.toString().split("T")[0]}
                    onClick={(e) => handleButtonDate(e, item.date.toString().split("T")[0])}
                    className={`absolute left-1/2 cursor-pointer -translate-x-1/2 top-0 ${
                      currentDate === item.date.toString().split("T")[0] ? "" : ""
                    } border border-gray rounded-full w-8 h-8 font-nunito font-bold hover:bg-gray-500 transition-all duration-500`}
                    
                  ></button>
                </div>
              ))}
              <div
                ref={buttonSliderRef}
                style={{transform: `translateY(${translateY}px)`}}
                className="buttonSlider transition-all ease-out duration-500 flex w-8 h-8 rounded-full bg-gray-600 absolute top-6 left-1/2 -translate-x-1/2"
              ></div>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-6 w-full lg:w-[30%]">
          
        </div>
      )}
    </>
  );
};
