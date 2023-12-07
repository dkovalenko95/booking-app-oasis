import { useState } from 'react';
import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

function AddCabin() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpenModal((prevShow) => !prevShow)}>{!isOpenModal ? 'Add new cabin' : 'Cancel'}</Button>
      {isOpenModal && <Modal /> /* <CreateCabinForm setShowForm={setIsOpenModal} /> */}
    </>
  );
}

export default AddCabin;
