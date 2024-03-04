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

function ConfirmDelete({ resourceName, onConfirm, disabled, onCloseModal }) {
  return (
    <StyledConfirmDelete>
      <Heading type='h3'>Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This action
        cannot be undone.
      </p>

      <div>
        <Button $variation='secondary' onClick={() => onCloseModal?.()}>
          Cancel
        </Button>
        <Button
          $variation='danger'
          onClick={onConfirm}
          disabled={disabled}
        >
          Delete
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;

// NOTE: About onCloseModal prop -> look at Modal.jsx - cloneElement() in Window comp
// Since <ConfirmDelete /> is a child comp in this case of Modal -> it'll automatically receive the 'onCloseModal' modal prop.
// Clone certain child elem and inject func in there - {cloneElement(children, { onCloseModal: () => close() })}. 
// As result -> have access to that func via prop -> can use onClick onCloseModal.
