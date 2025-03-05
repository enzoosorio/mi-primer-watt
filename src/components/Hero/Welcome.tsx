"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import useIsVisible from "@/src/hooks/useIsVisible";
export const Welcome = () => {
  const [isMobile, setIsMobile] = useState(false);
  const VALORACION = 3;
  const titleRef = useRef(null);
  const textIsVisible = useIsVisible(titleRef); 
  
  
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 1024);
    
    checkMobile(); // Se ejecuta una vez al inicio
    window.addEventListener("resize", checkMobile);
  
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <section className="relative w-full mt-12 lg:mt-20  flex flex-col items-center justify-center gap-12 ">
      <div className="flex flex-col w-[95%] lg:w-max h-full  lg:flex-row items-center justify-start gap-12 lg:gap-24 mx-auto">
        <div className="flex flex-col justify-end text-white lg:text-black items-end gap-8 mt-6 lg:mt-0  ">
          <h1 
          ref={titleRef}
          className={`text-5xl lg:text-6xl font-bold text-center lg:text-right lg:mx-0 w-[14ch] mx-auto lg:w-[10ch] ${textIsVisible ? "opacity-100 lg:translate-x-0" : "opacity-10 lg:translate-x-full"} transition-all duration-300 tracking-tighter`}>
            Work and Travel en Montana
          </h1>
          <p className={`font-nunito text-lg tracking-tighter w-[35ch] lg:w-[40ch] mx-auto lg:mx-0 text-center lg:text-right ${textIsVisible ? "opacity-100 lg:translate-x-0" : "opacity-10 lg:translate-x-[200%]"} transition-all duration-500`}>
            Un invierno con frío extremo. Paisajes únicos y nuevos amigos de
            otros países{" "}
          </p>
          <div 
          className={`flex flex-col items-center justify-center gap-4  mx-auto lg:mx-0 ${textIsVisible ? "opacity-100 " : "opacity-10 "} transition-all duration-700`}>
            <p className="text-lg font-nunito">Valoración del viaje</p>
            <div className="flex flex-row items-center justify-center gap-4">
              {Array.from({ length: 5 }, (_, i) => i + 1).map((i, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center justify-center gap-2"
                >
                  {i <= VALORACION ? (
                    <Image
                      src={"/svgs/copo-de-nieve-con-gradiente.svg"}
                      alt="Copo de nieve"
                      width={48}
                      height={48}
                      className={"w-12 h-12"}
                    />
                  ) :  (
                   <>
                    <div className="hidden lg:block">
                      <Image
                      src={"/svgs/copo-de-nieve.svg"}
                      alt="Copo de nieve"
                      width={48}
                      height={48}
                      className={"w-12 h-12"}
                    />
                    </div>
                    <div className="block lg:hidden">
                    <Image
                    src={"/svgs/copo-de-nieve-white.svg"}
                    alt="Copo de nieve"
                    width={48}
                    height={48}
                    className={"w-12 h-12"}
                  />
                  </div>
                   </>
                  )}
                  <p className="text-sm font-bold">{i}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute top-0 -z-20 lg:relative min-w-[700px] lg:min-w-0 w-full max-w-[850px] lg:w-[650px] xl:w-[750px] aspect-video bg-black/80 blur-xs lg:blur-none">
          <video
            // className="bg-black"
            autoPlay
            muted
            playsInline
            loop
            preload="metadata"
          >
            <source src="https://miprimerwat.s3.sa-east-1.amazonaws.com/Video-Montana.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="absolute inset-0 bg-black/40 "> </div>
        </div>
        {/* <Image
          src="/images/minions-image.png"
          alt="Welcome"
          width={350}
          height={400}
          className={""}
        /> */}
      </div>
      <button
        onClick={() => {
          window.scroll({
            top: isMobile ? 1080 : 845,
            left: 0,
            behavior: "smooth",
          });
        }}
        className="absolute bg-yellow -bottom-24 w-max px-4 py-1 cursor-pointer rounded-full animationButtonBounce"
      >
        <Image
          src="/svgs/Chevron Down.svg"
          alt="ChevronDown"
          width={32}
          height={32}
          className=""
        />
      </button>
    </section>
  );
};
