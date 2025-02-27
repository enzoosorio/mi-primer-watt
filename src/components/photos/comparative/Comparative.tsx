import { devices } from '@/src/utils/devices'
import Image from 'next/image'
import React from 'react'
export const Comparative = () => {
  return (
    <>
    <div className="mt-10 flex flex-col items-center justify-center w-[95%] rounded-lg bg-gray-100/55 gap-16 mx-auto mb-20 p-6 ">    
        <div className="flex flex-col items-center justify-center gap-6">
            <h1 className="text-6xl font-robto  ">Comparative Photos</h1>
            <p className="text-lg font-nunito">Estos son los dispositivos usados para las fotos</p>
        </div>
        <div className="flex flex-row items-center justify-center gap-24 ">
            {devices.map((device, index) => (
                <div
                key={index}
                data-tilt 
                className="anchor-card flex flex-col items-center justify-center gap-6 rounded-lg bg-white/75 p-4 shadow-lg hover:shadow-xl transition-all transform-3d perspective-[1000px] w-[200px] min-h-[260px]  pb-10">
                    <p className={` font-semibold font-nunito translate-z-[20px] text-center ${device.name === "Samsung S22 Ultra" ? "text-base" : "text-xl"}`}>{device.name}</p>
                    <Image src={device.image} alt={device.name} className=" rounded-lg px-2 object-contain translate-z-[70px]" width={350} height={400} />
                </div>
            ))}
        </div>
    </div>
    </>
  )
}
