import { Container } from "@mui/material";

import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout: React.FC = ({ children }) => (
  <>
    <Header />
    <Container maxWidth="lg">
      { children }
    </Container>
    <Footer />
  </>
)