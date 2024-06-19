import styled, { css } from 'styled-components';

const StyledSelect = styled.select`
  height: 4rem;

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

  ${(props) =>
    props.$status === 'unconfirmed' &&
    css`
      color: var(--color-blue-700);
      background-color: var(--color-blue-100);
    `}
  ${(props) =>
    props.$status === 'checked-in' &&
    css`
      color: var(--color-green-700);
      background-color: var(--color-green-100);
    `}
  ${(props) =>
    props.$status === 'checked-out' &&
    css`
      color: var(--color-silver-700);
      background-color: var(--color-silver-100);
    `}
`;

function SelectForForm({ value, onChange, children, ...props }) {
  return (
    <StyledSelect
      value={value}
      onChange={onChange}
      {...props}
    >
      { children }
    </StyledSelect>
  );
}

export default SelectForForm;

