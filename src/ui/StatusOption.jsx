import styled, { css } from 'styled-components';

const variations = {
  unconfirmed: css`
    color: var(--color-blue-700); 
    background-color: var(--color-blue-100);
  `,
  'checked-in': css`
    color: var(--color-green-700);
    background-color: var(--color-green-100);
  `,
  'checked-out': css`
    color: var(--color-silver-700);
    background-color: var(--color-silver-100);
  `,
};

const StatusOption = styled.option`
  ${(props) => variations[props.$variation] + ';'}
`;

export default StatusOption;
