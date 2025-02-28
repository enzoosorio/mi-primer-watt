import Image from "next/image"

export const PersonalExperience = () => {
  return (
    <section className="mt-10 flex flex-col items-center justify-center gap-10 rounded-lg w-full welcomeToMain ">
    <h1 className="text-5xl font-delicious-small-caps text-center ">Experiencia Personal</h1>
    <div className="flex flex-col-reverse xl:flex-row items-center justify-center gap-12 xl:gap-20 w-[95%] mx-auto mt-10">
        <p className="max-w-[70ch] text-pretty text-center xl:text-left xl:max-w-[50ch] font-roboto text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam rem 
            impedit similique eum. Iusto reiciendis vitae animi quia, sapiente perferendis 
            sunt non quo, vero numquam mollitia accusantium aliquam, totam ipsa repudiandae. 
            Dolorem iste nisi sunt eius magni, deleniti, necessitatibus delectus aliquid adipisci 
            sed, soluta molestiae odio. Excepturi saepe ex et.</p>
        <a href="#" className="text-lg font-semibold text-black hover:text-primary-blue transition-all ">
            <Image src="/images/Image-bg-youtube.png" alt="cover-image-youtube" width={800} height={540} />

        </a>
    </div>
</section>
  )
}
