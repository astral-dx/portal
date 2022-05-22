import { isEqual } from "lodash";
import { createContext, useContext, useState } from "react";
import { Credential, Environment } from "./";

interface CredentialsContext {
  credentials: Credential[];
  updateCredential: (oldCredential: Credential, newCredential: Credential) => void;
  environments: Environment[];
};

const CredentialsContext = createContext<CredentialsContext>({
  credentials: [],
  updateCredential: () => {},
  environments: [],
});

const getEnvironments = (creds: Credential[]): Environment[] => {
  return Array.from(new Set(creds.map(c => c.environment).filter(e => e))).reverse() as Environment[];
}

export const CredentialsProvider: React.FC<{ credentials: Credential[] }> = ({ children, credentials: initialCredentials }) => {
  const [ credentials, setCredentials ] = useState(initialCredentials);

  const updateCredential = (oldCredential: Credential, newCredential: Credential) => {
    setCredentials(credentials.map((credential) => {
      if (isEqual(credential, oldCredential)) {
        return newCredential;
      }
    
      return credential;
    }));
  };

  return (
    <CredentialsContext.Provider value={{ credentials, updateCredential, environments: getEnvironments(credentials) }}>
      {children}
    </CredentialsContext.Provider>
  );
};

export const useCredentials = (): CredentialsContext => {  
  return useContext(CredentialsContext);
};