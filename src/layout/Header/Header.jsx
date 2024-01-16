import Logout from '../../features/authentication/Logout';
import { StyledHeader } from './Header.styled';

function Header() {
  return <StyledHeader>
    <Logout />
  </StyledHeader>;
}

export default Header;
