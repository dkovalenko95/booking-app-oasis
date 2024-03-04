import HeaderMenu from '../../ui/HeaderMenu';
import UserAvatar from '../../features/authentication/UserAvatar';
import { StyledHeader } from './Header.styled';
import Burger from '../../ui/Burger';

function Header({ open, setOpen }) {
  return <StyledHeader>
    <Burger open={open} setOpen={setOpen} />
    <UserAvatar />
    <HeaderMenu />
  </StyledHeader>;
}

export default Header;
