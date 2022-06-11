import { Team, TeamMember } from "../plugin";

export const teamManagementService = {
  addTeam: async (name: string): Promise<Team> => {
    const response = await fetch(`/api/admin/team`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name }),
    });

    if (response.status >= 400) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const { team } = await response.json();

    return team;
  },

  generateInvitePath: async (
    teamId: string,
    opts?: { admin?: boolean },
  ): Promise<string> => {
    const response = await fetch(`/api${ opts?.admin ? '/admin' : '' }/team/${teamId}/invite-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status >= 400) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const { path } = await response.json();

    return path;
  },

  generateAdminInvitePath: async (): Promise<string> => {
    const response = await fetch(`/api/admin/admin-invite-link`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status >= 400) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }

    const { path } = await response.json();

    return path;
  },

  removeTeamMember: async (
    teamId: string,
    member: TeamMember,
    opts?: { admin?: boolean },
  ): Promise<void> => {
    const shouldContinue = window.confirm(`Are you sure you want to remove ${ member.email } as a member of your team?`);

    if (!shouldContinue) {
      return;
    }

    const response = await fetch(`/api${ opts?.admin ? '/admin' : '' }/team/${ teamId }/member/${ member.email }`, {
      method: 'DELETE',
    });

    if (response.status >= 400) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  },

  deleteTeam: async (teamId: string): Promise<void> => {
    const shouldContinue = window.confirm(`Are you sure you want to delete this team, it's members, and it's credentials?`);

    if (!shouldContinue) {
      return;
    }

    const response = await fetch(`/api/admin/team/${ teamId }`, {
      method: 'DELETE',
    });

    if (response.status >= 400) {
      throw new Error(`${response.status} - ${response.statusText}`);
    }
  },
};