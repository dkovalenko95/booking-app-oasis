import { Uploader } from '../../data/Uploader';
import Logo from '../../ui/Logo';
import MainNav from '../MainNav/MainNav';
import { StyledSidebar } from './Sidebar.styled';

function Sidebar() {
  return (
    <StyledSidebar>
      <Logo />
      <MainNav />

      <Uploader />
    </StyledSidebar>
  );
}

export default Sidebar;
