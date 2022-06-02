import { Chip, styled } from "@mui/material";

import { Package } from "../../plugin";
import { SectionTitle } from "../SectionTitle/SectionTitle";

const Title = styled(SectionTitle)(({ theme }) => `
  padding: ${theme.spacing(0, 0, 2, 2)};
  margin-bottom: ${theme.spacing(2)};
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