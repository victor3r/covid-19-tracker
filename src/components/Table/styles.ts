import styled from 'styled-components';

export const Container = styled.div`
  margin-top: 1.25rem;
  overflow-y: auto;
  height: 25rem;
  color: #6a5d5d;
  background-color: white;

  & > table {
    display: flex;
    flex-direction: column;

    & td {
      padding: 0.5rem;
    }

    & tr {
      display: flex;
      justify-content: space-between;

      &:nth-of-type(odd) {
        background-color: #f3f2f8;
      }
    }
  }
`;
