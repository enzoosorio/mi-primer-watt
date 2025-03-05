"use client"
import { usePathname, useRouter, useSearchParams } from 'next/navigation'

interface SelectCategoryProps {
  photoCategories: string[]
}
export const SelectCategory = ({photoCategories} : SelectCategoryProps) => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    
    const handleCategoryChange = async(e : React.ChangeEvent<HTMLSelectElement>) => {
        const category = e.target.value
        const params = new URLSearchParams(searchParams);
        if (category !== "all") {
          params.set('category', category);
        } else {
          params.delete('category');
        }
        replace(`${pathname}?${params.toString()}`);
    }

  return (
    <div className='flex flex-col items-center justify-center gap-4 w-full lg:w-[70ch]'>
    <label className='font-nunito text-lg font-bold ' htmlFor="aspectRatio">
        Seleccionar categoría
    </label>
    <select
    onChange={handleCategoryChange}
    value={searchParams.get('category')?.toString() || 'all'}
    className={`w-full max-w-[55ch]  rounded-lg min-h-[40px] ring ring-gray-500 
        px-4 py-2 text-sm font-medium text-gray-700 focus:outline-none focus:ring-2 
        focus:ring-offset-2 focus:ring-indigo-500 transition-all`}
    id="aspectRatio"
    name="aspectRatio"
    >
      {photoCategories && photoCategories.length !== 0 ? (
        <>
        <option value="all">Todas las categorías</option>
        {photoCategories.map((category, index) => (
          <option key={index} value={category}>
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </option>
        ))}
        </>
      ) : (
        <p>No hay categorías disponibles</p>
      )}
    </select>
</div>
  )
}
