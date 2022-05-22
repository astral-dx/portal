import { styled, Typography } from "@mui/material";
import { useState } from "react";
import { useCredentials, Credential, Environment } from "../../plugin";
import { Button } from "../Button/Button";
import { Card, CardActions, CardBody, CardHeader, CardTitle } from "../Card/Card";
import { CredentialPropertyField } from "./CredentialPropertyField";
import { CredentialPicker } from "./CredentialPicker";

const CredentialPickerContainer = styled(Typography)(({ theme }) => `
  /* padding: ${theme.spacing(2, 0, 1)}; */
`);

const CredentialPropertiesContainer = styled(Typography)(({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
  padding: ${theme.spacing(2, 0, 0)};
`);

const getDefaultEnvironment = (environments: Environment[]): Environment => {
  return environments.includes('Sandbox') ? 'Sandbox' : 'Production';
}

export const Credentials: React.FC = () => {
  const { credentials, updateCredential, environments } = useCredentials();
  const [ selectedEnvironment, setSelectedEnvironment ] = useState(getDefaultEnvironment(environments));
  const [ selectedCredential, setSelectedCredential ] = useState(credentials.filter(c => c.environment === selectedEnvironment)[0]);
  const [ isLoading, setIsLoading ] = useState(false);

  const rotateCredential = async () => {
    const shouldRotate = window.confirm('Are you sure you want to generate a new credential? This action may invalidate your current credential.');

    if (!shouldRotate) {
      return;
    }

    setIsLoading(true);

    const response = await fetch('/api/credential/rotate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ credential: selectedCredential }),
    });

    const credential = await response.json();

    updateCredential(selectedCredential, credential);
    setSelectedCredential(credential);
    setIsLoading(false);
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Credentials</CardTitle>
      </CardHeader>
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
      </CardBody>
      <CardActions>
        <Button onClick={ rotateCredential } color="error">Rotate Credential</Button>
      </CardActions>
    </Card>
  )
}