import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import SpinnerMini from '../../ui/SpinnerMini';
import { useLogout } from './hooks/useLogout';

function Logout() {
  const { logout, isLogginOut } = useLogout();

  return (
    <ButtonIcon disabled={isLogginOut} onClick={logout}>
      {!isLogginOut ? <HiArrowRightOnRectangle /> : <SpinnerMini />}
    </ButtonIcon>
  );
}

export default Logout;
