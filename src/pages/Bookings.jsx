import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';
import AddBooking from '../features/bookings/AddBooking';
import Heading from '../ui/Heading';
import Row from '../ui/Row';

function Bookings() {
  return (
    <>
      <Row $type='horizontal'>
        <Heading as='h1'>Bookings</Heading>
        <BookingTableOperations />
      </Row>
      <BookingTable />
      <AddBooking />
    </>
  );
}

export default Bookings;
