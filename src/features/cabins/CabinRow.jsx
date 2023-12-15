import { HiSquare2Stack, HiPencil, HiTrash } from 'react-icons/hi2';
import { formatCurrency } from '../../utils/helpers';
import styled from 'styled-components';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './hooks/useDeleteCabin';
import { useCreateCabin } from './hooks/useCreateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';
import Table from '../../ui/Table';
import Menus from '../../ui/Menus';

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

function CabinRow({ cabin }) {
  const { id: cabinId, name, maxCapacity, regularPrice, discount, description, image } = cabin;

  // Duplicate cabin
  const { createCabin, isCreating } = useCreateCabin();

  const duplicateHandler = () => {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      description,
      image,
    })
  }

  // Delete cabin
  const { deleteCabin, isDeleting } = useDeleteCabin();

  return (
    <Table.Row>
      <Img src={image} />
      <Cabin>{name}</Cabin>
      <div>Fits up to {maxCapacity} guests</div>
      <Price>{formatCurrency(regularPrice)}</Price>
      {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

      <div>
        <Modal>
          <Menus.Menu>
            <Menus.Toggle id={cabinId} />

            <Menus.List id={cabinId}>
              <Menus.Button icon={<HiSquare2Stack />} onClick={duplicateHandler}>
                Duplicate
              </Menus.Button>

              <Modal.Open opens='edit'>
                <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
              </Modal.Open>

              <Modal.Open opens='delete'>
                <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
              </Modal.Open>
            </Menus.List>

            <Modal.Window name='edit'>
              <CreateCabinForm cabinToEdit={cabin} />
            </Modal.Window>

            <Modal.Window name='delete'>
              <ConfirmDelete
                resourceName='cabins'
                disabled={isDeleting}
                onConfirm={() => deleteCabin(cabinId)}
              />
            </Modal.Window>
          </Menus.Menu>
        </Modal>
      </div>

      
    </Table.Row>
  );
}

export default CabinRow;



// EXTRACTED IN HOOK
// const queryClient = useQueryClient();
// // Delete cabin
// const { mutate, isPending, isSuccess } = useMutation({
//   mutationFn: deleteCabin,

//   onSuccess: () => {
//     toast.success('Cabin successfully deleted');

//     queryClient.invalidateQueries({
//       queryKey: ['cabins'],
//     }); // allow to mark queries as stale and potentially refetch data
//   }, // called after successful mutation

//   onError: (error) => toast.error(error.message), // err from muatation func deleteCabin
// });

// BEFORE COMPOUND PATTERN
// const TableRow = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 1.4rem 2.4rem;

//   &:not(:last-child) {
//     border-bottom: 1px solid var(--color-grey-100);
//   }
// `;


// COMPOUND PATTERN - before modal + menu
{/* <div>
  <button onClick={duplicateHandler} disabled={isCreating}>
    <HiSquare2Stack />
  </button>

  <Modal>
    <Modal.Open opens='edit'>
      <button>
        <HiPencil />
      </button>
    </Modal.Open>
    <Modal.Window name='edit'>
      <CreateCabinForm cabinToEdit={cabin} />
    </Modal.Window>

    <Modal.Open opens='delete'>
      <button>
        <HiTrash />
      </button>
    </Modal.Open>
    <Modal.Window name='delete'>
      <ConfirmDelete resource='cabins' disabled={isDeleting} onConfirm={() => deleteCabin(cabinId)} />
    </Modal.Window>
  </Modal>

  <Menus.Menu>
    <Menus.Toggle id={cabinId} />

    <Menus.List id={cabinId}>
      <Menus.Button icon={<HiSquare2Stack />} onClick={duplicateHandler}>Duplicate</Menus.Button>
      <Menus.Button icon={<HiPencil />}>Edit</Menus.Button>
      <Menus.Button icon={<HiTrash />}>Delete</Menus.Button>
    </Menus.List>
  </Menus.Menu>
</div> */}
