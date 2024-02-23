import styled, { keyframes } from 'styled-components';

const ellipsisAnimation1 = keyframes`
  0% {
    transform: scale(0);
  }
  100% {
    transform: scale(1);
  }
`;

const ellipsisAnimation2 = keyframes`
  0% {
    transform: translate(0, 0);
  }
  100% {
    transform: translate(1.8rem, 0);
  }
`;

const ellipsisAnimation3 = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const StyledEllipsis = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  position: relative;
  width: 2rem;
  height: 4rem;

  div {
    position: absolute;
    width: 0.8rem;
    height: 0.8rem;
    border-radius: 50%;
    background: var(--color-grey-700);
    animation-timing-function: cubic-bezier(0, 1, 1, 0);
  }

  div:nth-child(1) {
    left: 0.6rem;
    animation: ${ellipsisAnimation1} 0.7s infinite;
  }

  div:nth-child(2) {
    left: 0.6rem;
    animation: ${ellipsisAnimation2} 0.7s infinite;
  }

  div:nth-child(3) {
    left: 2.4rem;
    animation: ${ellipsisAnimation2} 0.7s infinite;
  }

  div:nth-child(4) {
    left: 4.2rem;
    animation: ${ellipsisAnimation3} 0.7s infinite;
  }
`;

function DottedLoader() {
  return (
    <StyledEllipsis>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </StyledEllipsis>
  );
}

export default DottedLoader;
