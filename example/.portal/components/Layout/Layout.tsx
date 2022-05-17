import { styled } from "@mui/material"
import React from "react";

import { Header } from "./Header";

const Wrapper = styled('div')(({ theme }) => `
  display: flex;
  width: 100vw;
  min-height: 100vh;
`);

const ContentWrapper = styled('div')(({ theme }) => `
  display: flex;
  width: 60vw;
  justify-content: center;
  background: #ebebeb;
`);

const Content = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${theme.spacing(4)};
  padding: ${theme.spacing(5)};
  max-width: 820px;
`);

const StickyHeader = styled('div')(({ theme }) => `
  display: flex;
  justify-content: center;
  width: 40vw;
  height: 100%;
  position: fixed;
  background: ${theme.palette.primary.light};
  min-width: 400px;
`);

const StickyHeaderSpacer = styled('div')(({ theme }) => `
  display: block;
  width: 40vw;
  min-width: 400px;
`);

export const Layout: React.FC = ({ children }) => (
  <Wrapper>
    <StickyHeader>
      <Header />
    </StickyHeader>
    <StickyHeaderSpacer />
    <ContentWrapper>
      <Content>
        {children}
      </Content>
    </ContentWrapper>
  </Wrapper>
)