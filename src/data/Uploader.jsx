import { isFuture, isPast, isToday } from 'date-fns';
import { useState } from 'react';
import supabase from '../services/supabase';
import Button from '../ui/Button';
import { subtractDates } from '../utils/helpers';
import { bookings } from './data-bookings';
import { cabins } from './data-cabins';
import { guests } from './data-guests';
import styled from 'styled-components';
import { IoIosArrowForward, IoIosClose } from 'react-icons/io';
import { GoArrowDownLeft } from 'react-icons/go';

// const originalSettings = {
//   minBookingLength: 3,
//   maxBookingLength: 30,
//   maxGuestsPerBooking: 10,
//   breakfastPrice: 15,
// };

async function deleteGuests() {
  const { error } = await supabase.from('Guests').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteCabins() {
  const { error } = await supabase.from('Cabins').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function deleteBookings() {
  const { error } = await supabase.from('Bookings').delete().gt('id', 0);
  if (error) console.log(error.message);
}

async function createGuests() {
  const { error } = await supabase.from('Guests').insert(guests);
  if (error) console.log(error.message);
}

async function createCabins() {
  const { error } = await supabase.from('Cabins').insert(cabins);
  if (error) console.log(error.message);
}

async function createBookings() {
  // Bookings need a guestId and a cabinId. We can't tell Supabase IDs for each object, it will calculate them on its own. So it might be different for different people, especially after multiple uploads. Therefore, we need to first get all guestIds and cabinIds, and then replace the original IDs in the booking data with the actual ones from the DB
  const { data: guestsIds } = await supabase
    .from('Guests')
    .select('id')
    .order('id');
  const allGuestIds = guestsIds.map((cabin) => cabin.id);
  const { data: cabinsIds } = await supabase
    .from('Cabins')
    .select('id')
    .order('id');
  const allCabinIds = cabinsIds.map((cabin) => cabin.id);

  const finalBookings = bookings.map((booking) => {
    // Here relying on the order of cabins, as they don't have and ID yet
    const cabin = cabins.at(booking.cabinId - 1);
    const numNights = subtractDates(booking.endDate, booking.startDate);
    const cabinPrice = numNights * (cabin.regularPrice - cabin.discount);
    const extrasPrice = booking.hasBreakfast
      ? numNights * 15 * booking.numGuests
      : 0; // hardcoded breakfast price
    const totalPrice = cabinPrice + extrasPrice;

    let status;
    if (
      isPast(new Date(booking.endDate)) &&
      !isToday(new Date(booking.endDate))
    )
      status = 'checked-out';
    if (
      isFuture(new Date(booking.startDate)) ||
      isToday(new Date(booking.startDate))
    )
      status = 'unconfirmed';
    if (
      (isFuture(new Date(booking.endDate)) ||
        isToday(new Date(booking.endDate))) &&
      isPast(new Date(booking.startDate)) &&
      !isToday(new Date(booking.startDate))
    )
      status = 'checked-in';

    return {
      ...booking,
      numNights,
      cabinPrice,
      extrasPrice,
      totalPrice,
      guestId: allGuestIds.at(booking.guestId - 1),
      cabinId: allCabinIds.at(booking.cabinId - 1),
      status,
    };
  });

  const { error } = await supabase.from('Bookings').insert(finalBookings);
  if (error) console.log(error.message);
}

const UploadContainer = styled.div`
  z-index: 10000;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  position: absolute;
  padding: 1.6rem 1rem;
  left: 0;
  top: 500px;
  background-color: var(--color-indigo-100);
  border-radius: ${({ open }) => open ? '0px 5px 5px 0px' : '0px 0px 5px 0px'};
  width: 14rem;
  height: min-content;
  transform: ${({ open }) => open ? 'translateX(0)' : 'translateX(-100%)'};
  transition: transform 0.3s ease-in-out;
`;

const UploadArea = styled.div`
  color: var(--color-indigo-700);
  font-size: 1.3rem;
  line-height: 1.3;
  text-align: center;
  font-weight: 500;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.75rem;
`;

const UploadOpener = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  width: 2.8rem;
  height: 2.8rem;
  left: ${({ open }) => open ? '80%' : '100%'};
  top: 0;
  border-radius: 0px 5px 5px 0px;
  cursor: pointer;
  background-color: var(--color-indigo-100);
  color: var(--color-indigo-700);

  transition: left 0.3s ease-in-out;
`;

const UploadHint = styled.div`
  opacity: 80%;
  z-index: 100000;
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  position: absolute;
  font-size: 1.2rem;
  font-weight: 500;
  top: 445px;
  left: 20px;
  width: max-content;
  height: max-content;
  padding: 0.5rem;
  border-radius: 5px;
  color: var(--color-indigo-700);
  
  & div {
    background-color: var(--color-indigo-100);
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
    padding-left: 1rem;
    border-radius: 5px;
    gap: 0.5rem;
  }
`;

const IconContainer = styled.span`
  display: flex;
  cursor: pointer;
`;

export function Uploader() {
  const [isLoading, setIsLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [showHint, setShowHint] = useState(true);

  async function uploadAll() {
    setIsLoading(true);
    // Bookings need to be deleted FIRST
    await deleteBookings();
    await deleteGuests();
    await deleteCabins();

    // Bookings need to be created LAST
    await createGuests();
    await createCabins();
    await createBookings();

    setIsLoading(false);
  }

  async function uploadBookings() {
    setIsLoading(true);
    await deleteBookings();
    await createBookings();
    setIsLoading(false);

    location.reload();
  }

  return (
    <>
      {showHint 
        ? <UploadHint>
            <div>
              <span>Load current data</span>
              <IconContainer>
                <IoIosClose size={20} color='var(--color-indigo-700)' onClick={() => setShowHint(false)} />
              </IconContainer>
            </div>
            <GoArrowDownLeft size={18} />
          </UploadHint>
        : ''
      }
      <UploadContainer title='Upload current data' open={open}>
        <UploadOpener open={open} onClick={() => {
          if (showHint) {
            setShowHint(false);
          }
          setOpen(prev => !prev);
        }}>
          {open 
            ? <IoIosClose size={24} color='var(--color-indigo-700)' /> 
            : <IoIosArrowForward size={18} color='var (--color-indigo-700)' />
          }
        </UploadOpener>
        <UploadArea>
          <p>Load current bookings</p>
          <Button $size='small' $variation='primary' onClick={uploadBookings} disabled={isLoading}>
            Load data
          </Button>
        </UploadArea>
      </UploadContainer>
    </>
  );
}
