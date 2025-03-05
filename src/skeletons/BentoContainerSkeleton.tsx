import React from 'react'

export const BentoContainerSkeleton = () => {
  return (
    <div className="gridContainer w-full bg-blue-600/10">
    {Array.from({ length: 6 }, (_, i) => i + 1).map((i, index) => (
      <div
        key={index}
        className={`relative w-full transition-all duration-500 ease-in-out 
              ${i % 2 === 0 ? "Tall" 
                : i % 2 === 1 ? "Square" 
                : "Tall"} 
              w-[250px] h-[400px] 
              flex items-center justify-center rounded-xl bentoLoading overflow-hidden`}
      >
      </div>
    ))}
    </div>
  )
}
