import { Delete, RotateRight } from "@mui/icons-material";
import { Box, IconButton, styled, Tooltip, Typography } from "@mui/material";

import { Credential } from "../../plugin"
import { Card, CardBody, CardHeader } from "../Card/Card";
import { SectionTitle } from "../SectionTitle/SectionTitle";

const Container = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
`);

const Title = styled(SectionTitle)(({ theme }) => `
  padding: ${theme.spacing(0, 0, 2, 2)};
  margin-bottom: ${theme.spacing(1)};
  border-bottom: 1px solid ${theme.palette.divider};
`);

const CredentialContainer = styled(CardHeader)(({ theme }) => `
  border: none;
`);

const CredentialEnvironment = styled(Typography)(({ theme }) => `
  font-weight: 600;
`);

const CredentialName = styled(Typography)(({ theme }) => `
  color: ${theme.palette.text.secondary};
`);

interface AdminTeamCredentialsProps {
  credentials: Credential[];
  onRotateCredential: (credential: Credential) => void;
  onDeleteCredential: (credential: Credential) => void;
}

export const AdminTeamCredentials: React.FC<AdminTeamCredentialsProps> = ({ credentials, onRotateCredential, onDeleteCredential }) => {
  return (
    <Container>
      <Title>Credentials</Title>
      { credentials.length === 0 && (
        <Card>
          <CardBody sx={{ textAlign: 'center' }}>
            <Typography variant="body2" sx={(theme) => ({ color: theme.palette.text.secondary })}>
              No credentials found.
            </Typography>
          </CardBody>
        </Card>
      ) }
      { credentials.map((credential) => (
        <Card key={ credential.environment + credential.name }>
          <CredentialContainer>
            <div>
              <CredentialEnvironment variant="body2">
                { credential.environment }
              </CredentialEnvironment>
              <CredentialName variant="caption">
                { credential.name }
              </CredentialName>
            </div>
            <Box display={ 'flex' } gap={ 2 }>
              <Tooltip title="Rotate">
                <IconButton onClick={ () => onRotateCredential(credential) } size="small">
                  <RotateRight fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete">
                <IconButton onClick={ () => onDeleteCredential(credential) } size="small">
                  <Delete fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          </CredentialContainer>
        </Card>
      )) }
    </Container>
  )
}