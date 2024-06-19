import styled from 'styled-components';
import { devices } from '../../utils/devices';

export const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-100);

  grid-row: 1 / -1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  transition: transform 0.3s ease-in-out;
  
  @media ${devices.xl} {
    padding: 3.2rem 1.8rem;
  }
  
  @media ${devices.lg} {
    padding: 3.2rem 1.8rem;
  }
  
  @media ${devices.md} {
    z-index: 100;
    height: 100%;
    position: absolute;
    width: 50%;
    transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  }

  @media ${devices.sm} {
    width: 65%;
  }

  @media ${devices.xs} {
    width: 70%;
  }

  @media ${devices.xxs} {
    width: 80%;
  }
`;
