// contexts/carouselContext.tsx
import React, { createContext, useState, ReactNode } from 'react';

interface CarouselContextProps {
  activeSlide: number;
  setActiveSlide: React.Dispatch<React.SetStateAction<number>>;
}

export const CarouselContext = createContext<CarouselContextProps | undefined>(undefined);

interface CarouselProviderProps {
  children: ReactNode;
}

export const CarouselProvider: React.FC<CarouselProviderProps> = ({ children }) => {
  const [activeSlide, setActiveSlide] = useState(0);

  return (
    <CarouselContext.Provider value={{ activeSlide, setActiveSlide }}>
      {children}
    </CarouselContext.Provider>
  );
};
