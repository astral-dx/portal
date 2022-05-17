import { createContext, useContext } from "react";
import { User } from "../plugin";

interface UserContext {
  user?: User;
};

const UserContext = createContext<UserContext>({});

export const UserProvider: React.FC<UserContext> = ({ children, user }) => {
  return (
    <UserContext.Provider value={{ user }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContext => {  
  return useContext(UserContext);
};