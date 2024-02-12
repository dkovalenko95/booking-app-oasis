import { useEffect, useRef, useState } from 'react';
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
import { useFetchGuests } from './hooks/useFetchGuests';

function formatDate(dateString) {
  const dateObject = new Date(dateString);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so adding 1
  const day = String(dateObject.getDate()).padStart(2, '0');
  const formattedDate = `${year}-${month}-${day} 00:00:00`;
  return formattedDate;
};

function getCurrtGuestId(curr, arr) {
  const currGuest = arr.find((person) => person.fullName === curr.fullName);
  console.log(currGuest);
  return +currGuest.id;
};

function CreateBookingForm({ onCloseModal }) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  // Current guest
  // const [guestIsCreated, setGuestIsCreated] = useState({
  //   fullName: "John Green",
  //   email: "new@user.com",
  //   nationalID: 12345678,
  //   nationality: "United Kingdom",
  //   countryFlag: "https://flagcdn.com/gb.svg"
  // });

  const [guestIsCreated, setGuestIsCreated] = useState(null);
  console.log(guestIsCreated);

  // FORM GUEST(1st step)
  const { createGuest, isCreatingGuest } = useCreateGuest();
  // Country picker
  const [country, setCountry] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  
  // FORM BOOKING(2nd step)
  // Fetch cabins
  const { cabins, isLoading: isLoadingCabins } = useFetchCabins();
  // Fetch settings
  const { settings, isLoading: isLoadingSettings } = useSettings();
  // Fetch guests
  const { guests, isLoading: isLoadingGuests } = useFetchGuests();

  // Date picker
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date(new Date().getTime() + (24 * 60 * 60 * 1000)));

  // Nights number
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());
  const numNights = Math.floor(timeDiff / (1000 * 3600 * 24));

  // Cabin and Guests number
  const [currCabin, setCurrCabin] = useState(null);
  const [numGuests, setNumGuests] = useState(null);

  // Breakfast 
  const [hasBreakfast, setHasBreakfast] = useState(true);

  // Paid
  const [isPaid, setIsPaid] = useState(false);

  // Status
  const [status, setStatus] = useState('unconfirmed');

  // Additonal info
  const observationRef = useRef(null);

  // Confirm form data
  const [confirmForm, setConfirmForm] = useState(false);

  // Summary
  // TODO: Workaround to ommit useEffect
  const [summary, setSummary] = useState(null);
  useEffect(() => {
    setSummary({
      cabinPrice: currCabin?.regularPrice * numNights,
      extrasPrice: (numNights * numGuests) * settings?.breakfastPrice,
      totalPrice: (currCabin?.regularPrice * numNights) + ((numNights * numGuests) * settings?.breakfastPrice),
    });
  }, [currCabin, numNights, numGuests, settings]);

  // Set current cabin after fetched
  useEffect(() => {
    if (cabins && cabins.length > 0) setCurrCabin(cabins[0]);
  }, [cabins]);

  // Set max guests capacity for current cabin
  useEffect(() => {
    if (currCabin) setNumGuests(currCabin.maxCapacity);
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
    setGuestIsCreated(newGuestData);

    // 2nd - step API interaction
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
  function onSubmitBooking() {
    // 1st step - create booking data
    const newBookingData = {
      // startDate: startDate,
      startDate: formatDate(startDate),
      // endDate: endDate,
      endDate: formatDate(endDate),
      numNights: +numNights,
      numGuests: +numGuests,
      cabinPrice: +summary?.cabinPrice,
      extrasPrice: +summary?.extrasPrice,
      totalPrice: +summary?.totalPrice,
      status: String(status),
      hasBreakfast: String(hasBreakfast).toUpperCase(),
      isPaid: String(isPaid).toUpperCase(),
      observation: observationRef.current.value,
      cabinId: +currCabin?.id,
      guestId: getCurrtGuestId(guestIsCreated, guests),
    };
    console.log(newBookingData);

    // 2nd step - API interaction
  };

  // TODO: Work on 1. select existed guest from data base OR  2.create new one
  if (guestIsCreated) {
    return (
      <Form
        name='create-booking'
        id='create-booking'
        onSubmit={handleSubmit(onSubmitBooking, /* onError */)}
        $type={onCloseModal ? 'modal' : 'regular'}
      >

        <FormRow id='guest-select' descr='Creating booking for:'>
          <div id='guest-select'>
            <span style={{ fontSize: '1.6rem' }}>{guestIsCreated.fullName}</span>
            <img style={{ marginLeft: '0.5rem' }} width='20rem' src={guestIsCreated.countryFlag} />
          </div>
        </FormRow>

          {isLoadingCabins
            ? <SpinnerMini />
            : <FormRow id='cabin-select' label='Choose the cabin:'>
                <SelectForForm
                  id='cabin-select'
                  onChange={(e) => {
                    const cabinNum = e.target.value;
                    const selectedCabin = cabins.find((cabin) => cabin.name === cabinNum);
                    setCurrCabin(selectedCabin);
                  }}
                >
                  {cabins.map((cabin) => (
                    <option key={cabin.id} value={cabin.name}>{cabin.name}</option>
                  ))}  
                </SelectForForm>
              </FormRow>
          }

        <FormRow
          id='date-start-select'
          orientation='selector'
          descr='Start date:'
        >
          <DatePicker
            id='date-start-select'
            format='dd.MM.yyyy'
            onChange={setStartDate}
            value={startDate}
          />
        </FormRow>
        <FormRow
          id='date-end-select'
          orientation='selector'
          descr='End date:'
        >
          <DatePicker
            id='date-end-select'
            format='dd.MM.yyyy'
            onChange={setEndDate}
            value={endDate}
          />
        </FormRow>

        <FormRow id='num-nights-select' descr='Number of nights:'>
          <p style={{ fontSize: '1.6rem', paddingLeft: '1.6rem' }}>{numNights}</p>
        </FormRow>

          {isLoadingCabins
            ? <SpinnerMini />
            : <FormRow id='num-guests-select' label='Number of guests:'>
                <SelectForForm
                  id='num-guests-select'
                  value={numGuests ?? 'Select number of guests'}
                  onChange={(e) => {
                    const selected = e.target.value;
                    setNumGuests(selected);
                  }}
                >
                  {currCabin && capacityRange.map((num) => (
                    <option value={num} name={num} key={num}>{num}</option>
                  ))}
                </SelectForForm>
              </FormRow>
          }

        {isLoadingSettings
          ? <SpinnerMini />
          : <FormRow
              id='breakfast-select'
              label='Does booking include breakfast?'
              info={`Breakfast price for 1 person is ${formatCurrency(settings?.breakfastPrice)}`}
            >
              <SelectForForm
                id='breakfast-select'
                onChange={(e) => {
                  let selected = e.target.value;
                  selected = selected === 'yesBreakfast' ? true : false;
                  setHasBreakfast(selected);
                }}
              >
                <option value='yesBreakfast'>Yes</option>  
                <option value='noBreakfast'>No</option>  
              </SelectForForm>
            </FormRow>
        }

        <FormRow id='paid-select' label='Did the client pay for the booking?'>
          <SelectForForm 
            id='paid-select'
            onChange={(e) => {
              let selected = e.target.value;
              selected = selected === 'isPaid' ? true : false;
              setIsPaid(selected);
              if (selected === 'notPaid') setStatus('unconfirmed');
            }}
          >
            <option value='notPaid'>No</option>  
            <option value='isPaid'>Yes</option>  
          </SelectForForm>
        </FormRow>

        <FormRow id='status-select' label='Booking status:'>
          <SelectForForm
            $status={status}
            id='status-select'
            onChange={(e) => {
              let selected = e.target.value;
              setStatus(selected);
            }}
          >
            <option
              style={{ color: 'var(--color-blue-700)', backgroundColor: 'var(--color-blue-100' }} 
              value='unconfirmed'
            >
              Unconfirmed
            </option>  
            {isPaid === 'isPaid' && 
              <>
                <option
                  style={{ color: 'var(--color-green-700)', backgroundColor: 'var(--color-green-100' }} 
                  value='checked-in'
                >
                  Checked-in
                </option>  
                <option
                  style={{ color: 'var(--color-silver-700)', backgroundColor: 'var(--color-silver-100' }} 
                  value='checked-out'
                >
                  Checked-out
                </option>
              </>
            }  
          </SelectForForm>
        </FormRow>
        
        <FormRow id='additional-info' label='Additional info:'>
          <Textarea
            ref={observationRef}
            id='additional-info' />
        </FormRow>

        <FormRow is='summary' descr='Summary:'>
          <div id='summary' style={{display: 'flex', gap: '1rem', flexDirection: 'column', justifyContent: 'center', fontSize: '1.6rem'}}> 
            <p>
              Cabin <span style={{ fontWeight: '500' }}>
                {currCabin?.name}
              </span> price for <span style={{ fontWeight: '500' }}>
                {numNights}
              </span> nights: <span style={{ fontWeight: '500' }}>
                {formatCurrency(currCabin?.regularPrice * numNights)}
              </span>
            </p>
            <p>
              Breakfast price: <span style={{ fontWeight: '500' }}>
                {hasBreakfast ? formatCurrency((numNights * numGuests) * settings?.breakfastPrice) : '-'}
              </span>
            </p>   
            <p>
              Total price: <span style={{ fontWeight: '500' }}>
                {hasBreakfast 
                  ? formatCurrency((currCabin?.regularPrice * numNights) + ((numNights * numGuests) * settings?.breakfastPrice)) 
                  : formatCurrency(currCabin?.regularPrice * numNights)
                }
              </span>
            </p>
             
            <div style={{ fontSize: '1.6rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <p>Confirm form data:</p>
              <Checkbox
                id='confirm-form-data' 
                checked={confirmForm}
                onChange={() => setConfirmForm((confirm) => !confirm)}
              />
            </div>
          </div>
        </FormRow>

        <FormRow id='form-actions'>
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
    <Form
      id='createGuest'
      onSubmit={handleSubmit(onSubmitGuest, /* onError */)}
      $type={onCloseModal ? 'modal' : 'regular'}
    >
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
