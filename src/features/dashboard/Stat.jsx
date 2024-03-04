import styled from 'styled-components';
import { devices } from '../../utils/devices';

const StyledStat = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);

  padding: 1.6rem;
  display: grid;
  grid-template-columns: 6.4rem 1fr;
  grid-template-rows: auto auto;
  column-gap: 1.6rem;
  row-gap: 0.4rem;

  @media ${devices.xl} {
    padding: 1.2rem;
    grid-template-columns: 4.8rem 1fr;
  }

  @media ${devices.lg} {
    padding: 1rem;
    grid-template-columns: 4.2rem 1fr;
  }

  @media ${devices.xs} {
    padding: 0.8rem;
  }

  @media ${devices.xxs} {
    padding: 0.5rem;
  }
`;

const Icon = styled.div`
  grid-row: 1 / -1;
  aspect-ratio: 1;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Make these dynamic, based on the received prop */
  background-color: var(--color-${(props) => props.color}-100);

  & svg {
    width: 3.2rem;
    height: 3.2rem;
    color: var(--color-${(props) => props.color}-700);
  }
`;

const Title = styled.h5`
  align-self: end;
  font-size: 1.2rem;
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-500);

  @media ${devices.xs} {
    font-size: 1.1rem;
  }

  @media ${devices.xxs} {
    font-size: 1rem;
  }
`;

const Value = styled.p`
  font-size: 2.4rem;
  line-height: 1;
  font-weight: 500;

  @media ${devices.xl} {
    font-size: 2.2rem;
  }

  @media ${devices.lg} {
    font-size: 2rem;
  }

  @media ${devices.xs} {
    font-size: 1.6rem;
  }

  @media ${devices.xxs} {
    font-size: 1.4rem;
  }
`;

function Stat({ icon, title, value, color }) {
  return (
    <StyledStat>
      <Icon color={color}>{icon}</Icon>
      <Title>{title}</Title>
      <Value>{value}</Value>
    </StyledStat>
  );
}

export default Stat;
