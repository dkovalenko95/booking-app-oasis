import { useSearchParams } from 'react-router-dom';
import Select from './Select';

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const sortBy = searchParams.get('sortBy') || '';

  const changeHandler = (e) => {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  };

  return (
    <Select
      id='sort-bookings'
      $type='white'
      options={options}
      currActiveValue={sortBy}
      onChange={changeHandler}
    />
  );
}

export default SortBy;
