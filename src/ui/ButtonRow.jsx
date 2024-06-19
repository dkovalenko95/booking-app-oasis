import styled from 'styled-components';
import { devices } from '../utils/devices';

const ButtonRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;

  @media ${devices.xxs} {
    flex-direction: column;
  }
`;

export default ButtonRow;