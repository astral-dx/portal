import { createContext, useContext, useState } from "react";
import { User } from "./index";

interface UserContext {
  user?: User;
  isPortalAdmin?: boolean;
};

const UserContext = createContext<UserContext>({});

export const UserProvider: React.FC<{ user?: User }> = ({ children, user: initalUser }) => {
  const [ user, setUser ] = useState(initalUser);
  const [ isPortalAdmin, setIsPortalAdmin ] = useState(user?.permissions.includes('portal-admin'))

  return (
    <UserContext.Provider value={{ user, isPortalAdmin }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContext => {  
  return useContext(UserContext);
};