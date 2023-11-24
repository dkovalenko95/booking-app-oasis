import { Outlet } from 'react-router-dom';
import Sidebar from '../Sidebar/Sidebar';
import Header from '../Header/Header';
import { StyledRootLayout, Main, Container } from './RootLayout.styled';

function RootLayout() {
  return (
    <StyledRootLayout>
      <Header />
      <Sidebar />
      <Main>
        <Container>
          <Outlet />
        </Container>
      </Main>
    </StyledRootLayout>
  );
}

export default RootLayout;
