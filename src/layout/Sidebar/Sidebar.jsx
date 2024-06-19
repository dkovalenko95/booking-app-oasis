import Logo from '../../ui/Logo';
import MainNav from '../MainNav/MainNav';
import { StyledSidebar } from './Sidebar.styled';
import { useOutsideClick } from '../../hooks/useOutsideClick';

function Sidebar({ open, setOpen }) {
  const { ref } = useOutsideClick(() => setOpen(false), false);

  return (
    <StyledSidebar ref={ref} open={open}>
      <Logo setOpen={setOpen} />
      <MainNav setOpen={setOpen} />
    </StyledSidebar>
  );
}

export default Sidebar;
