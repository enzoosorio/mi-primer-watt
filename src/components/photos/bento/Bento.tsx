
import {  Suspense } from 'react'
import { SelectCategoryContainer } from './SelectCategoryContainer'
import { BentoContainer } from './BentoContainer'
import { SelectCategoriesBentoPhotosSkeleton } from '@/src/skeletons/SelectCategoriesBentoPhotosSkeleton'
import { BentoContainerSkeleton } from '@/src/skeletons/BentoContainerSkeleton'

export const Bento = ({category} : {category : string | null}) => {
  return (
    <section className="w-[95%] mx-auto flex flex-col items-center justify-center gap-12 my-12 welcomeToMain">
        <div className='mt-8 flex flex-col items-center justify-center gap-4 w-full'>
          <h1 className='font-roboto text-4xl lg:text-6xl font-bold text-center'>Bento Photos</h1>
          <h4 className='text-lg'>(Perdón si existen imágenes repetidas)</h4>
          <p className='w-[88%] lg:w-full text-center text-pretty'>Usa el filtrado de categorias para poder ver fotos de tus intereses</p>
        </div> 
        
       <Suspense fallback={<SelectCategoriesBentoPhotosSkeleton/>}>
        <SelectCategoryContainer/>
       </Suspense>
      <Suspense fallback={<BentoContainerSkeleton/>}>
      <BentoContainer category={category}/>
      </Suspense>
  
    </section>
  )
}
