import type { NextPage } from 'next';
import { withPageAuthRequired, References } from '@astral-dx/core';
import { styled } from '@mui/material';

const Container = styled('div')(({ theme }) => `
  display: flex;
`);

const Main = styled('main')(({ theme }) => `
  flex-basis: 60%;
`);

const SideBar = styled('nav')(({ theme }) => `
  flex-basis: 40%;
`);

const Dashboard: NextPage = () => {
  return (
    <Container>
      <Main></Main>
      <SideBar>
        <References />
      </SideBar>
    </Container>
  )
}

export const getServerSideProps = withPageAuthRequired({ redirectTo: '/unauthorized', permissions: [] });

export default Dashboard
