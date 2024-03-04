import styled, { css } from 'styled-components';
import { devices } from '../utils/devices';

// const test = css`
//   text-align: center;
//   ${10 > 5 && 'background-color: yellow'}
// `;

const Heading = styled.h1`
  ${(props) =>
    props.as === 'h1' &&
    css`
      font-size: 3rem;
      font-weight: 600;

      @media ${devices.xl} {
        font-size: 2.6rem;
      }

      @media ${devices.xl} {
        font-size: 2.5rem;
      }

      @media ${devices.md} {
        font-size: 2.4rem;
      }

      @media ${devices.sm} {
        font-size: 1.8rem;
      }
  `}

  ${(props) =>
    props.as === 'h2' &&
    css`
      font-size: 2rem;
      font-weight: 600;
  `}
    
  ${(props) =>
    props.as === 'h3' &&
    css`
      font-size: 2rem;
      font-weight: 500;
  `}

  ${(props) =>
    props.as === 'h4' &&
    css`
      font-size: 3rem;
      font-weight: 600;
      text-align: center;
  `}
    
  line-height: 1.4;

  @media ${devices.lg} {
    font-size: 2.8rem;
  }

  @media ${devices.sm} {
    font-size: 2.4rem;
  }
`;

export default Heading;
