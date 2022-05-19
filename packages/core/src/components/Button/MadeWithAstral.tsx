import { styled, Button as MuiButton, alpha } from "@mui/material";

const StyledButton = styled(MuiButton)(({ theme }) => `
  padding: ${theme.spacing(0.75, 1.5)};
  font-weight: 800;
  background: ${alpha('#fff', 0.5)};
  border-radius: 10px;
  font-size: 0.8rem;
  text-transform: none;
  display: inline-flex;
  margin-top: ${theme.spacing(3)};
  color: ${theme.palette.text.secondary};
  border: 1px solid ${theme.palette.grey[300]};

  &:hover {
    background: ${alpha(theme.palette.background.paper, 0.7)};
  }
`);

const Logo = styled('img')(({ theme }) => `
  display: block;
  height: 9px;
  margin-left: ${theme.spacing(1)};
`);

export const MadeWithAstral = () => (
  <StyledButton href="https://astral.sh/">
    <div>Made with</div> <Logo src="/images/logos/astral.black.svg" />
  </StyledButton>
)