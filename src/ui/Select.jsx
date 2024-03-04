import styled from 'styled-components';
import { devices } from '../utils/devices';

const StyledSelect = styled.select`
  font-size: 1.4rem;
  padding: 0.8rem 1.2rem;
  border: 1px solid
    ${(props) =>
      props.$type === 'white'
        ? 'var(--color-grey-100)'
        : 'var(--color-grey-300)'};
  border-radius: var(--border-radius-sm);
  background-color: var(--color-grey-0);
  font-weight: 500;
  box-shadow: var(--shadow-sm);
  width: 100%;

  @media ${devices.xs} {
    font-size: 1.3rem;
    max-width: 30rem;
  }

  @media ${devices.xxs} {
    max-width: 25rem;
  }
`;

function Select({ options, currActiveValue, onChange, ...props }) {
  return (
    <StyledSelect onChange={onChange} value={currActiveValue} {...props}>
      {options.map((option) => (
        <option key={option.value} value={option.value}>{option.label}</option>
      ))}
    </StyledSelect>
  );
}

export default Select;
