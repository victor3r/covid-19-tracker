import styled, { css } from 'styled-components';
import { Card, Typography } from '@material-ui/core';

import casesTypeColors from '../../utils/casesTypeColors';

interface ContainerProps {
  isActive: boolean;
  casesType: 'cases' | 'deaths' | 'recovered';
}

type CasesProps = Pick<ContainerProps, 'casesType'>;

export const Container = styled(Card)<ContainerProps>`
  flex: 1;
  border-top: 0.625rem solid transparent;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 0.9375rem;
  }

  ${({ isActive, casesType }) =>
    isActive &&
    css`
      border-top: 0.625rem solid ${casesTypeColors[casesType].hex};
    `}
`;

export const Cases = styled.h2<CasesProps>`
  font-weight: 600;
  font-size: 1.75rem;
  margin-bottom: 0.5rem;

  ${({ casesType }) =>
    casesType &&
    css`
      color: ${casesTypeColors[casesType].hex};
    `}
`;

export const Title = styled(Typography)``;

export const Total = styled(Typography)`
  color: #6c757d;
  font-weight: 700 !important;
  font-size: 0.8rem !important;
  margin-top: 0.9375rem !important;
`;
