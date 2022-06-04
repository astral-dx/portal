import { Permission, Team, TeamMember } from "../plugin";

export const teamManagementService = {
  addTeam: async (name: string): Promise<Team> => {
    const response = await fetch(`/api/admin/team`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    const { team } = await response.json();

    return team;
  },

  generateInviteLink: async (
    teamId: string,
    opts?: { admin?: boolean },
  ): Promise<string> => {
    const response = await fetch(`/api${ opts?.admin ? '/admin' : '' }/team/${teamId}/invite-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const { link } = await response.json();

    return link;
  },

  generateAdminInviteLink: async (): Promise<string> => {
    const response = await fetch(`/api/admin/admin-invite-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    const { link } = await response.json();

    return link;
  },

  removeTeamMember: async (
    teamId: string,
    member: TeamMember,
    opts?: { admin?: boolean },
  ): Promise<void> => {
    const shouldContinue = window.confirm(`Are you sure you want to remove ${member.email} as a member of your team?`);

    if (!shouldContinue) {
      return;
    }

    await fetch(`/api${ opts?.admin ? '/admin' : '' }/team/${teamId}/member/${member.email}`, {
      method: 'DELETE',
    });
  },

  deleteTeam: async (teamId: string): Promise<void> => {
    const shouldContinue = window.confirm(`Are you sure you want to delete this team, it's members, and it's credentials?`);

    if (!shouldContinue) {
      return;
    }

    await fetch(`/api/admin/team/${teamId}`, {
      method: 'DELETE',
    });
  },
};