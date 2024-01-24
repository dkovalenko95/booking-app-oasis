import styled from 'styled-components';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import CreateBookingForm from './CreateBookingForm';

const AddBookingContainer = styled.div`
  align-self: end;
`;

function AddBooking() {
  return (
    <AddBookingContainer>
      <Modal>
        <Modal.Open opens='booking-form'>
          <Button>Add new booking</Button>
        </Modal.Open>

        <Modal.Window name='booking-form'>
          <CreateBookingForm />
        </Modal.Window>
      </Modal>
    </AddBookingContainer>
  );
}

export default AddBooking;
