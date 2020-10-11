import styled from 'styled-components';
import { FormControl, Card } from '@material-ui/core';

export const Container = styled.div`
  display: flex;
  justify-content: space-evenly;
  padding: 1.25rem;

  @media (max-width: 61.875rem) {
    & {
      flex-direction: column;
    }
  }
`;

export const Header = styled.header`
  display: flex;
  align-items: center;
  margin-bottom: 1.25rem;
  justify-content: space-between;
`;

export const Dropdown = styled(FormControl)``;

export const Stats = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Left = styled.main`
  flex: 0.9;
`;

export const Right = styled(Card)``;
