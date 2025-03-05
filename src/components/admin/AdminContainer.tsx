
import { getQuestionsInPending, IQnAWithId } from '@/src/lib/getQuestionsInPending'
import { TableContainer } from './TableContainer'
import { AdminTimelineContainer } from './AdminTimelineContainer'
import { ToggleAdminOption } from './ToggleAdminOption'
import { getAllDatesTimeline, IAlbumWithId } from '@/src/lib/timeline/getAllDatesTimeline'
import { AdminBentoPhotos } from './AdminBentoPhotos'
import { getCategoryBentoOptions } from '@/src/lib/getCategoriesBentoPhotos'

export const AdminContainer = async({option} : {option : string | undefined}) => {
    
    const questionsInPending : IQnAWithId[] | null = await getQuestionsInPending()
    const datesTimeline : IAlbumWithId[] | null = await getAllDatesTimeline()
    const categoryBentoOptions : string[] | null = await getCategoryBentoOptions()

    console.log({categoryBentoOptions})

  return (
   <>
   <ToggleAdminOption/>
   {
       option === "qna" ? (
           <TableContainer questionsInPending={questionsInPending}/>
       ) : option === "timeline" ? (
           <AdminTimelineContainer datesTimeline={datesTimeline}/>
       ) : option === "bento" ? (
           <AdminBentoPhotos categoryBentoOptions={categoryBentoOptions}/>
       ) : (
        <div>Elige una opción</div>
    )
   }
    </>
  )
}
