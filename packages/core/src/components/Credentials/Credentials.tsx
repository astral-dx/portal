import { styled, Typography } from "@mui/material";
import { useState } from "react";
import { useCredentials, Credential, Environment } from "../../plugin";

const Container = styled('header')(({ theme }) => `
  padding: ${theme.spacing(2)};
  background-color: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
`);

const Title = styled(Typography)(({ theme }) => `
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1rem;
  font-size: 0.8rem;
  color: ${theme.palette.text.secondary};
  padding-left: ${theme.spacing(2)};
`);

const getEnvironments = (creds: Credential[]): Environment[] => {
  return creds.map(c => c.environment).filter(e => e) as Environment[];
}

const getDefaultEnvironment = (environments: Environment[]): Environment => {
  return environments.includes('sandbox') ? 'sandbox' : 'production';
}

export const Credentials: React.FC = () => {
  const { credentials } = useCredentials();
  const [ environments, setEnvironments ] = useState(getEnvironments(credentials));
  const [ selectedEnvironment, setSelectedEnvironment ] = useState(getDefaultEnvironment(environments));
  const [ selectedCredential, setSelectedCredential ] = useState(credentials.filter(c => c.environment === selectedEnvironment)[0]);

  return (
    <Container>
      <Title>Credentials</Title>
      <pre>{ selectedEnvironment }</pre>
      <pre>{ JSON.stringify(selectedCredential, null, 2) }</pre>
    </Container>
  )
}