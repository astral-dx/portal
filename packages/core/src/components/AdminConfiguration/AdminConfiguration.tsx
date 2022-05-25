import { Chip, styled, Typography } from "@mui/material";
import { Package } from "../../plugin";

const Title = styled(Typography)(({ theme }) => `
  padding: ${theme.spacing(0, 0, 2, 2)};
  margin-bottom: ${theme.spacing(2)};
  text-transform: uppercase;
  font-size: 11px;
  letter-spacing: 1.28px;
  font-weight: 800;
  color: ${theme.palette.text.secondary};
  border-bottom: 1px solid ${theme.palette.divider};
`);

const Package = styled(Chip)(({ theme }) => `
  margin: ${theme.spacing(0, 1, 1, 0)};
`);

export const AdminConfiguration: React.FC<{ packages: Package[] }> = ({ packages }) => {
  return (
    <div>
      <Title>Configuration</Title>
      { packages.map(({ name, component, version }) => (
        <Package
          key={ `${name}:${component}` }
          label={ `${component ? `${component}:` : ''}${name}${version ? `@${version}` : ''}` }
        />
      )) }
    </div>
  )
}