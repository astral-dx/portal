import { Divider, IconButton, InputAdornment, styled, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { useCopyToClipboard } from "react-use";

import { Credential } from "../../hooks/useCredentials";
import { Card, CardTitle, CardBody, CardActions } from "../Layout/Card";
import { Button } from "../Button/Button";

interface CredentialsProps {
  credential?: Credential;
  isLoading: boolean;
  onRotateSecret: () => void;
}

const IconButtonSpacer = styled('div')(({ theme }) => `
  width: ${theme.spacing(1)};
`);

export const Credentials: React.FC<CredentialsProps> = ({ credential, isLoading, onRotateSecret }) => {
  const [_, copyToClipboard] = useCopyToClipboard();
  const [secretVisible, setSecretVisible] = useState<boolean>(false);

  return (
    <Card>
      <CardTitle>API Credentials</CardTitle>
      <Divider />
      <CardBody>
        <Typography>
          Use these credentials below to generate tokens that you can use to make API requests with. Requests to our API should only be made from your backend, never a web or mobile app directly.
        </Typography>
        <TextField
          disabled
          fullWidth
          value={credential?.clientId}
          label="Client ID"
          InputLabelProps={{ shrink: !!credential?.clientId }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => copyToClipboard(credential?.clientId ?? '')}>
                  <ContentCopyIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          helperText="The identifier for the client your application, use to call our API."
        />
        <TextField
          disabled
          fullWidth
          value={ isLoading ? '' : credential?.clientSecret }
          type={ secretVisible ? 'text' : 'password' }
          label="Client Secret"
          InputLabelProps={{ shrink: !!credential?.clientSecret }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton disabled={ isLoading } onClick={() => setSecretVisible(!secretVisible)}>
                  { secretVisible && <VisibilityOffIcon /> }
                  { !secretVisible && <VisibilityIcon /> }
                </IconButton>
                <IconButtonSpacer />
                <IconButton disabled={ isLoading } onClick={() => copyToClipboard(credential?.clientSecret ?? '')}>
                  <ContentCopyIcon />
                </IconButton>
              </InputAdornment>
            )
          }}
          helperText="Your client secret is known only to your application and the authorization server. Protect your client secret and never include it in mobile or browser-based apps."
        />
      </CardBody>
      <CardActions>
        <Button onClick={ onRotateSecret } color="error">Rotate Secret</Button>
      </CardActions>
    </Card>
  );
}