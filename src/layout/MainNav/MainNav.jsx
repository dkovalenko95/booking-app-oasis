import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHome,
  HiOutlineHomeModern,
  HiOutlineUsers,
} from 'react-icons/hi2';
import { StyledNavLink, NavList } from './MainNav.styled';

function MainNav({ setOpen }) {
  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink onClick={() => setOpen(false)} to='/dashboard'>
            <HiOutlineHome />
            <span>Home</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink onClick={() => setOpen(false)} to='/bookings'>
            <HiOutlineCalendarDays />
            <span>Bookings</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink onClick={() => setOpen(false)} to='/cabins'>
            <HiOutlineHomeModern />
            <span>Cabins</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink onClick={() => setOpen(false)} to='/users'>
            <HiOutlineUsers />
            <span>Users</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink onClick={() => setOpen(false)} to='/settings'>
            <HiOutlineCog6Tooth />
            <span>Settings</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}

export default MainNav;
