import { styled, Typography } from "@mui/material";
import { useReferences } from "../../plugin";

const Container = styled('header')(({ theme }) => `
  padding: ${theme.spacing(2, 3, 2, 0)};
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

const Reference = styled('a')(({ theme }) => `
  padding: ${theme.spacing(2)};
  width: 100%;
  color: ${theme.palette.text.primary};
  text-decoration: none;
  display: flex;
  align-items: center;
  transition: all 200ms ease;
  border-radius: 10px;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.05);
  }

  &:hover .icon-wrapper {
    background-color: ${theme.palette.primary.main};
  }

  &:hover .material-symbols-rounded {
    color: ${theme.palette.primary.contrastText};
  }
`);

const IconWrapper = styled('span')(({ theme }) => `
  margin-right: ${theme.spacing(2)};
  background-color: rgba(0, 0, 0, 0.05);
  height: 60px;
  width: 60px;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  transition: all 200ms ease;
`);

const Icon = styled('span')(({ theme }) => `
  font-size: 2rem !important;
  transition: all 200ms ease;
`);

const TextContainer = styled('div')(({ theme }) => `
  max-width: 300px;
`);

const Label = styled(Typography)(({ theme }) => `
  font-weight: 800;
`);

const Description = styled(Typography)(({ theme }) => `
  color: ${theme.palette.text.secondary};
  font-size: 0.9rem;
  line-height: 1.1rem;
`);

export const References: React.FC = () => {
  const { references } = useReferences();

  return (
    <Container>
      <Title>References</Title>
      { references.map((ref) => (
        <Reference key={ ref.url } href={ ref.url }>
          <IconWrapper className="icon-wrapper">
            <Icon className="material-symbols-rounded">{ ref.icon }</Icon>
          </IconWrapper>
          <TextContainer>
            <Label>{ ref.label }</Label>
            { ref.description && <Description>{ ref.description }</Description> }
          </TextContainer>
        </Reference>
      ) )}
    </Container>
  )
}