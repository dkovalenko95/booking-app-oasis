
import BookingTable from '../features/bookings/BookingTable';
import BookingTableOperations from '../features/bookings/BookingTableOperations';
import AddBooking from '../features/bookings/AddBooking';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CountrySelector from '../features/bookings/countryPicker/CountrySelector';
import { useState } from 'react';
import { COUNTRIES } from '../features/bookings/countryPicker/countries';
import { getCountriesWithFlags } from '../services/apiBookings';
import { useFetchCountries } from '../features/bookings/countryPicker/useFetchCountries';
import Spinner from '../ui/Spinner';

function Bookings() {
  const [isOpen, setIsOpen] = useState(false);
  // Default this to a country's code to preselect it
  const [country, setCountry] = useState('GB');

  // async function fetchData() {
  //   const updatedCountries = await getCountriesWithFlags(COUNTRIES);
  //   console.log(updatedCountries);
  // };
  // fetchData();

  // const { countries, isLoading } = useFetchCountries();

  // if (isLoading) return <Spinner />;

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
        selectedValue={country}
        // selectedValue={countries.find((option) => option.value === country)}
      />

      <BookingTable />

      <AddBooking />
    </>
  );
}

export default Bookings;
