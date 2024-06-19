import styled from 'styled-components';
import { devices } from '../utils/devices';

const TableOperations = styled.div`
  display: flex;
  /* justify-content: right; */
  align-items: center;
  gap: 1.6rem;

  @media ${devices.xl} {
    gap: 1.4rem;
  }

  @media ${devices.lg} {
    flex-direction: column;
    gap: 1.2rem;
    justify-content: center;
    align-items: center;
  }
`;

export default TableOperations;
