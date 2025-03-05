

import React from 'react'

export const FilterCategoryPhotos = () => {
  return (
    <div className='flex flex-col items-center justify-center gap-6 w-[95%] mx-auto'>
        <select className='w-full rounded-lg bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
            <option value='all'>Todas las categorías</option>
        </select>
    </div>
  )
}
