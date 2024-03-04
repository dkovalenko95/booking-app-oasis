import CheckoutButton from './CheckoutButton';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Button from '../../ui/Button';
import { Flag } from '../../ui/Flag';
import Tag from '../../ui/Tag';
import { devices } from '../../utils/devices';

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 2rem 1fr 9rem;
  /* grid-template-columns: 9rem 2rem 1fr 6.2rem 9rem; */
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  button, a {
      display: block;
      width: 100%;
    }

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
  /* &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  } */

  @media ${devices.sm} {
    grid-template-columns: 9rem 2rem 1fr 9rem;
  }

  @media ${devices.xs} {
    /* grid-template-columns: 9rem 2rem 1fr; */
    /* grid-auto-flow: dense; */
    grid-template-columns: 9rem 2rem 1fr;
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

const Nights = styled.div`
  margin-right: 1rem;

  @media ${devices.xl} {
    margin-right: 2rem;
  }
`;

const ButtonContainer = styled.div`
  @media ${devices.xs} {
    grid-column: 1 / span 3;

    button, a {
      display: block;
      width: 100%;
      padding: 0.8rem;
    }
  }
`;

const GuestContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.2rem;

  @media ${devices.sm} {
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0.2rem;
  }
`;

function TodayItem({ activity }) {
  const { id, status, Guests, numNights } = activity;

  const statusToAction = {
    'unconfirmed': {
      action: 'arriving',
      tag: 'green',
      button: (
        <Button
          $variation='primary'
          $size='small'
          as={Link}
          to={`/checkin/${id}`}
        >
          Check in
        </Button>
      ),
    },
    'checked-in': {
      action: 'departing',
      tag: 'blue',
      button: <CheckoutButton bookingId={id} />,
    },
  };

  return (
    <StyledTodayItem>
      <Tag $type={statusToAction[status].tag}>
        {statusToAction[status].action}
      </Tag>
      <Flag src={Guests.countryFlag} alt={`Flag of ${Guests.country}`} />
      <GuestContainer>
        <Guest>{Guests.fullName}</Guest>
        <Nights>{numNights} nights</Nights>
      </GuestContainer>

      <ButtonContainer>
        {statusToAction[status].button}
      </ButtonContainer>
    </StyledTodayItem>
  );
}

export default TodayItem;
