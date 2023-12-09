import styled from 'styled-components';
import Button from './Button';
import Heading from './Heading';

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

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

function ConfirmDelete({ resource, onConfirm, disabled, closeModal }) {
  return (
    <StyledConfirmDelete>
      <Heading type='h3'>Delete {resource}</Heading>
      <p>
        Are you sure you want to delete this {resource} permanently? This action
        cannot be undone.
      </p>

      <div>
        <Button $variation='secondary' onClick={closeModal}>
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

// NOTE: About onCloseModal prop -> look at Modal.jsx - cloneElement in Window comp
// Since this is a child component now of the modal window, it'll automatically receive the onClose modal prompt, right? So that's what we have been talking about all this time where, remember, we clone this element and inject that function in there. So, giving it this onClose modal prompt. And so now that will be created inside confirmDelete. So here we have now access to that. And so we can say onClick onCloseModal.
