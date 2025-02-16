import { useSearchParams } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { devices } from '../utils/devices';

const StyledFilter = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;

  @media ${devices.xxs} {
    max-width: 25rem;
    padding: 0.3rem;
    gap: 0.3rem;
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const FilterButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;
  width: max-content;

  ${(props) =>
    props.$active &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  /* To give the same height as select */
  padding: 0.44rem 0.8rem;
  transition: all 0.3s;

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }

  @media ${devices.xs} {
    font-size: 1.3rem;
  }
`;

function Filter({ filterField, options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currFilter = searchParams.get(filterField) || options.at(0).value;

  const clickHandler = (value) => {
    searchParams.set(filterField, value);
    if (searchParams.get('page')) searchParams.set('page', 1); // reset page query if filter applied
    setSearchParams(searchParams);
  };
  
  return (
    <StyledFilter>
      {options.map(option => (
        <FilterButton
          key={option.value}
          onClick={() => clickHandler(option.value)}
          $active={option.value === currFilter}
          disabled={option.value === currFilter}
        >
          {option.label}
        </FilterButton>  
      ))}
    </StyledFilter>
  );
}

export default Filter;



// <FilterButton onClick={() => clickHandler('all')}>All</FilterButton>
// <FilterButton onClick={() => clickHandler('no-discount')}>No discount</FilterButton>
// <FilterButton onClick={() => clickHandler('with-discount')}>With discount</FilterButton>