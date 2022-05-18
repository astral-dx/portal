import { createContext, useContext } from "react";
import { Brand } from "./";

interface BrandContext {
  brand: Brand;
};

const BrandContext = createContext<BrandContext>({
  brand: {
    logoSrc: '',
    faviconHref: '',
    primaryColor: '',
    secondaryColor: '',
    title: '',
    subtitle: '',
  }
});

export const BrandProvider: React.FC<BrandContext> = ({ children, brand }) => {
  return (
    <BrandContext.Provider value={{ brand }}>
      {children}
    </BrandContext.Provider>
  );
};

export const useBrand = (): BrandContext => {  
  return useContext(BrandContext);
};