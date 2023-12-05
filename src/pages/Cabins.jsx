import Heading from '../ui/Heading';
import Row from '../ui/Row';
import CabinTable from '../features/cabins/CabinTable';
import Button from '../ui/Button';
import { useState } from 'react';
import CreateCabinForm from '../features/cabins/CreateCabinForm';

function Cabins() {
  const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type='horizontal'>
        <Heading as='h1'>All cabins</Heading>
        <p>Filter / Sort</p>
      </Row>
      <Row>
        <CabinTable />

        {showForm && <CreateCabinForm setShowForm={setShowForm} />}
        <Button onClick={() => setShowForm((prevShow) => !prevShow)}>{!showForm ? 'Add new cabin' : 'Cancel'}</Button>
      </Row>
    </>
  );
}

export default Cabins;
