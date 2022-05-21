import { createContext, useContext } from "react";
import { User } from "../authentication";
import { Team } from "./index";

interface TeamContext {
  team: Team[];
  members: User[];
};

const TeamContext = createContext<TeamContext>({ team: [], members: [] });

export const TeamProvider: React.FC<TeamContext> = ({ children, team, members }) => {
  return (
    <TeamContext.Provider value={{ team, members }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = (): TeamContext => {  
  return useContext(TeamContext);
};