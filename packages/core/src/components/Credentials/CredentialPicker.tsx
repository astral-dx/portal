import { KeyboardArrowDown } from "@mui/icons-material";
import { styled, Menu, MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { isEqual } from 'lodash';

import { Credential } from "../../plugin";
import { Button } from "../Button/Button";

const Container = styled('div')(({ theme }) => `
  padding-bottom: ${theme.spacing(1)};
`);

const CredentialMenuItem = styled(MenuItem)(({ theme }) => `
  font-size: 0.8rem;
`);

const getLabel = ({ name, environment }: Credential): string => {
  return name ? `${name} (${environment})` : environment;
}

export const CredentialPicker: React.FC<{
  credentials: Credential[],
  selectedCredential: Credential,
  onChange: (credential: Credential) => void,
}> = ({ credentials, selectedCredential, onChange }) => {
  const [ credentialOptions, setCredentialOptions ] = useState<Credential[]>([])
  const [ anchorEl, setAnchorEl ] = useState<Element | null>(null);

  const onClose = () => setAnchorEl(null);
  const onCredentialClicked = (credential: Credential) => {
    onChange(credential);
    onClose();
  }

  useEffect(() => {
    setCredentialOptions(credentials.filter((c) => !isEqual(c.properties, selectedCredential.properties)))
  }, [ credentials, selectedCredential ]);

  if (credentials.length < 2) {
    return null;
  }

  return (
    <Container>
      <Button
        color="primary"
        onClick={ (e) => setAnchorEl(e.currentTarget) }
        endIcon={ <KeyboardArrowDown /> }
      >
        { getLabel(selectedCredential) }
      </Button>
      <Menu
        anchorEl={ anchorEl }
        open={ Boolean(anchorEl) }
        onClose={ onClose }
      >
        { credentialOptions.map(((credential) => (
          <CredentialMenuItem key={ getLabel(selectedCredential) } onClick={ () => onCredentialClicked(credential) }>
            { getLabel(credential) }
          </CredentialMenuItem>
        ))) }
      </Menu>
    </Container>
  )
}