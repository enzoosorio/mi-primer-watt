import { useEffect, useRef, useState } from "react";

export const useIsVisible3 = (threshold = 0.1) => {
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        setVisibleItems((prev) => {
          const newSet = new Set(prev);
          entries.forEach((entry) => {
            const index = refs.current.indexOf(entry.target as HTMLDivElement);
            if (entry.isIntersecting) {
              newSet.add(index);
            } else {
              newSet.delete(index);
            }
          });
          return newSet;
        });
      },
      { threshold }
    );

    // Observar todos los elementos actuales
    refs.current.forEach((el) => el && observer.observe(el));

    return () => {
      observer.disconnect();
    };
    //dependemos del cambio de la cantidad de elementos
  }, [threshold, refs.current.length]);

  return { refs, visibleItems };
};