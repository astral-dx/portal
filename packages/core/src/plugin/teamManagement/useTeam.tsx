import { isEqual } from "lodash";
import { createContext, useContext, useState } from "react";
import { User } from "../authentication";
import { Team } from "./index";

interface TeamContext {
  team?: Team;
  members: User[];
  removeTeamMember: (member: User) => void;
};

const TeamContext = createContext<TeamContext>({ members: [], removeTeamMember: () => {} });

export const TeamProvider: React.FC<{ team?: Team, members: User[] }> = ({ children, team, members: initialMembers }) => {
  const [ members, setMembers ] = useState(initialMembers);

  const removeTeamMember = (member: User) => {
    setMembers(members.filter(m => !isEqual(member, m)));
  }

  return (
    <TeamContext.Provider value={{ team, members, removeTeamMember }}>
      {children}
    </TeamContext.Provider>
  );
};

export const useTeam = (): TeamContext => {  
  return useContext(TeamContext);
};