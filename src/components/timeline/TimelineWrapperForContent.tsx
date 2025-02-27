"use server"

import { getContentsByAlbum, IContentAlbumWithId } from '@/src/lib/timeline/getContentByAlbum'
import { ContentTimeline } from './ContentTimeline'
import { getAlbumIdByDate } from '@/src/lib/timeline/getAlbumIdByDate'


interface TimelineProps {
  date : string | undefined
}

export const TimelineWrapperForContent = async({date} : TimelineProps) => {

  const albumId = await getAlbumIdByDate(date)

  if(!albumId){
      return (
        <div className='flex flex-col items-center justify-center gap-6 w-full min-h-full rounded-xl bg-textura h-[650px] '>
          <p className='text-2xl font-delicious-small-caps'>Elige una fecha para poder mostrar el contenido</p>
        </div>
      )
  }

  const contents : IContentAlbumWithId[] | null = await getContentsByAlbum(albumId)

  if(!contents){
      return (
        <div className='flex flex-col items-center justify-center gap-6 w-[70%] min-h-full rounded-xl bg-textura h-[700px] '>
          <p className='text-2xl font-delicious-small-caps'>No hay contenido disponible para ese día</p>
        </div>
      )
      
  }

  return (
   <ContentTimeline contents={contents}/>
  )
}
