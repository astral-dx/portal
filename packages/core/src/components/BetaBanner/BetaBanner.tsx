import { styled, Typography, alpha } from "@mui/material";
import { Card, CardBody, CardHeader, CardTitle } from "../Card/Card";

const Container = styled(Card)(({ theme }) => `
  background-color: ${alpha('#504dd7', 0.1)};
`);

const Content = styled(CardBody)(({ theme }) => `
  /* flex-direction: row; */
  text-align: center;
`);

const AstralLogo = styled('img')(({ theme }) => `
  height: 70px;
  margin: ${theme.spacing(2, 0, 3)};
`);

const TextContainer = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
  padding-bottom: ${theme.spacing(1)};
`);

const Text = styled(Typography)(({ theme }) => `
  color: ${theme.palette.text.secondary};
`);

export const BetaBanner: React.FC = () => (
  <Container>
    <Content>
      <AstralLogo src="/astral.svg" />
      <TextContainer>
        <Typography fontWeight={ 800 } lineHeight={ '1.3rem' }>
          Thanks from the Astral DX Team!
        </Typography>
        <Text variant="caption">
          We appreciate your trust in supporting your developers. Please report any issues to support@astral.sh
        </Text>
      </TextContainer>
    </Content>
  </Container>
)