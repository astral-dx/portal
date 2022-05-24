import { isEqual } from "lodash";
import { createContext, useContext, useState } from "react";
import { Team, TeamMember } from "./index";

interface ConsumerTeamContext {
  team?: Team;
  removeTeamMember: (member: TeamMember) => void;
};

const ConsumerTeamContext = createContext<ConsumerTeamContext>({ removeTeamMember: () => {} });

export const ConsumerTeamProvider: React.FC<{ team?: Team }> = ({ children, team: initalTeam }) => {
  const [ team, setTeam ] = useState(initalTeam);

  const removeTeamMember = (member: TeamMember) => {
    if (!team) {
      return;
    }

    setTeam({
      ...team,
      members: team.members.filter(m => !isEqual(member, m)),
    });
  }

  return (
    <ConsumerTeamContext.Provider value={{ team, removeTeamMember }}>
      {children}
    </ConsumerTeamContext.Provider>
  );
};

export const useConsumerTeam = (): ConsumerTeamContext => {  
  return useContext(ConsumerTeamContext);
};