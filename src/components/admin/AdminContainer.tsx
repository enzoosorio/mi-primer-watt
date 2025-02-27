
import { getQuestionsInPending, IQnAWithId } from '@/src/lib/getQuestionsInPending'
import { TableContainer } from './TableContainer'
import { AdminTimelineContainer } from './AdminTimelineContainer'
import { ToggleAdminOption } from './ToggleAdminOption'
import { getAllDatesTimeline, IAlbumWithId } from '@/src/lib/timeline/getAllDatesTimeline'

export const AdminContainer = async({option} : {option : string | undefined}) => {
    
    const questionsInPending : IQnAWithId[] | null = await getQuestionsInPending()
    const datesTimeline : IAlbumWithId[] | null = await getAllDatesTimeline()

  return (
   <>
   <ToggleAdminOption/>
   {
       option === "qna" ? (
           <TableContainer questionsInPending={questionsInPending}/>
       ) : option === "timeline" ? (
           <AdminTimelineContainer datesTimeline={datesTimeline}/>
       ) : (
           <div>Elige una opción</div>
       )
   }
    </>
  )
}
