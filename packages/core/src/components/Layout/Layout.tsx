import { Container } from "@mui/material";

import { Footer } from "./Footer";
import { Header } from "./Header";

export const Layout: React.FC<{ logoutPath: string }> = ({ children, logoutPath }) => (
  <>
    <Header logoutPath={ logoutPath } />
    <Container maxWidth="lg">
      { children }
    </Container>
    <Footer />
  </>
)