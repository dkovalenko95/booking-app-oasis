import styled, { css } from 'styled-components';
import { devices } from '../utils/devices';

const Form = styled.form`
  ${(props) =>
    props.$type === 'regular' &&
    css`
      width: 100%;
      max-width: 90rem; 
      padding: 2.4rem 4rem;

      /* Box */
      background-color: var(--color-grey-0);
      border: 1px solid var(--color-grey-100);
      border-radius: var(--border-radius-md);

      @media ${devices.md} {
        padding: 1.8rem 2rem;
      }

      @media ${devices.xs} {
        padding: 1.2rem 1.6rem;
      }

      @media ${devices.xxs} {
        padding: 1rem 1.2rem;
      }
    `}

  ${(props) =>
    props.$type === 'modal' &&
    css`
      width: 80rem;

      @media ${devices.lg} {
        width: 60rem;
      }

      @media ${devices.md} {
        width: 45rem;
      }

      @media ${devices.sm} {
        width: 38rem;
      }

      @media ${devices.xs} {
        width: 25rem;
      }

      @media ${devices.xxs} {
        width: 21rem;
      }
    `}
    
  overflow: hidden;
  font-size: 1.4rem;
`;

Form.defaultProps = {
  $type: 'regular',
  // 'regular' || 'modal'
};

export default Form;
