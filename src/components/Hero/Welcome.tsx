"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
export const Welcome = () => {
  const [isMobile, setIsMobile] = useState(false);
  const VALORACION = 3;

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
  }, []);

  return (
    <section className="relative w-full mt-12  flex flex-col items-center justify-center gap-12 ">
      <div className="flex flex-col w-[95%] lg:w-max h-full  lg:flex-row items-center justify-end gap-12 lg:gap-24 mx-auto">
        <div className="flex flex-col justify-end items-end gap-8  ">
          <h1 className="text-5xl lg:text-6xl font-bold text-center lg:text-right lg:mx-0 w-[14ch] mx-auto lg:w-[10ch]  tracking-tighter">
            Work and Travel en Montana
          </h1>
          <p className="font-nunito text-lg tracking-tighter w-[35ch] lg:w-[40ch] mx-auto lg:mx-0 text-center lg:text-right">
            Un invierno con frío extremo. Paisajes únicos y nuevos amigos de
            otros países{" "}
          </p>
          <div className="flex flex-col items-center justify-center gap-4  mx-auto lg:mx-0">
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
                  ) : (
                    <Image
                      src={"/svgs/copo-de-nieve.svg"}
                      alt="Copo de nieve"
                      width={48}
                      height={48}
                      className={"w-12 h-12"}
                    />
                  )}
                  <p className="text-sm font-bold">{i}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Image
          src="/images/minions-image.png"
          alt="Welcome"
          width={350}
          height={400}
          className={""}
        />
      </div>
      <button 
      onClick={() => {
        window.scroll({
            top: isMobile ? 1080 : 845,
            left: 0,
            behavior: 'smooth'
          })
      }}
      className="absolute bg-yellow -bottom-24 w-max px-4 py-1 cursor-pointer rounded-full animationButtonBounce">
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
