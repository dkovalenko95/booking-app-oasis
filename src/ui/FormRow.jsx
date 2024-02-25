import styled, { css } from 'styled-components';

const StyledFormRow = styled.div`
  display: grid;
  align-items: center;

  grid-template-columns: ${(props) =>
    props.$orientation === 'vertical' ? '1fr' : '21rem 3fr 1.2fr'};
  gap: ${(props) => (props.$orientation === 'vertical' ? '0.8rem' : '2.4rem')};

  grid-template-columns: ${(props) =>
    props.$orientation === 'selector' && '21rem 3fr 1.2fr'};
  gap: ${(props) => (props.$orientation === 'selector' && '2.4rem')};

  padding: 1.2rem 0;

  &:first-child {
    padding-top: 0;
  }

  &:last-child {
    padding-bottom: 0;
  }

  &:not(:last-child) {
    border-bottom: ${(props) =>
      props.$orientation === 'vertical'
        ? 'none'
        : '1px solid var(--color-grey-100)'};
  }

  /* Special treatment if the row contains buttons, and if it's NOT a vertical row */
  ${(props) =>
    props.$orientation !== 'vertical' && props.$orientation !== 'selector' && props.$orientation !== 'extra-controls' &&
    css`
      &:has(button) {
        display: flex;
        justify-content: flex-end;
        gap: 1.2rem;
      }
    `}

  ${(props) =>
    props.$orientation === 'selector' &&
    css`
      display: grid;
      align-items: center;
    `}
  
  ${(props) =>
    props.$orientation === 'extra-controls' &&
    css`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `}
`;

const Label = styled.label`
  position: relative;
  font-weight: 500;
`;

const Desrc = styled.p`
  font-weight: 500;
`;

const Error = styled.span`
  /* font-size: 1.4rem; */
  font-size: 1.3rem;
  color: var(--color-red-700);
`;

const Hint = styled.span`
  color: var(--color-grey-400);
  font-style: italic;
  font-size: 1.2rem;
  margin-left: 0.8rem;
`;

function FormRow({ id, descr, label, error, children, orientation, hint, title }) {
  return (
    <StyledFormRow $orientation={orientation}>
      {label && <Label title={title} htmlFor={id}>{label}{hint && <Hint>({hint})</Hint>}</Label>}
      {descr && <Desrc>{descr}{hint && <Hint>({hint})</Hint>}</Desrc>}
      {children}
      {error && <Error>{error}</Error>}
    </StyledFormRow>
  );
}

export default FormRow;
