import { styled, Typography, alpha } from "@mui/material";
import { Card, CardBody, CardHeader, CardTitle } from "../Card/Card";

const Container = styled(Card)(({ theme }) => `
  background-color: ${alpha('#504dd7', 0.1)};
`);

const Content = styled(CardBody)(({ theme }) => `
  flex-direction: row;
  align-items: center;
  gap: ${theme.spacing(2)};
`);

const Support = styled(Typography)(({ theme }) => `
  color: ${theme.palette.text.secondary};
`);

const AstralLogo = styled('img')(({ theme }) => `
  height: 30px;
`);

export const BetaBanner: React.FC = () => (
  <Container>
    <Content>
      <AstralLogo src="/astral.svg" />
      <div>
        <Typography variant="body2" fontWeight={ 600 }>
          Thank you for participating in the Astral DX API Portal beta! 🎉
        </Typography>
        <Support variant="caption">
          Please report any issues via email to support@astral.sh
        </Support>
      </div>
    </Content>
  </Container>
)