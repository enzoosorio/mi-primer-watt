import { stickyNotes } from '@/src/utils/infoStickyNotes'
import { StickyNote } from './StickyNote'

export const StickyNotesMain = () => {
  return (
    <section
  className="relative w-full flex flex-col items-center justify-center mt-10 mb-40 mx-auto welcomeToMain"
>
  <h1 className="w-max mx-auto text-3xl lg:text-5xl font-delicious-small-caps">¡Dale click y conoce más!</h1>
  <div
    className="relative max-w-[1228px] mx-auto flex flex-row flex-wrap items-center justify-center gap-12 my-20 w-full"
  >
    {stickyNotes.map((stickyNote, index) => <StickyNote {...stickyNote} idStickyNote={`stickyNote-${index}`} key={index} />)}
  </div>
  </section>
  )
}
