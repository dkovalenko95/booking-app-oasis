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
import { formatCurrency } from '../../utils/helpers';
import { useSettings } from '../settings/hooks/useSettings';

function CreateBookingForm({ onCloseModal }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Current guest
  const [guestIsCreated, setGuestIsCreated] = useState({
    fullName: "John Green",
    email: "new@user.com",
    nationalID: 12345678,
    nationality: "United Kingdom",
    countryFlag: "https://flagcdn.com/gb.svg"
  });

  // FORM GUEST(1st step)
  const { createGuest, isCreatingGuest } = useCreateGuest();
  // Country picker
  const [country, setCountry] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  // FORM BOOKING(2nd step)
  // Fetch cabins
  const { cabins, isLoading } = useFetchCabins();
  const { settings, isLoading: isLoadingSettings } = useSettings();

  // Date picker
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().getTime() + (24 * 60 * 60 * 1000)));
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const numberOfNights = Math.floor(timeDiff / (1000 * 3600 * 24));
  const [confirmNights, setConfirmNights] = useState(false);

  // Guests number
  const [currCabin, setCurrCabin] = useState(null);
  const [numGuests, setNumGuests] = useState(null);

  console.log(currCabin);

  // Breakfast 
  const [hasBreakfast, setHasBreakfast] = useState(true);
  console.log(hasBreakfast);

  // Paid
  const [hasPaid, setHasPaid] = useState(false);

  // Status
  const [status, setStatus] = useState('unconfirmed');

  // Set current cabin after fetched
  useEffect(() => {
    if (cabins && cabins.length > 0) {
      setCurrCabin(cabins[0]);
    }
  }, [cabins]);

  // Set max guests capacity for current cabin
  useEffect(() => {
    if (currCabin) {
      setNumGuests(currCabin.maxCapacity);
    }
  }, [currCabin])
  
  // Capacity range for selecting possible number of guest for current cabin 
  let capacityRange;
  if (currCabin !== null) capacityRange = [...Array(currCabin.maxCapacity).keys()].map((num) => num + 1);


  // FORM SUBMISSION - 1st step - create new guest
  function onSubmitGuest(data) {
    // 1st step - create guest data
    const newGuestData = {
      ...data,
      nationality: country.title,
      countryFlag: `https://flagcdn.com/${country.value.toLowerCase()}.svg`,
    };
    console.log(newGuestData);

    // 
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

  // FORM SUBMISSION - 2nd step - create new booking
  function onSubmitBooking(data) {
    console.log(data);
  };

  if (guestIsCreated) {
    return (
      <Form
        $type='bookForm'
        onSubmit={handleSubmit(onSubmitBooking, /* onError */)}
        type={onCloseModal ? 'modal' : 'regular'}
      >

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
          {/* If no 'numGuests' value, create standart input to manually set the number  */}
          <SelectForForm
            value={numGuests ? numGuests : 'Input number of guests'}
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
          <SelectForForm onChange={(e) => {
            let selected = e.target.value;
            selected = selected === 'yesBreakfast' ? true : false;
            setHasBreakfast(selected);
          }}>
            <option value='yesBreakfast'>Yes</option>  
            <option value='noBreakfast'>No</option>  
          </SelectForForm>
        </FormRow>

        <FormRow id='paid' label='Did the client pay for the booking?'>
          <SelectForForm onChange={(e) => {
            let selected = e.target.value;
            selected = selected === 'hasPaid' ? true : false;
            setHasPaid(selected);

            if (selected === 'notPaid') {
              setStatus('unconfirmed');
            }
          }}>
            <option value='notPaid'>No</option>  
            <option value='hasPaid'>Yes</option>  
          </SelectForForm>
        </FormRow>

        <FormRow id='bookStatus' label='Booking status:'>
          <SelectForForm $status={status} onChange={(e) => {
            let selected = e.target.value;
            setStatus(selected);
          }}>
            <option style={{ color: 'var(--color-blue-700)', backgroundColor: 'var(--color-blue-100' }} value='unconfirmed'>Unconfirmed</option>  
            {hasPaid === 'hasPaid' && 
              <>
                <option style={{ color: 'var(--color-green-700)', backgroundColor: 'var(--color-green-100' }} value='checked-in'>Checked-in</option>  
                <option style={{ color: 'var(--color-silver-700)', backgroundColor: 'var(--color-silver-100' }} value='checked-out'>Checked-out</option>
              </>
            }  
          </SelectForForm>
        </FormRow>
        
        <FormRow id='addInfo' label='Additional info:'>
          <Textarea />
        </FormRow>

        <FormRow id='summary' label='Summary:'>
          <div style={{display: 'flex', gap: '1rem', flexDirection: 'column', justifyContent: 'center', fontSize: '1.6rem'}}> 
            <p>
              Cabin <span style={{ fontWeight: '500' }}>
                {currCabin?.name}
              </span> price for <span style={{ fontWeight: '500' }}>
                {numberOfNights}
              </span> nights: <span style={{ fontWeight: '500' }}>
                {formatCurrency(currCabin?.regularPrice * numberOfNights)}
              </span>
            </p>
            <p>
              Breakfast price: <span style={{ fontWeight: '500' }}>
                {hasBreakfast ? formatCurrency((numberOfNights * numGuests) * settings?.breakfastPrice) : '-'}
              </span>
            </p>   
            <p>
              Total price: <span style={{ fontWeight: '500' }}>
                {hasBreakfast 
                  ? formatCurrency((currCabin?.regularPrice * numberOfNights) + ((numberOfNights * numGuests) * settings?.breakfastPrice)) 
                  : formatCurrency(currCabin?.regularPrice * numberOfNights)
                }
              </span>
            </p>    
          </div>
        </FormRow>

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
          <Button disabled={isCreatingGuest}>
            Create booking
          </Button>
        </FormRow>
      </Form>
    );
  };

  return (
    <Form onSubmit={handleSubmit(onSubmitGuest, /* onError */)} type={onCloseModal ? 'modal' : 'regular'}>

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
