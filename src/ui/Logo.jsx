import styled from 'styled-components';
import { useDarkMode } from '../context/DarkModeContext';

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo({ setOpen }) {
  const { darkMode } = useDarkMode();

  const srcLogoPath = darkMode ? '/logo-dark.png' : '/logo-light.png';

  return (
    <StyledLogo onClick={() => setOpen(false)}>
      <Img src={srcLogoPath} alt='Logo' />
    </StyledLogo>
  );
}

export default Logo;
