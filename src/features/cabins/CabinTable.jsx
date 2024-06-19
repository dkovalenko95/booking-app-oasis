import { useSearchParams } from 'react-router-dom';
import Menus from '../../ui/Menus';
import Spinner from '../../ui/Spinner';
import Table from '../../ui/Table';
import Empty from '../../ui/Empty';
import CabinRow from './CabinRow';
import { useFetchCabins } from './hooks/useFetchCabins';

function CabinTable() {
  const { isLoading, cabins } = useFetchCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />

  if (!cabins.length) return <Empty resource='cabins' />

  // Filter
  const filterValue = searchParams.get('discount') || 'all';
  let filteredCabins;
  if (filterValue === 'all') filteredCabins = cabins
  if (filterValue === 'no-discount') filteredCabins = cabins.filter((c) => c.discount === 0);
  if (filterValue === 'with-discount') filteredCabins = cabins.filter((c) => c.discount > 0);

  // Sort
  const sortBy = searchParams.get('sortBy') || 'created_at-asc';
  const [field, direction] = sortBy.split('-');
  const modifier = direction === 'asc' ? 1 : -1;
  
  let sortedCabins = filteredCabins;
  if (field === 'name') sortedCabins = filteredCabins?.sort((a, b) => a.name.localeCompare(b.name) * modifier);
  if (field === 'created_at') filteredCabins?.sort((a, b) => (Number(new Date(a.created_at)) - Number(new Date(b.created_at))) * modifier);
  else filteredCabins?.sort((a, b) => (a[field] - b[field]) * modifier);

  return (
    // Compound Component Pattern
    <Menus>
      <div style={{ overflowX: 'auto' }}>
        <Table columns='0.6fr 1.8fr 2.2fr 1fr 1fr 1fr'>
          <Table.Header>
            <div></div>
            <div>Cabin</div>
            <div>Capacity</div>
            <div>Price</div>
            <div>Discount</div>
            <div></div>
          </Table.Header>

          {/* Render Props Pattern */}
          <Table.Body
            // data={cabins}
            // data={filteredCabins}
            data={sortedCabins}
            render={(cabin) => (
              <CabinRow cabin={cabin} key={cabin.id} />
              )}
          />
        </Table>
      </div>
    </Menus>
  );
}

export default CabinTable;



// NOTE: EXTRACTED IN HOOK
// const { isLoading, data: cabins, error } = useQuery({
//   queryKey: ['cabins'],
//   queryFn: getCabins,
// });

// NOTE: BEFORE COMPOUND PATTERN
// return (
//   <Table role='table'>
//     <TableHeader role='row'>
//       <div></div>
//       <div>Cabin</div>
//       <div>Capacity</div>
//       <div>Price</div>
//       <div>Discount</div>
//       <div></div>
//     </TableHeader>
//     {cabins.map((cabin) => (
//       <CabinRow cabin={cabin} key={cabin.id} />
//     ))}
//   </Table>
// );

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;
