import styled from 'styled-components';

export const Container = styled.div`
  height: 31.25rem;
  background-color: white;
  padding: 1rem;
  border-radius: 1.25rem;
  margin-top: 1rem;
  box-shadow: 0 0 0.5rem -0.25rem rgba(0, 0, 0, 0.5);

  & .leaflet-container {
    height: 100%;
  }
`;
