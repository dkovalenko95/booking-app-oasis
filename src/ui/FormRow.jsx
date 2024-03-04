import styled, { css } from 'styled-components';
import { MdError } from 'react-icons/md';
import { devices } from '../utils/devices';

/* gap: ${(props) => (props.$orientation === 'vertical' ? '0.8rem' : '2.4rem')}; */
/* padding: 1.2rem 0; */

/* ORIENTATIONS */
/* vertical, horizontal, selector, extra-controls, setting-form-row, cabin-form-row, booking-form-row ... */ 
// TODO
// REBUILD THIS COMPONENT - APPLY ANEW IN ALL FORMS ACROSS THE APP

const StyledFormRow = styled.div`
  padding: 1rem 0;
  /* display: grid; */
  /* align-items: center; */

  /* Vertical */
  ${(props) => 
    props.$orientation === 'vertical' &&
      css`
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 0.6rem;
      `
  }

  /* Horizontal */
  ${(props) => 
    props.$orientation === 'horizontal' &&
      css`
        display: grid;
        align-items: center;
        grid-template-columns: 20rem 2.8fr 1fr;
        gap: 2.4rem;

        @media ${devices.lg} {
          grid-template-columns: 15rem 2.8fr 1fr;
        }

        @media ${devices.sm} {
          grid-template-columns: 1fr;
          gap: 0.8rem;
        }
      `
  }

  /* Horizontal-selector */
  ${(props) => 
    props.$orientation === 'horizontal-selector' &&
      css`
        display: grid;
        align-items: center;
        grid-template-columns: 20rem 2.8fr 1fr;
        gap: 2.4rem;

        @media ${devices.lg} {
          grid-template-columns: 15rem 2.8fr 1fr;
        }

        @media ${devices.sm} {
          grid-template-columns: 1fr;
          gap: 0.8rem;
        }
      `
  }
  
  /* grid-template-columns: ${(props) =>
    props.$orientation === 'vertical'
      ? '1fr'
      : '21rem 2.8fr 1.2fr'
  };
  gap: ${(props) => 
    props.$orientation === 'vertical'
      ? '0.6rem'
      : '2.4rem'
  }; */

  /* Selector */
  /* grid-template-columns: ${(props) =>
    props.$orientation === 'selector' && '21rem 3fr 1.2fr'
  };
  gap: ${(props) => 
    (props.$orientation === 'selector' && '2.4rem')
  }; */

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

  /* Special treatment if the row contains buttons without orientation */
  ${(props) =>
    props.$orientation !== 'vertical' && 
    props.$orientation !== 'horizontal' &&
    props.$orientation !== 'horizontal-selector' && 
    props.$orientation !== 'extra-controls' &&
      css`
        &:has(button) {
          display: flex;
          justify-content: flex-end;
          gap: 1.2rem;
        }
    `}

  /* Selector */
  /* ${(props) =>
    props.$orientation === 'selector' &&
      css`
        display: grid;
        align-items: center;
      `} */
  
  /* Extra controls */
  ${(props) =>
    props.$orientation === 'extra-controls' &&
      css`
        display: flex;
        align-items: center;
        justify-content: space-between;
        
        @media ${devices.sx} {
          flex-wrap: wrap;
          gap: 1.2rem;
        }
      `}

  /* Settings form */
  ${(props) => 
    props.$orientation === 'settings-form-row' &&
      css`
        display: grid;
        grid-template-columns: 1fr 2fr;
        align-items: center;
        gap: 1rem;

        @media ${devices.xs} {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 1.2rem;
          width: 100%;
        }
      `}
`;

const HeaderContainer = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
`;

const Label = styled.label`
  position: relative;
  font-weight: 500;
  display: flex;
  /* align-items: center; */
  align-items: flex-end;
  justify-content: flex-start;
  gap: 0.2rem;

  @media ${devices.xs} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const Desrc = styled.p`
  font-weight: 500;
`;

const Hint = styled.span`
  color: var(--color-grey-500);
  font-style: italic;
  font-size: 1.3rem;
  
  @media ${devices.xs} {
    font-size: 1.2rem;
  }
`;

const ErrorContainer = styled.div`
  font-size: 1.4rem;
  color: var(--color-red-700);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
  /* justify-content: center; */
  /* max-height: 4rem; */

  & span {
    display: block;
    width: max-content;
  }

  @media ${devices.xxs} {
    font-size: 1.3rem;
  }
`;

function FormRow({ id, descr, label, error, children, orientation, hint, title }) {
  return (
    <StyledFormRow $orientation={orientation}>
      {orientation === 'vertical' &&
        <HeaderContainer>
          {label && <Label title={title} htmlFor={id}>{label}{hint && <Hint>({hint})</Hint>}</Label>}
          {descr && <Desrc>{descr}{hint && <Hint>({hint})</Hint>}</Desrc>}
          {error && 
            <ErrorContainer>
              <span>{error}</span>
              <MdError size={16} color='var(--color-red-700)' />
            </ErrorContainer>
          }
        </HeaderContainer>
      }
      {orientation !== 'vertical' && label && <Label title={title} htmlFor={id}>{label}{hint && <Hint>({hint})</Hint>}</Label>}
      {descr && <Desrc>{descr}{hint && <Hint>({hint})</Hint>}</Desrc>}
      {children}
      {orientation !== 'vertical' && error && <ErrorContainer>{error}</ErrorContainer>}
    </StyledFormRow>
  );
}

export default FormRow;
