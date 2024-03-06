import { useRef, useState } from 'react';
import styled from 'styled-components';
import Modal from '../../ui/Modal';
import Button from '../../ui/Button';
import CreateGuestForm from './CreateGuestForm';
import CreateBookingForm from './CreateBookingForm';

const AddBookingContainer = styled.div`
  align-self: end;
`;

function AddBooking() {
  // NOTE: RENDER COUNT
  // const renderCount = useRef(0);
  // // Increment the render count on each render
  // renderCount.current += 1;
  // console.log('Render count ADD BOOKING:', renderCount.current);

  // Confirm selected/create guest for booking form
  const [createdGuest, setCreatedGuest] = useState(null);

  const handleCreatedGuestData = (data) => {
    setCreatedGuest(data);
  };

  return (
    <AddBookingContainer>
      <Modal>
        <Modal.Open opens='booking-form'>
          <Button>Add new booking</Button>
        </Modal.Open>

        <Modal.Window name='booking-form'>
          {!createdGuest
            ? <CreateGuestForm setCreatedGuestData={handleCreatedGuestData} />
            : <CreateBookingForm createdGuest={createdGuest} setCreatedGuestData={handleCreatedGuestData} />
          }
        </Modal.Window>
      </Modal>
    </AddBookingContainer>
  );
}

export default AddBooking;
