import styled from 'styled-components';
import { devices } from '../../utils/devices';

export const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 1px solid var(--color-grey-100);
  display: flex;
  gap: 2.4rem;
  align-items: center;
  justify-content: end;

  @media ${devices.xs} {
    padding: 1.2rem 2.4rem;
    gap: 1.5rem;
  }

  @media ${devices.xxs} {
    padding: 1.2rem;
    gap: 1rem;
  }
`;
