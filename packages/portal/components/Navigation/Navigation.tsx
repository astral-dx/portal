import { Paper, styled, Typography } from "@mui/material"
import React from "react";

import { usePlatformConfig } from "../../hooks/usePlatformConfig";
import { NavigationItem } from "./NavigationItem";
import { NavigationSection } from "./NavigationSection";

const Wrapper = styled(Paper)(({ theme }) => `
  /* background-color: ${theme.palette.background.paper}; */
  height: 100vh;
  width: 33.333vw;
  padding: ${theme.spacing(2)};
  overflow-y: auto;
`);

const TitleWrapper = styled('div')(({ theme }) => `
  margin-top: ${theme.spacing(1)};
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(2)};
  align-items: center;
`);

const Logo = styled('img')(({ theme }) => `
  height: 30px;
  padding-bottom: ${theme.spacing(0.5)};
`);

const Title = styled(Typography)(({ theme }) => `
  font-weight: 800;
  padding-bottom: ${theme.spacing(2)};
`);

const Content = styled('div')(({ theme }) => `
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(1)};
`);

export const Navigation: React.FC = () => {
  const { name, logo } = usePlatformConfig();

  return (
    <Wrapper square>
      <TitleWrapper>
        { logo && <Logo src={logo} /> }
        <Title>{name === '' ? 'Developer Plaftorm' : name}</Title>
      </TitleWrapper>
      <Content>
        <NavigationSection title={'API'}>
          <NavigationItem title={'API Credentials'} href="/" />
          <NavigationItem title={'Customization'} />
          <NavigationItem title={'Usage Metrics'} />
          <NavigationItem title={'Environments'} />
        </NavigationSection>
        <NavigationSection title={'Reference'}>
          <NavigationItem title={'Documentation'} />
          <NavigationItem title={'Change Log'} />
          <NavigationItem title={'System Status'} />
          <NavigationItem title={'Roadmap'} />
          <NavigationItem title={'Support'} />
        </NavigationSection>
        <NavigationSection title={'Account'}>
          <NavigationItem title={'Profile'} />
          <NavigationItem title={'Team Members'} />
        </NavigationSection>
      </Content>
    </Wrapper>
  )
}