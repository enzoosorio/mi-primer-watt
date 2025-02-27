import React from 'react'

export const Footer = () => {

  return (
<footer className="w-full mt-auto flex flex-row items-center justify-around gap-12 footerBgGradientDark min-h-[110px] p-3 ">
  <p className="font-nunito lg:text-2xl max-w-[70ch] text-white text-pretty">
    Este es un sitio web que me hace ilusión crear, con el objetivo de compartir mi experiencia y visualizar las fotos del viaje.
  </p>
  <a href="https://www.instagram.com/enzoosorioortiz/" className="font-nunito font-bold text-lg lg:text-2xl text-white hover:bg-white hover:text-[#138c97] transition-colors px-2 py-4 rounded-lg" >@enzoosorioortiz</a>
</footer>

  )
}
