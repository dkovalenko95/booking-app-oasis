import HeaderMenu from '../../ui/HeaderMenu';
import UserAvatar from '../../features/authentication/UserAvatar';
import { StyledHeader } from './Header.styled';

function Header() {
  return <StyledHeader>
    <UserAvatar />
    <HeaderMenu />
  </StyledHeader>;
}

export default Header;
