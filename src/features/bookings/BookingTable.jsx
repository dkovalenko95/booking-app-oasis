import BookingRow from './BookingRow';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';
import Empty from '../../ui/Empty';
import Spinner from '../../ui/Spinner';
import { useFetchBookings } from './hooks/useFetchBookings';
import Pagination from '../../ui/Pagination';

function BookingTable() {
  const { bookings, isLoading, count } = useFetchBookings();

  if (isLoading) return <Spinner />;
  
  if (!bookings.length) return <Empty resource='bookings' />;
  
  return (
    <Menus>
      <div style={{ overflowX: 'auto' }}>
        {/* <Table columns='0.4fr 2fr 20rem 0.8fr 1fr 3.2rem'> */}
        <Table columns='0.6fr 1.8fr 2.4fr 1.4fr 1fr 3.2rem'>
          <Table.Header>
            <div>Cabin</div>
            <div>Guest</div>
            <div>Dates</div>
            <div>Status</div>
            <div>Amount</div>
            <div></div>
          </Table.Header>

          <Table.Body
            data={bookings}
            render={(booking) => (
              <BookingRow key={booking.id} booking={booking} />
            )}
          />

          <Table.Footer>
            <Pagination numResults={count} />
          </Table.Footer>
        </Table>
      </div>
    </Menus>
  );
}

export default BookingTable;
