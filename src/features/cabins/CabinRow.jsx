import { useState } from 'react';
import { formatCurrency } from '../../utils/helpers';
import styled from 'styled-components';
import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './hooks/useDeleteCabin';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

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
  const { id: cabinId, name, maxCapacity, regularPrice, discount, image } = cabin;

  const [showForm, setShowForm] = useState(false);

  // Delete cabin
  const { deleteCabin, isDeleting } = useDeleteCabin();

  return (
    <>
      <TableRow role='row'>
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span style={{ textAlign: 'center' }}>&mdash;</span>}
        <div>
          <button onClick={() => setShowForm((prevShow) => !prevShow)}>{!showForm ? 'Edit' : 'Cancel Edit'}</button>
          <button onClick={() => deleteCabin(cabinId)} disabled={isDeleting}>Delete</button>
        </div>
      </TableRow>
      {showForm && <CreateCabinForm setShowForm={setShowForm} cabinToEdit={cabin} />}
    </>
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
