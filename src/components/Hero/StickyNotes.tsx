"use client"
import { stickyNotes } from '@/src/utils/infoStickyNotes'
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion'
import { AnimatePresence } from 'framer-motion';

export const StickyNotesMain = () => {
  const [divClicked, setDivClicked] = useState<number | null>(null);
  const [position, setPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showDialogItems, setShowDialogItems] = useState(false);

  const handleClickOpenPopup = (index: number, event: React.MouseEvent<HTMLDivElement>) => {
          const rect = event.currentTarget.getBoundingClientRect();
  
          // Calcular el centro del viewport
          const centerX = window.innerWidth / 2;
          const centerY = window.innerHeight / 2;
  
          // Calcular la traslación necesaria
          const translateX = centerX - (rect.x + rect.width / 2);
          const translateY = centerY - (rect.y + rect.height / 2);
  
          setPosition({ x: translateX, y: translateY });
          setDivClicked(index);
      };
  
  const handleExitDiv = () => {
          setDivClicked(null);
          setShowDialogItems(false);
  };
  
  const variantsPopup = {
          start: {
              x : 0,
              y : 0,
              scale: 1,
              opacity: 0,
          },
          active: {
              x : position.x,
              y : position.y,
              scaleX: 1.5,
              scaleY: 1.4,
              opacity: 1,
          },
          end: {
              x : 0,
              y : 0,
              scale: 1,
              opacity: 0,
          },
  };

  useEffect(() => {

    const delay = async () : Promise<void> => {
        await new Promise(resolve => setTimeout(resolve, 1800));
        setShowDialogItems(true);
    };

    delay();


  }, [divClicked]);

  return (
    <section
  className="relative w-full flex flex-col items-center justify-center  mb-40 mx-auto welcomeToMain"
>
  <h1 className="w-max mx-auto text-3xl lg:text-5xl font-delicious-small-caps">¡Dale click y conoce más!</h1>
  <div
    className="relative  max-w-[1228px] mx-auto flex flex-row flex-wrap items-center justify-center gap-12 my-20 w-full"
  >
   {stickyNotes.map((stickyNote) => (
                    <div key={stickyNote.id} className="relative ">
                        <div
                            onClick={(e) => handleClickOpenPopup(stickyNote.id, e)}
                            className={`relative w-[250px] h-[160px] md:w-[330px] md:h-[180px] rounded-lg p-4 shadow-lg ${stickyNote.bgColor} duration-300 ease-in-out flex items-center justify-center ${
                                divClicked === stickyNote.id ? "opacity-0" : "opacity-100"
                            }`}
                        >
                            <p className="text-3xl font-bold font-nunito">{stickyNote.title}</p>
                        </div>

                        {/* Motion.div separado para evitar ser ocultado */}
                        <AnimatePresence>
                            {divClicked === stickyNote.id && (
                                <motion.div
                                    // onClick={handleExitDiv}
                                    variants={variantsPopup}
                                    initial="start"
                                    animate="active"
                                    exit="end"
                                    transition={{ type: "spring" }}
                                    className={`absolute inset-0 w-full min-h-[320px] lg:min-h-auto md:w-[430px] md:h-[280px] z-10 rounded-lg p-4 shadow-lg ${stickyNote.bgColor} flex flex-col items-center justify-start gap-4`}
                                >
                                  {showDialogItems && (
                                    <motion.nav
                                    initial={{
                                      opacity: 0,
                                    }}
                                    animate={{
                                      opacity: 1,
                                      transition: {
                                        duration: 0.3,
                                        type: "spring",
                                      },
                                    }}
                                    exit={{
                                      opacity: 0,
                                    }}
                                    transition={{ type: "spring" }}
                                    className="flex flex-row font-delicious-small-caps items-center justify-between border-b border-gray-900 w-full pb-2"
                                    >
                                      <p className="text-sm lg:text-lg font-semibold">{stickyNote.titleForDialog}</p>
                                      <ul className="flex flex-row items-center justify-center gap-2 lg:gap-8 ">
                                        <li className='text-sm lg:text-lg'>
                                          {stickyNote.title}
                                        </li>
                                        <li>
                                          <button
                                          onClick={handleExitDiv}
                                          className="close-btn text-sm lg:text-base bg-white text-black px-3 lg:px-4 py-2 cursor-pointer outline-none hover:font-bold transition-all rounded-lg">Cerrar</button>
                                        </li>
                                      </ul>
                                    </motion.nav>
                                  )}

                                    <motion.p 
                                    layout
                                    className="text-2xl font-bold font-nunito ">
                                      {stickyNote.title}
                                    </motion.p>
                                    {showDialogItems && (
                                    <motion.p 
                                    initial={{
                                      opacity: 0,
                                    }}
                                    animate={{
                                      opacity: 1,
                                      transition: {
                                        duration: 0.3,
                                        type: "spring",
                                      },
                                    }}
                                    exit={{
                                      opacity: 0,
                                    }}
                                    transition={{ type: "spring" }}
                                    dangerouslySetInnerHTML={{__html: stickyNote.contentForDialog}}
                                    className='thight-scroll text-xs leading-relaxed w-full rounded-lg bg-white px-2 py-1 lg:py-3 text-pretty text-center overflow-y-auto'>
                                      
                                    </motion.p>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                    

                ))}
  </div>
  </section>
  )
}
