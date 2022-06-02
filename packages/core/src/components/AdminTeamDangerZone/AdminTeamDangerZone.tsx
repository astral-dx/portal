import { Groups, Password } from "@mui/icons-material";
import { styled, Typography } from "@mui/material";
import { Button } from "../Button/Button";
import { Card, CardBody } from "../Card/Card";
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

const ActionContainer = styled('div')(({ theme }) => `
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  gap: ${theme.spacing(2)};
`);

const ActionDescription = styled(Typography)(({ theme }) => `
  padding-left: ${theme.spacing(3)};
  max-width: 500px;
  color: ${theme.palette.text.secondary};
`);

interface AdminTeamDangerZoneProps {
  onRevokeCredentials: () => void;
  onDeleteTeam: () => void;
}

export const AdminTeamDangerZone: React.FC<AdminTeamDangerZoneProps> = ({ onRevokeCredentials, onDeleteTeam }) => {
  return (
    <Container>
      <Header>
        <SectionTitle>Danger Zone</SectionTitle>
      </Header>
      <Card>
        <CardBody sx={(theme) => ({ gap: theme.spacing(4) })}>
          <ActionContainer>
            <Button onClick={ onRevokeCredentials } color="error" endIcon={ <Password /> }>
              Revoke Credentials
            </Button>
            <ActionDescription variant="caption">
              Permently deletes all credentials to your sandbox and production environments for this team. This action cannot be undone.
            </ActionDescription>
          </ActionContainer>
          <ActionContainer>
            <Button onClick={ onDeleteTeam } color="error" endIcon={ <Groups /> }>
              Delete Team
            </Button>
            <ActionDescription variant="caption">
              Permently deletes the team, users, and all credentials to both sandbox and production environments. This action cannot be undone.
            </ActionDescription>
          </ActionContainer>
        </CardBody>
      </Card>
    </Container>
  );
}