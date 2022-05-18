import { createContext, useContext } from "react";
import { Reference } from "./";

interface ReferencesContext {
  references: Reference[];
};

const ReferencesContext = createContext<ReferencesContext>({
  references: [],
});

export const ReferencesProvider: React.FC<ReferencesContext> = ({ children, references }) => {
  return (
    <ReferencesContext.Provider value={{ references }}>
      {children}
    </ReferencesContext.Provider>
  );
};

export const useReferences = (): ReferencesContext => {  
  return useContext(ReferencesContext);
};