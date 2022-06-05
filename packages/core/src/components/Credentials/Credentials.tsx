import { Box, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useCredentials, Environment, Credential } from "../../plugin";
import { Button } from "../Button/Button";
import { Card, CardActions, CardBody, CardHeader, CardTitle } from "../Card/Card";
import { CredentialPropertyField } from "./CredentialPropertyField";
import { CredentialPicker } from "./CredentialPicker";
import { RotateRight } from "@mui/icons-material";
import { Header } from "../Header/Header";

const CredentialPropertiesContainer = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
  padding: ${theme.spacing(2, 0, 0)};
`);

const getDefaultEnvironment = (environments: Environment[]): Environment => {
  return environments.includes('Sandbox') ? 'Sandbox' : 'Production';
}

interface CredentialsProps {
  credentials: Credential[];
  environments: Environment[];
  onRotateCredential: (credential: Credential) => void;
}

export const Credentials: React.FC<CredentialsProps> = ({ credentials, environments, onRotateCredential }) => {
  const [ selectedEnvironment ] = useState(getDefaultEnvironment(environments));
  const [ selectedCredential, setSelectedCredential ] = useState(credentials.filter(c => c.environment === selectedEnvironment)[0]);

  useEffect(() => {
    setSelectedCredential(credentials.filter(c => c.environment === selectedEnvironment)[0]);
  }, [credentials]);

  return (
    <Box display={ 'flex' } flexDirection={ 'column' } gap={ 3 }>
      <Header
        title={ 'Credentials' }
      />
      <Card>
        <CardBody>
          <CredentialPicker
            credentials={ credentials }
            selectedCredential={ selectedCredential }
            onChange={ (credential) => setSelectedCredential(credential) }
          />
          <CredentialPropertiesContainer>
            { selectedCredential.properties.map((property) => (
              <CredentialPropertyField key={ property.label } property={ property } />
            )) }
          </CredentialPropertiesContainer>
          <Box marginTop={ 2 }>
            <Button
              endIcon={ <RotateRight /> }
              onClick={ () => onRotateCredential(selectedCredential) }
              color="error"
            >
              Rotate Credential
            </Button>
          </Box>
        </CardBody>
      </Card>
    </Box>
  )
}