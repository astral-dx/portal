import { createContext, useContext } from "react";
import { Credential } from "../plugin/credential";

interface CredentialsContext {
  credentials: Credential[];
};

const CredentialsContext = createContext<CredentialsContext>({
  credentials: [],
});

export const CredentialsProvider: React.FC<CredentialsContext> = ({ children, credentials }) => {
  return (
    <CredentialsContext.Provider value={{ credentials }}>
      {children}
    </CredentialsContext.Provider>
  );
};

export const useCredentials = (): CredentialsContext => {  
  return useContext(CredentialsContext);
};