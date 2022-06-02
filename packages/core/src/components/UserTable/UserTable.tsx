import { AddLink } from "@mui/icons-material";
import { IconButton, styled, Tooltip, Typography } from "@mui/material";

import { TeamMember } from "../../plugin";
import { Card, CardBody, CardHeader } from "../Card/Card";
import { MemberActionsMenu } from "../MemberActionsMenu/MemberActionsMenu";
import { SectionTitle } from "../SectionTitle/SectionTitle";

const Container = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
`);

const Header = styled('div')(({ theme }) => `
  display: flex;
  padding: ${theme.spacing(0, 0, 0, 2)};
  align-items: center;
  justify-content: space-between;
`);

const MemberContent = styled(CardHeader)(({ theme }) => `
  border: none;
`);

interface UserTableProps {
  members: TeamMember[];
  onRemoveTeamMember: (member: TeamMember) => void;
}

export const UserTable: React.FC<UserTableProps> = ({ members, onRemoveTeamMember }) => {
  return (
    <Container>
      <Header>
        <SectionTitle>Team Members</SectionTitle>
      </Header>
      { members.length === 0 && (
        <Card>
          <CardBody sx={{ textAlign: 'center' }}>
            <Typography sx={(theme) => ({ color: theme.palette.text.secondary })}>
              No team members yet, create an invite link to add someone!
            </Typography>
          </CardBody>
        </Card>
      ) }
      { members.map((member) => (
        <Card key={ member.email }>
          <MemberContent>
            { member.email }
            <div>
              <MemberActionsMenu onRemoveTeamMember={ () => onRemoveTeamMember(member) } />
            </div>
          </MemberContent>
        </Card>
      )) }
    </Container>
  );
}