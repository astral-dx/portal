import { styled, Typography } from "@mui/material";
import { useReferences } from "../../plugin";

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

const Reference = styled('a')(({ theme }) => `
  padding: ${theme.spacing(2)};
  width: 100%;
  color: ${theme.palette.text.primary};
  text-decoration: none;
  display: flex;
  transition: all 200ms ease;
  border-radius: 10px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.025);
  }
`);

const IconWrapper = styled('span')(({ theme }) => `
  margin-right: ${theme.spacing(2)};
  margin-top: 1px;
`);

const Icon = styled('span')(({ theme }) => `
  font-size: 1.4rem !important;
  transition: all 200ms ease;
`);

const TextContainer = styled('div')(({ theme }) => `
  max-width: 300px;
`);

const Label = styled(Typography)(({ theme }) => `
  font-size: 0.9rem;
  font-weight: 800;
`);

const Description = styled(Typography)(({ theme }) => `
  color: ${theme.palette.text.secondary};
  font-size: 0.9rem;
`);

export const References: React.FC = () => {
  const { references } = useReferences();

  return (
    <div>
      <Title>References</Title>
      { references.map((ref) => (
        <Reference key={ ref.url + ref.icon + ref.label } href={ ref.url }>
          <IconWrapper className="icon-wrapper">
            <Icon className="material-symbols-rounded">{ ref.icon }</Icon>
          </IconWrapper>
          <TextContainer>
            <Label>{ ref.label }</Label>
            { ref.description && <Description>{ ref.description }</Description> }
          </TextContainer>
        </Reference>
      ) ) }
    </div>
  )
}