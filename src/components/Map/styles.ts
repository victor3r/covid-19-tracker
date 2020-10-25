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

export const InfoContainer = styled.div``;

export const InfoFlag = styled.div`
  height: 5rem;
  width: 100%;
  background-size: cover;
  border-radius: 0.5rem;

  & img {
    width: 6.25rem;
    border-radius: 0.3125rem;
  }
`;

export const InfoName = styled.div`
  font-size: 1.25rem;
  font-weight: bold;
  color: #555;
`;

export const InfoCases = styled.div`
  font-size: 1rem;
  margin-top: 0.3125rem;
`;
