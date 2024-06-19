import styled from 'styled-components';
import { FaFileCircleCheck } from 'react-icons/fa6';

const StyledConfirmedHint = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  color: var(--color-green-700);
  font-weight: 500;
`;

function ConfirmHint({ children }) {
  return (
    <StyledConfirmedHint>
      { children }
      <FaFileCircleCheck />
    </StyledConfirmedHint>
  );
}

export default ConfirmHint;
