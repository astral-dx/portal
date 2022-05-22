import { VisibilityOff, Visibility, ContentCopy } from "@mui/icons-material";
import { TextField, InputAdornment, IconButton, styled } from "@mui/material";
import { useState } from "react";
import { useCopyToClipboard } from "react-use";
import { CredentialProperty } from "../../plugin";

const IconButtonSpacer = styled('div')(({ theme }) => `
  width: ${theme.spacing(2)};
`);

export const CredentialPropertyField: React.FC<{ property: CredentialProperty }> = ({ property }) => {
  const [ hideSecret, setHideSecret ] = useState(true);
  const [ _, copyToClipboard ] = useCopyToClipboard();

  return (
    <TextField
      variant="outlined"
      disabled
      fullWidth
      label={ property.label }
      value={ property.value }
      type={ property.secret && hideSecret ? 'password' : 'text' }
      helperText={ property.helperText }
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            { property.secret && [
              (
                <IconButton
                  key={`${property.label}-icon-button`}
                  aria-label="toggle password visibility"
                  onClick={() => setHideSecret(!hideSecret)}
                  edge="end"
                >
                  { hideSecret ? <VisibilityOff /> : <Visibility /> }
                </IconButton>
              ),
              ( <IconButtonSpacer key={`${property.label}-icon-butto-spacer`} /> )
            ] }
            <IconButton onClick={ () => copyToClipboard(property.value) }>
              <ContentCopy />
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  )
}