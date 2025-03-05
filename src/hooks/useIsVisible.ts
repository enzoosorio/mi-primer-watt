import { useState, useEffect } from "react";

const OPTIONS = {
  root: null,
  rootMargin: "0px",
  threshold: 0, // Detecta tan pronto como entra en el viewport
};

const useIsVisible = (elementRef: any) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target); 
        }
      });
    }, OPTIONS);

    observer.observe(elementRef.current);

    return () => observer.disconnect(); 
  }, [elementRef]);

  return isVisible;
};

export default useIsVisible;
