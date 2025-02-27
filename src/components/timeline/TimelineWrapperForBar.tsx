
import { TimelineContainer } from './TimelineContainer'
import { getAllDatesTimeline } from '@/src/lib/timeline/getAllDatesTimeline'


export const TimelineWrapperForBar = async() => {

  const datesTimeline = await getAllDatesTimeline()
  if(!datesTimeline){
      return (
      <div className='flex flex-col items-center justify-center gap-6 w-full lg:w-[40%]  '>
        <p className='text-center font-delicious-small-caps text-2xl border border-gray-500 p-3 rounded-xl'>No hay fechas disponibles</p>
      </div>)
  }
  const firstDateString = datesTimeline[0].date.toString().split("T")[0]

  return (
   <TimelineContainer datesTimeline={datesTimeline} className="flex" currentDate={firstDateString}/>
  )
}
