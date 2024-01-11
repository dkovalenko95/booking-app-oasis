import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import BookingDataBox from './BookingDataBox';
import Row from '../../ui/Row';
import Heading from '../../ui/Heading';
import Tag from '../../ui/Tag';
import ButtonGroup from '../../ui/ButtonGroup';
import Button from '../../ui/Button';
import ButtonText from '../../ui/ButtonText';
import Spinner from '../../ui/Spinner';
import { useMoveBack } from '../../hooks/useMoveBack';
import { useFetchBooking } from './hooks/useFetchBooking';
import { useCheckout } from '../check-in-out/hooks/useCheckout';
import { useDeleteBooking } from './hooks/useDeleteBooking';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const { booking, isLoading } = useFetchBooking();
  const { checkout, isCheckingOut } = useCheckout();
  const { deleteBooking, isDeletingBooking } = useDeleteBooking();
  
  if (isLoading) return <Spinner />
  
  const { status, id: bookingId } = booking;

  const statusToTagName = {
    unconfirmed: 'blue',
    'checked-in': 'green',
    'checked-out': 'silver',
  };

  return (
    <>
      <Row $type='horizontal'>
        <HeadingGroup>
          <Heading as='h1'>Booking #{bookingId}</Heading>
          <Tag $type={statusToTagName[status]}>{status.replace('-', ' ')}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        <Modal>
          <Modal.Open opens='deleteBooking'>
            <Button
              $variation='danger'
            >
              Delete
            </Button>
          </Modal.Open>

          <Modal.Window name='deleteBooking'>
            <ConfirmDelete
              resourceName={`#${bookingId} booking`}
              disabled={isDeletingBooking}
              onConfirm={() => {
                deleteBooking(bookingId, { onSettled: () => navigate(`/bookings`) });
              }}
            />
          </Modal.Window>
        </Modal>

        {status === 'unconfirmed' &&
          <Button
            onClick={() => navigate(`/checkin/${bookingId}`)}
          >
            Check in
          </Button>
        }

        {status === 'checked-in' &&
          <Button
            onClick={() => checkout(bookingId)}
            disabled={isCheckingOut}
          >
            Check out
          </Button>
        }

        <Button
          $variation='secondary'
          onClick={moveBack}
        >
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default BookingDetail;
