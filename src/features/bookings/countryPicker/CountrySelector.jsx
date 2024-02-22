import { useEffect, useRef, useState } from 'react';
import { COUNTRIES } from './countries';
import { StyledContainer, StyledToggleSelectorBtn, StyledCurrentValue, StyledSearchInputContainer, StyledImage, StyledSelectArrows, StyledSvg, StyledSearchInput, StyledSelectedIndicator, StyledInputsContainer, StyledLi, StyledScrollableUl } from './CountryPicker.styled';

export default function CountrySelector({ id, open, onToggle, countries, country, setCountry, disabledCondition }) {
  const ref = useRef(null);

  let selectedValue = null;
  if (country) selectedValue = countries.find((option) => option.value === country.value);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && open) {
        onToggle();
        setQuery('');
      };
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onToggle, open]);

  const getCountryValueHandler = (value) => {
    setCountry(value);
    setQuery('');
    onToggle();
  };

  const [query, setQuery] = useState('');

  return (
    <div ref={ref}>
      <StyledContainer>
        <StyledToggleSelectorBtn
          disabled={disabledCondition}
          onClick={onToggle}
          aria-haspopup='listbox'
          aria-expanded='true'
          type='button'
        >
          <StyledCurrentValue>
            {country ? <StyledImage
              alt={`${selectedValue.value}`}
              src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${selectedValue.value}.svg`}
              // src={`https://flagcdn.com/${selectedValue.value.toLowerCase()}.svg`}
            /> : null}
            <span>{country ? selectedValue.title : 'Select your country'}</span>
          </StyledCurrentValue>
          
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
        </StyledToggleSelectorBtn>

        
        {open && (
          <StyledInputsContainer>
            <StyledSearchInputContainer>
                <StyledSearchInput
                  id='country-input'
                  type='search'
                  name='search'
                  autoComplete='off'
                  placeholder='Search a country...'
                  onChange={(e) => setQuery(e.target.value)}
                />
            </StyledSearchInputContainer>

            <StyledScrollableUl>
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
                      onClick={() => getCountryValueHandler(value)}
                    >
                      <StyledImage
                        alt={`${value.value}`}
                        src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${value.value}.svg`}
                        // src={`https://flagcdn.com/${value.value.toLowerCase()}.svg`}
                      />
                      <span>{value.title}</span>
                      {country && value.value === selectedValue.value
                        ? <StyledSelectedIndicator>
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
                        : null}
                    </StyledLi>
                  );
                })
              )}
            </StyledScrollableUl>
          </StyledInputsContainer>
        )}
      </StyledContainer>
    </div>
  );
};
