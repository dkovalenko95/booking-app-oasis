import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import Input from '../../ui/Input';
import Button from '../../ui/Button';
import SpinnerMini from '../../ui/SpinnerMini';
import SelectForForm from '../../ui/SelectForForm';
import Textarea from '../../ui/Textarea';
import CountrySelector from './countryPicker/CountrySelector';
import { COUNTRIES } from './countryPicker/countries';
import { useCreateGuest } from './hooks/useCreateGuest';
import { useFetchCabins } from '../cabins/hooks/useFetchCabins';
import DatePicker from 'react-date-picker';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import './datePicker/datePicker.css';
import Checkbox from '../../ui/Checkbox';

function CreateBookingForm({ onCloseModal }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const { createGuest, isCreatingGuest } = useCreateGuest();
  const { cabins, isLoading } = useFetchCabins();

  // Country picker
  const [country, setCountry] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  // Date picker
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
  const [confirmNights, setConfirmNights] = useState(false);

  // Guests number
  const [currCabin, setCurrCabin] = useState(null);
  const [numGuests, setNumGuests] = useState(null);

  // Max guests for current cabin
  useEffect(() => {
    if (currCabin) {
      setNumGuests(currCabin.maxCapacity);
    }
  }, [currCabin])
  
  // Current guest
  const [guestIsCreated, setGuestIsCreated] = useState({
    fullName: "John Green",
    email: "new@user.com",
    nationalID: 12345678,
    nationality: "United Kingdom",
    countryFlag: "https://flagcdn.com/gb.svg"
  });
  
  // Loading cabins
  useEffect(() => {
    if (cabins && cabins.length > 0) {
      setCurrCabin(cabins[0]);
    }
  }, [cabins]);
  
  // Capacity range
  let capacityRange;
  if (currCabin !== null) capacityRange = [...Array(currCabin.maxCapacity).keys()].map((num) => num + 1);



  function onSubmit(data) {
    const newGuestData = {
      ...data,
      nationality: country.title,
      countryFlag: `https://flagcdn.com/${country.value.toLowerCase()}.svg`,
    };

    console.log(newGuestData);

    createGuest({
      ...newGuestData,
    }, {
      onSuccess: () => {
        reset();
        setCountry(null);
        setGuestIsCreated(newGuestData);
        // onCloseModal?.();
      }
    });
  };

  if (guestIsCreated) {
    return (
      <Form $type='bookForm' onSubmit={handleSubmit(onSubmit, /* onError */)} type={onCloseModal ? 'modal' : 'regular'}>
  
        <FormRow id='guest' label='Creating booking for:'>
          <div>
            <span style={{ fontSize: '1.6rem' }}>{guestIsCreated.fullName}</span>
            <img style={{ marginLeft: '0.5rem' }} width='20rem' src={guestIsCreated.countryFlag} />
          </div>
        </FormRow>

        {isLoading
          ? <SpinnerMini />
          : <FormRow id='cabin' label='Choose the cabin:'>
              <SelectForForm onChange={(e) => {
                const cabinNum = e.target.value;
                const selectedCabin = cabins.find((cabin) => cabin.name === cabinNum);
                setCurrCabin(selectedCabin);
              }}>
                {cabins.map((cabin) => (
                  <option key={cabin.id} value={cabin.name}>{cabin.name}</option>
                ))}  
            </SelectForForm>
          </FormRow>
        }

        <FormRow id='startDate' orientation='selector' label='Start date:'>
          <DatePicker id='date-picker' format='dd.MM.yyyy' calendarClassName='calendarStyle' className='datePickerStyle' onChange={setStartDate} value={startDate} />
        </FormRow>

        <FormRow id='endDate' orientation='selector' label='End date:'>
          <DatePicker id='date-picker' format='dd.MM.yyyy' calendarClassName='calendarStyle' className='datePickerStyle' onChange={setEndDate} value={endDate} />
        </FormRow>

        <FormRow id='numNights' label='Number of nights:'>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <p style={{ fontSize: '1.6rem', paddingLeft: '1.6rem' }}>{numberOfNights}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <p>Confirm number of nights:</p>
              <Checkbox
                id='numNights' 
                checked={confirmNights}
                onChange={() => setConfirmNights((confirm) => !confirm)}
                disabled={numberOfNights < 1}
              />
            </div>
          </div>
        </FormRow>

        <FormRow id='numGuests' label='Number of guests:'>
          <SelectForForm
            value={numGuests}
            onChange={(e) => {
              const selected = e.target.value;
              setNumGuests(selected);
            }}>
              {currCabin && capacityRange.map((num) => (
                <option value={num} name={num} key={num}>{num}</option>
              ))}
          </SelectForForm>
        </FormRow>

        <FormRow id='breakfast' label='Does booking include breakfast?'>
          <SelectForForm>
            <option value='yesBreakfast'>Yes</option>  
            <option value='noBreakfast'>No</option>  
          </SelectForForm>
        </FormRow>

        <FormRow id='paid' label='Did the client pay for the booking?'>
          <SelectForForm>
            <option value='yesPaid'>Yes</option>  
            <option value='noPaid'>No</option>  
          </SelectForForm>
        </FormRow>

        <FormRow id='bookStatus' label='Booking status:'>
          <SelectForForm>
            <option value='unconfirmed'>Unconfirmed</option>  
            <option value='checked-in'>Checked-in</option>  
            <option value='checked-out'>Checked-out</option>  
          </SelectForForm>
        </FormRow>
        
        <FormRow id='addInfo' label='Additional info:'>
          <Textarea />
        </FormRow>

        {/* <div style={{display: 'flex', gap: '5rem', fontSize: '2rem', marginBottom: '2rem'}}> 
          <div style={{display: 'flex', gap: '1rem', fontSize: '2rem', marginBottom: '2rem'}}>
            <p>Cabin price for X nights:</p>
          </div>
          <div style={{display: 'flex', gap: '1rem', fontSize: '2rem', marginBottom: '2rem'}}>
            <p>Breakfast price:</p>
          </div>
          <div style={{display: 'flex', gap: '1rem', fontSize: '2rem', marginBottom: '2rem'}}>
            <p>Total price:</p>
          </div>
        </div> */}
  
        <FormRow id='control-btns'>
          {/* type is an HTML attribute! */}
          <Button
            $variation='secondary'
            type='reset'
            disabled={isCreatingGuest}
            onClick={() => onCloseModal?.()} // conditional call with optional chaining
          >
            Cancel
          </Button>
          <Button
            disabled={isCreatingGuest}
          >
            Create booking
          </Button>
        </FormRow>
      </Form>
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit, /* onError */)} type={onCloseModal ? 'modal' : 'regular'}>

      <FormRow label='Guest full name' error={errors?.fullName?.message}>
        <Input
          type='text'
          id='fullName'
          disabled={isCreatingGuest}
          {...register('fullName', {
            required: 'This field is required'
          })}
        />
      </FormRow>

      <FormRow label='Guest email' error={errors?.email?.message}>
        <Input
          type='email'
          id='email'
          disabled={isCreatingGuest}
          {...register('email', {
            required: 'This field is required',
            pattern: {
              value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
              message: 'Invalid email address',
            },
          })}
        />
      </FormRow>

      <FormRow label='Guest nationality' orientation='selector'>
        <CountrySelector
          register={register}
          id='country-selector'
          open={isOpen}
          onToggle={() => setIsOpen(!isOpen)}
          countries={COUNTRIES}
          country={country}
          setCountry={setCountry}
        />
      </FormRow>

      <FormRow label='National ID' error={errors?.nationalID?.message}>
        <Input
          type='text'
          id='nationalID'
          disabled={isCreatingGuest}
          {...register('nationalID', {
            required: 'This field is required',
          })}
        />
      </FormRow>

      <FormRow>
        {/* type is an HTML attribute! */}
        <Button
          $variation='secondary'
          type='reset'
          disabled={isCreatingGuest}
          onClick={() => onCloseModal?.()} // conditional call with optional chaining
        >
          Cancel
        </Button>
        <Button
          disabled={isCreatingGuest}
        >
          Create booking
        </Button>
      </FormRow>
    </Form>
  );
}

export default CreateBookingForm;
