import styled from 'styled-components';
import Button from './Button';
import Heading from './Heading';
import { devices } from '../utils/devices';

const StyledConfirmDelete = styled.div`
  /* width: 40rem; */
  min-width: 40rem;
  max-width: 60rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  @media ${devices.sm} {
    min-width: 35rem;
  }

  @media ${devices.xs} {
    min-width: 25rem;
  }

  @media ${devices.xxs} {
    min-width: 20rem;
  }

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmAction({ action, resourceName, onConfirm, disabled, onCloseModal }) {
  const actionCapitalize = action.charAt(0).toUpperCase() + action.slice(1);
  return (
    <StyledConfirmDelete>
      <Heading type='h3'>{actionCapitalize} {resourceName}</Heading>
      <p>
        Are you sure you want to {action} this {resourceName}?
      </p>

      <div>
        <Button $variation='secondary' onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button
          $variation='primary'
          onClick={() => {
            onConfirm();
            onCloseModal?.();
          }}
          disabled={disabled}
        >
          {actionCapitalize}
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmAction;
