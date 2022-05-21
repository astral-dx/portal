import type { NextPage } from 'next';
import { withPageAuthRequired, References, Credentials, PortalTeam } from '@astral-dx/core';
import { styled } from '@mui/material';

const Container = styled('div')(({ theme }) => `
  display: flex;
  gap: ${theme.spacing(3)};
`);

const Main = styled('main')(({ theme }) => `
  flex-basis: 60%;
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing(3)};
`);

const SideBar = styled('nav')(({ theme }) => `
  flex-basis: 40%;
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
