import Image from 'next/image'
import React from 'react'

export const DoesItWorth = () => {
  return (
    <section className="relative mt-10 flex flex-col items-center justify-start w-full rounded-lg gap-16 mx-auto p-6 min-h-[800px]">
        <div className="flex flex-col items-center justify-center gap-6 w-full">
            <h1 className="font-bold text-5xl font-roboto text-center">¿Vale la pena?</h1>
        <h3 className="text-gray-700 text-xl font-nunito text-center">De acuerdo a los feelings del momento, trataré de segmentar mis puntos de vista de acuerdo a ello.</h3>
        </div>
        <Image src="/images/does-it-worth/emoji-nerd.png" alt="Emoji Nerd" width={120} height={110} className={"absolute top-32 left-56 z-10"} />
        <div className="relative welcomeToMain flex flex-col items-center justify-center gap-6 w-full min-h-[600px] ">
            <p>aadwdwa</p>
            <p>aadwdwa</p>
            <p>aadwdwa</p>
            <p>aadwdwa</p>
            <p>aadwdwa</p>
        </div>
    </section>
  )
}
