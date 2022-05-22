import type { NextPage } from 'next';
import { withPageAuthRequired, References, Credentials, PortalTeam, Profile } from '@astral-dx/core';
import { styled } from '@mui/material';

const Container = styled('div')(({ theme }) => `
  display: flex;
  gap: ${theme.spacing(6)};
`);

const Main = styled('main')(({ theme }) => `
  flex-basis: 67%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(6)};
`);

const SideBar = styled('nav')(({ theme }) => `
  flex-basis: 33%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(6)};
`);

const Dashboard: NextPage = () => {
  return (
    <Container>
      <Main>
        <Credentials />
        <PortalTeam />
      </Main>
      <SideBar>
        <References />
      </SideBar>
    </Container>
  )
}

export const getServerSideProps = withPageAuthRequired({ redirectTo: '/unauthorized', permissions: [] });

export default Dashboard
