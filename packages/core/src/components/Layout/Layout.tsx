import { Container } from "@mui/material";
import { Header } from "./Header";

export const Layout: React.FC = ({ children }) => (
  <Container maxWidth="lg">
    <Header />
    { children }
  </Container>
)