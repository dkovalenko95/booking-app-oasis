import styled from 'styled-components';
import { devices } from '../../utils/devices';

export const StyledRootLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;

  @media ${devices.xxl} {
    grid-template-columns: 22rem 1fr;
  }

  @media ${devices.xl} {
    grid-template-columns: 20rem 1fr;
  }

  @media ${devices.lg} {
    grid-template-columns: 18rem 1fr;
  }

  @media ${devices.md} {
    display: flex;
    flex-direction: column;
  }
`;

export const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
  /* overflow-y: scroll; */
  overflow-y: auto;

  height: 100%;
  
  @media ${devices.xxl} {
    padding: 3rem 3.6rem 4.8rem;
  }

  @media ${devices.xl} {
    padding: 2rem 2.2rem 3.2rem;
  }

  @media ${devices.sm} {
    padding: 1.8rem 1.8rem 2.4rem;
  }
`;

export const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  @media ${devices.md} {
    gap: 2rem;
  }
`;
