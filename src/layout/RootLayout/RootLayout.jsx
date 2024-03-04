import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { StyledRootLayout, Main, Container } from './RootLayout.styled';
import { useState } from 'react';

function RootLayout() {
  const [open, setOpen] = useState(false);

  return (
    <StyledRootLayout>
      <Header open={open} setOpen={setOpen} />
      <Sidebar open={open} setOpen={setOpen} />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledRootLayout>
  );
}

export default RootLayout;
