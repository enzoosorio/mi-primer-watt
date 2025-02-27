'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export const ToggleAdminOption = () => {

    const [option, setOption] = useState("qna")
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();

    function handleToggleOption(option: string) {
        const params = new URLSearchParams(searchParams);
        if (option) {
          params.set('option', option);
          setOption(option);
        } else {
          params.delete('option');
        }
        replace(`${pathname}?${params.toString()}`);
      }


  return (
    <div className="flex flex-col lg:flex-row items-center justify-center gap-4 px-4 py-2 rounded-xl">
        <button 
        onClick={(() => handleToggleOption("qna"))}
        className={`font-delicious-small-caps px-4 py-2 text-xl bg-primary-blue text-white rounded-lg hover:bg-blue-400 ${option === "qna" ? "bg-blue-400" : "bg-primary-blue"} transition-colors cursor-pointer`}>
            Qna's
        </button>
        <button 
        onClick={(() => handleToggleOption("timeline"))}
        className={`font-delicious-small-caps px-4 py-2 text-xl bg-primary-blue text-white rounded-lg hover:bg-blue-400 ${option === "timeline" ? "bg-blue-400" : "bg-primary-blue"} transition-colors cursor-pointer`}>
            Timeline
        </button>
    </div>
  )
}
