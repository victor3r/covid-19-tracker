import React, { MouseEvent } from 'react';
import { CardContent } from '@material-ui/core';
import numeral from 'numeral';

import { Container, Cases, Title, Total } from './styles';

interface InfoBoxProps {
  casesType: 'cases' | 'deaths' | 'recovered';
  isActive: boolean;
  title: string;
  cases: number;
  total: number;
  onClick: (event: MouseEvent<HTMLDivElement>) => void;
}

const InfoBox: React.FC<InfoBoxProps> = ({
  title,
  cases,
  total,
  onClick,
  isActive,
  casesType,
}) => {
  return (
    <Container onClick={onClick} isActive={isActive} casesType={casesType}>
      <CardContent>
        <Title color="textSecondary">{title}</Title>
        <Cases casesType={casesType}>{numeral(cases).format('+0.0a')}</Cases>
        <Total color="textSecondary">
          {`${numeral(total).format('0.0a')} Total`}
        </Total>
      </CardContent>
    </Container>
  );
};

export default InfoBox;
