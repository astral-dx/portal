import { createContext, useContext } from "react";
import { Team } from "../plugin/teamManagement";

interface TeamsContext {
  teams: Team[];
};

const TeamsContext = createContext<TeamsContext>({
  teams: [],
});

export const TeamsProvider: React.FC<TeamsContext> = ({ children, teams }) => {
  return (
    <TeamsContext.Provider value={{ teams }}>
      {children}
    </TeamsContext.Provider>
  );
};

export const useTeams = (): TeamsContext => {  
  return useContext(TeamsContext);
};