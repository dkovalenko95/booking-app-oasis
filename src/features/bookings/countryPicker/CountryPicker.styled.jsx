import styled, { css } from 'styled-components';

export const StyledContainer = styled.div`
  /* margin-top: 1rem; */
  position: relative;
  /* padding: 0.8rem 1.2rem; */
`;

// Select Country button
export const StyledToggleSelectorBtn = styled.button`
  height: 4rem;
  width: 100%;
  font-size: 1.4rem;
  font-weight: 500;
  line-height: 1.5rem;
  cursor: pointer;

  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);

  ${(props) => props.disabled &&
    css`
      color: var(--color-grey-400);
    `
  }
`;

export const StyledCurrentValue = styled.div`
  display: flex;
  align-items: center;
  justify-content: start;
  white-space: nowrap;
`;

export const StyledImage = styled.img`
  display: block;
  margin-right: 0.5rem;
  height: 1.5rem;
  border-radius: 0.125rem;
`;

export const StyledSelectArrows = styled.span`
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 0.5rem;
  pointer-events: none;
`;

export const StyledSvg = styled.svg`
  height: 1.5rem;
  width: 1.5rem;
  fill: var(--color-grey-700);
`;

// Opened list
export const StyledInputsContainer = styled.div`
  position: absolute;
  z-index: 10;
  width: 100%;
  max-height: 30rem;
  margin-top: 0.125rem;
  font-size: 1.25rem;
  padding: 0.4rem 0.6rem;
  
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
`;

export const StyledSearchInputContainer = styled.div`
  /* position: sticky; */
  top: 0;
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 0.5rem;
  cursor: pointer;
  transition: background-color 0.2s ease-in-out;
  
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
`;

export const StyledSearchInput = styled.input`
  width: 100%;
  padding: 0.8rem 1.2rem;
  font-weight: 500;
  line-height: 1.5rem;
  transition: border-color 0.2s ease;

  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);

  &::placeholder {
    color: var(--color-grey-400);
  }
`;

export const StyledScrollableUl = styled.ul`
  max-height: 16rem;
  overflow-y: scroll;
  scrollbar-width: thin;
  scrollbar-color: var(--color-brand-600) transparent;
  
  &::-webkit-scrollbar {
    width: 0.25rem;
  }
  
  &::-webkit-scrollbar-thumb {
    background-color: var(--color-grey-700);
    border-radius: var(--border-radius-sm);
  }
  
  &:hover::-webkit-scrollbar-thumb {
    background-color: var(--color-brand-600);
  }
`;

export const StyledLi = styled.li`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 0.8rem 1.2rem;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease-in-out;
  border-radius: var(--border-radius-sm);

  &:hover {
    background-color: var(--color-grey-100);
  }
`;

export const StyledSelectedIndicator = styled.span`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding-right: 3rem;
`;
