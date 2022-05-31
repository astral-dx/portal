import { Permission, Team, TeamMember } from "../plugin";

export const teamManagementService = {
  addTeam: async (name: string): Promise<Team> => {
    const response = await fetch(`/api/team`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    const { team } = await response.json();

    return team;
  },

  generateInviteLink: async (teamId: string, permissions: Permission[]): Promise<string> => {
    const response = await fetch(`/api/team/${teamId}/invite-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ permissions }),
    });

    const { link } = await response.json();

    return link;
  },

  removeTeamMember: async (teamId: string, member: TeamMember): Promise<void> => {
    const shouldContinue = window.confirm(`Are you sure you want to remove ${member.email} as a member of your team?`);

    if (!shouldContinue) {
      return;
    }

    await fetch(`/api/team/${teamId}/member/${member.email}`, {
      method: 'DELETE',
    });
  },

  deleteTeam: async (teamId: string): Promise<void> => {
    const shouldContinue = window.confirm(`Are you sure you want to delete this team, it's members, and it's credentials?`);

    if (!shouldContinue) {
      return;
    }

    await fetch(`/api/team/${teamId}`, {
      method: 'DELETE',
    });
  },
};