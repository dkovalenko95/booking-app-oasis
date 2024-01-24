
import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';
import AddBooking from '../features/bookings/AddBooking';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CountrySelector from '../features/bookings/countryPicker/CountrySelector';
import { useState } from 'react';
import { COUNTRIES } from '../features/bookings/countryPicker/countries';

function Bookings() {
  const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [country, setCountry] = useState('GB');

  return (
    <>
      <Row $type='horizontal'>
        <Heading as='h1'>All bookings</Heading>
        <BookingTableOperations />
      </Row>

      <CountrySelector
        id='country-selector'
        open={isOpen}
        onToggle={() => setIsOpen(!isOpen)}
        onChange={setCountry}
        selectedValue={COUNTRIES.find((option) => option.value === country)}
      />

      <BookingTable />

      <AddBooking />
    </>
  );
}

export default Bookings;
