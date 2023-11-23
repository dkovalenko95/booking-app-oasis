import styled from 'styled-components';

export const StyledRootLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
`;

export const Main = styled.main`
background-color: var(--color-grey-50);
padding: 4rem 4.8rem 6.4rem;
`;
