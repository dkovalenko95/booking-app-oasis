import styled from 'styled-components';
import { COUNTRIES } from './countries';
import { useEffect, useRef, useState } from 'react';

const StyledContainer = styled.div`
  margin-top: 1rem;
  position: relative;
`;

// Select Country button
const StyledButton = styled.button`
  width: 100%;
  font-size: 1.35rem;
  font-weight: 500;
  line-height: 1.5rem;
  cursor: pointer;

  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  padding: 0.8rem 1.2rem;
  box-shadow: var(--shadow-sm);
`;

const StyledSelectedContainer = styled.span`
  display: flex;
  align-items: center;
  justify-content: start;
  white-space: nowrap;
`;

const StyledImage = styled.img`
  display: block;
  margin-right: 0.5rem;
  height: 1.5rem;
  border-radius: 0.125rem;
`;

const StyledSelectArrows = styled.span`
  position: absolute;
  top: 0px;
  bottom: 0px;
  right: 0;
  display: flex;
  align-items: center;
  padding-right: 0.5rem;
  pointer-events: none;
`;

const StyledSvg = styled.svg`
  height: 1.5rem;
  width: 1.5rem;
  fill: var(--color-grey-700);
`;

// Opened list
const StyledSearchContainer = styled.div`
  position: sticky;
  top: 0;
  z-index: 10;
  
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
`;

const StyledUl = styled.ul`
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

const StyledLi = styled.li`
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

const StyledSearch = styled.li`
  display: flex;
  align-items: center;
  justify-content: start;
  padding: 0.5rem;
  cursor: pointer;
  user-select: none;
  transition: background-color 0.2s ease-in-out;
  border-radius: var(--border-radius-sm);
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 0.8rem 1.2rem;
  font-weight: 500;
  line-height: 1.5rem;
  transition: border-color 0.2s ease;

  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
`;

const StyledSelectedIndicator = styled.span`
  display: flex;
  align-items: center;
  position: absolute;
  top: 0;
  bottom: 0;
  right: 0;
  padding-right: 3rem;
`;

const StyledScrollableDiv = styled.div`
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

export default function CountrySelector({ id, open, onToggle, onChange, selectedValue}) {
  const ref = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current &&
        !ref.current.contains(event.target) &&
        open
      ) {
        onToggle();
        setQuery('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onToggle, open]);

  const [query, setQuery] = useState('');

  return (
    <div ref={ref}>
      <StyledContainer>
        <StyledButton
          onClick={onToggle}
          aria-haspopup='listbox'
          aria-expanded='true'
        >
          <StyledSelectedContainer>
            <StyledImage
              alt={`${selectedValue.value}`}
              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedValue.value}.svg`}
              className={'inline mr-2 h-4 rounded-sm'}
            />
            {selectedValue.title}
          </StyledSelectedContainer>
          
          <StyledSelectArrows>
            <StyledSvg
              xmlns='http://www.w3.org/2000/svg'
              viewBox='0 0 20 20'
              fill='currentColor'
              aria-hidden='true'
            >
              <path
                fillRule='evenodd'
                d='M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z'
                clipRule='evenodd'
              />
            </StyledSvg>
          </StyledSelectArrows>
        </StyledButton>

        <div>
          {open && (
            <StyledUl
              tabIndex={-1}
              role='listbox'
              aria-labelledby='listbox-label'
              aria-activedescendant='listbox-option-3'
            >
              <StyledSearchContainer>
                <StyledSearch>
                  <StyledInput
                    type='search'
                    name='search'
                    autoComplete='off'
                    placeholder='Search a country'
                    onChange={(e) => setQuery(e.target.value)}
                  />
                </StyledSearch>
              </StyledSearchContainer>

              <StyledScrollableDiv>
                {COUNTRIES.filter((country) =>
                  country.title.toLowerCase().startsWith(query.toLowerCase())
                ).length === 0 ? (
                  <StyledLi>
                    No countries found
                  </StyledLi>
                ) : (
                  COUNTRIES.filter((country) =>
                    country.title.toLowerCase().startsWith(query.toLowerCase())
                  ).map((value, index) => {
                    return (
                      <StyledLi
                        key={`${id}-${index}`}
                        id='listbox-option-0'
                        role='option'
                        onClick={() => {
                          onChange(value.value);
                          setQuery('');
                          onToggle();
                        }}
                      >
                        <StyledImage
                          alt={`${value.value}`}
                          src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.value}.svg`}
                        />

                        <span>
                          {value.title}
                        </span>
                        {value.value === selectedValue.value ? (
                          <StyledSelectedIndicator>
                            <StyledSvg
                              className='h-5 w-5'
                              xmlns='http://www.w3.org/2000/svg'
                              viewBox='0 0 20 20'
                              fill='currentColor'
                              aria-hidden='true'
                            >
                              <path
                                fillRule='evenodd'
                                d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                                clipRule='evenodd'
                              />
                            </StyledSvg>
                          </StyledSelectedIndicator>
                        ) : null}
                      </StyledLi>
                    );
                  })
                )}
              </StyledScrollableDiv>
            </StyledUl>
          )}
        </div>
      </StyledContainer>
    </div>
  );
};
