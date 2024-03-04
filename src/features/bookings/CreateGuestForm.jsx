import { useRef, useState } from 'react';
import { useForm } from 'react-hook-form';

import { IoIosCheckmarkCircle } from 'react-icons/io';

import CountrySelector from './countryPicker/CountrySelector';
import { COUNTRIES } from './countryPicker/countries';

import SpinnerMini from '../../ui/SpinnerMini';
import Button from '../../ui/Button';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import SelectForForm from '../../ui/SelectForForm';
import FormTitle from '../../ui/FormTitle';
import Form from '../../ui/Form';

import { useCreateGuest } from './hooks/useCreateGuest';
import { useFetchGuests } from './hooks/useFetchGuests';
import { getSelectedGuestData } from '../../utils/helpers';
import DottedLoader from '../../ui/DottedLoader';

function CreateGuestForm({ onCloseModal, setCreatedGuestData }) {
  // RENDER COUNT
  const renderCount = useRef(0);
  // Increment the render count on each render
  renderCount.current += 1;
  console.log('Render count GUEST FORM:', renderCount.current);



  // useForm
  const { register, handleSubmit, formState: { errors }, clearErrors, reset } = useForm();

  // Selected
  const [selectedGuest, setSelectedGuest] = useState(null);

  // FORM GUEST(1st step)
  // Fetch guests
  const { guests, isLoading: isLoadingGuests } = useFetchGuests();
  // Create guest
  const { createGuest, isCreatingGuest } = useCreateGuest();
  // Country picker
  const [country, setCountry] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // FORM SUBMISSION - 1st step - create/select new guest
  function onSubmitGuest(data) {
    // ----- Select existed guest -----
    if (selectedGuest) {
      const selectedGuestData = getSelectedGuestData(selectedGuest, guests);
      setCreatedGuestData(selectedGuestData)
    };

    // ----- Create new guest -----
    // 1) create guest data
    if (!selectedGuest) {
      const newGuestData = {
        ...data,
        nationality: country ? country.title : '',
        countryFlag: country ? `https://flagcdn.com/${country.value.toLowerCase()}.svg` : '',
      };
      console.log('New guest data:', newGuestData);
      setCreatedGuestData(newGuestData);
      
      // 2) API interaction
      createGuest({
        ...newGuestData,
      }, {
        onSuccess: () => {
          reset();
          setCountry(null);
          // onCloseModal?.();
        }
      });
    }
  };

  return (
    <Form
      id='create-guest'
      onSubmit={handleSubmit(onSubmitGuest, /* onError */)}
      $type={onCloseModal ? 'modal' : 'regular'}
    >
      <FormTitle>Select existed guest OR create the new one</FormTitle>
      <FormRow /* id='guest-select-input' */ label='Select existed guest' error={errors?.selectedGuest?.message} orientation='horizontal-selector'>
        {isLoadingGuests
          ? <DottedLoader />
          : <>
              <SelectForForm
                id='guest-select-input'
                onChange={(e) => {
                  const selected = e.target.value;
                  setSelectedGuest(selected);
                  clearErrors();
                }}
              >
                <option value='' hidden>Select the guest...</option>
                {guests.map((guest) => (
                  <option key={guest.id} value={guest.fullName}>{guest.fullName}</option>
                ))}
              </SelectForForm>
              {selectedGuest && <IoIosCheckmarkCircle color='green' size={24} />}
            </>
        }
      </FormRow>
      
      <FormRow id='full-name' label='Guest full name' error={errors?.fullName?.message} orientation='horizontal'>
        <Input
          type='text'
          id='full-name'
          disabled={isCreatingGuest || selectedGuest}
          {...!selectedGuest && {...register('fullName',
            {
              required: 'Required if no guest selected',
            }
          )}}
        />
      </FormRow>

      <FormRow id='email' label='Guest email' error={errors?.email?.message} orientation='horizontal'>
        <Input
          autoComplete='off'
          type='email'
          id='email'
          disabled={isCreatingGuest || selectedGuest}
          {...!selectedGuest && {...register('email', 
            {
              required: 'Required if no guest selected',
              pattern: {
                value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Invalid email address',
              },
            }
          )}}
        />
      </FormRow>

      <FormRow /* id='country-selector' */ label='Guest nationality' hint='optional' orientation='horizontal-selector'>
        <CountrySelector
          id='country-selector'
          open={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          countries={COUNTRIES}
          country={country}
          setCountry={setCountry}
          disabledCondition={isCreatingGuest || selectedGuest}
        />
      </FormRow>

      <FormRow id='national-id' label='National ID' hint='optional' error={errors?.nationalID?.message} orientation='horizontal'>
        <Input
          type='text'
          id='national-id'
          disabled={isCreatingGuest || selectedGuest}
          {...register('nationalID')}
        />
      </FormRow>

      <FormRow orientation='extra-controls'>
        <div>
          <Button
            $variation='secondary'
            type='reset'
            disabled={isCreatingGuest}
            onClick={() => {
              setSelectedGuest(null);
              clearErrors();
            }}
          >
            Reset form
          </Button>
        </div>
        <div style={{ display: 'flex', gap: '1.2rem' }}>
          <Button
            $variation='secondary'
            type='reset'
            disabled={isCreatingGuest}
            onClick={() => onCloseModal?.()} // conditional call with optional chaining
          >
            Cancel
          </Button>
          <Button disabled={isCreatingGuest}>
            {isCreatingGuest ? <SpinnerMini /> : 'Confirm guest'}
          </Button>
        </div>
      </FormRow>
    </Form>
  );
}

export default CreateGuestForm;
