import styled, { css } from 'styled-components';
import { devices } from '../utils/devices';

const Row = styled.div`
  display: flex;

  @media ${devices.xs} {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    align-items: center;
    justify-content: center;
  }

  ${(props) =>
    props.$type === 'horizontal' &&
    css`
      justify-content: space-between;
      align-items: center;
    `}

  ${(props) =>
    props.$type === 'vertical' &&
    css`
      flex-direction: column;
      gap: 1.6rem;
    `}
`;

Row.defaultProps = {
  $type: 'vertical',
};

export default Row;
