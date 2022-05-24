import { isEqual } from "lodash";
import { createContext, useContext, useState } from "react";
import { Team, TeamMember } from "./index";

interface AdminTeamsContext {
  teams: Team[];
  removeTeamMember: (team: Team, member: TeamMember) => void;
};

const AdminTeamsContext = createContext<AdminTeamsContext>({ teams: [], removeTeamMember: () => {} });

export const AdminTeamsProvider: React.FC<{ teams: Team[] }> = ({ children, teams: initalTeams }) => {
  const [ teams, setTeams ] = useState(initalTeams);

  const removeTeamMember = (team: Team, member: TeamMember) => {
    setTeams(teams.map((t) => {
      if (t.id !== team.id) {
        return t;
      }

      return {
        ...t,
        members: t.members.filter((m) => !isEqual(member, m))
      }
    }));
  }

  return (
    <AdminTeamsContext.Provider value={{ teams, removeTeamMember }}>
      {children}
    </AdminTeamsContext.Provider>
  );
};

export const useAdminTeams = (): AdminTeamsContext => {  
  return useContext(AdminTeamsContext);
};