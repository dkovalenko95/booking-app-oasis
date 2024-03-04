import styled from 'styled-components';
import { devices } from '../utils/devices';

const StyledBurger = styled.button`
  /* top: 5%; */
  position: absolute;
  left: 2rem;
  display: none;
  flex-direction: column;
  justify-content: space-around;
  width: 2rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 200;
  
  &:focus {
    outline: none;
  }
  
  div {
    width: 2rem;
    height: 0.25rem;
    background: var(--color-grey-700);
    border-radius: 10px;
    transition: all 0.3s linear;
    position: relative;
    transform-origin: 1px;

    &:first-child {
      transform: ${({ open }) => open ? 'rotate(45deg)' : 'rotate(0)'};
    }

    &:nth-child(2) {
      opacity: ${({ open }) => open ? '0' : '1'};
      transform: ${({ open }) => open ? 'translateX(20px)' : 'translateX(0)'};
    }

    &:nth-child(3) {
      transform: ${({ open }) => open ? 'rotate(-45deg)' : 'rotate(0)'};
    }
  }

  @media ${devices.md} {
    display: flex;
  }
`;

function Burger({ open, setOpen }) {
  const handleClick = (event) => {
    event.stopPropagation(); // Stop event propagation
    setOpen(!open);
  };

  return (
    <StyledBurger open={open} onClick={handleClick}>
      <div />
      <div />
      <div />
    </StyledBurger>
  );
}

export default Burger;
