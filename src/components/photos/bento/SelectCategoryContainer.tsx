"use server"
import { getCategoryBentoOptions } from '@/src/lib/getCategoriesBentoPhotos'
import { SelectCategory } from './SelectCategory'

export const SelectCategoryContainer = async() => {

    const categories = await getCategoryBentoOptions()

    if(!categories){
        return <p>No se han creado categorías</p>
    }

  return (
    <SelectCategory photoCategories={categories}/>
  )
}
