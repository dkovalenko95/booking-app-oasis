import Button from '../../ui/Button';
import CreateCabinForm from './CreateCabinForm';
import Modal from '../../ui/Modal';

function AddCabin() {

  return (
    <Modal>
      <Modal.Open opens='cabin-form'>
        <Button>Add new cabin</Button>
      </Modal.Open>

      <Modal.Window name='cabin-form'>
        <CreateCabinForm />
      </Modal.Window>
    </Modal>
  );
};

export default AddCabin;

// function AddCabin() {
//   const [isOpenModal, setIsOpenModal] = useState(false);

//   return (
//     <>
//       <Button onClick={() => setIsOpenModal((prevShow) => !prevShow)}>{!isOpenModal ? 'Add new cabin' : 'Cancel'}</Button>
//       {isOpenModal &&
//         <Modal onClose={() => setIsOpenModal(false)}>
//           <CreateCabinForm onCloseModal={() => setIsOpenModal(false)} />
//         </Modal>
//       }
//     </>
//   );
// }
