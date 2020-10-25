import React from 'react';
import { CardContent } from '@material-ui/core';
import numeral from 'numeral';

import { Container, Cases, Title, Total } from './styles';

interface InfoBoxProps {
  title: string;
  cases: number;
  total: number;
}

const InfoBox: React.FC<InfoBoxProps> = ({ title, cases, total }) => {
  return (
    <Container>
      <CardContent>
        <Title color="textSecondary">{title}</Title>
        <Cases>{numeral(cases).format('0,0')}</Cases>
        <Total color="textSecondary">
          {`${numeral(total).format('0,0')} Total`}
        </Total>
      </CardContent>
    </Container>
  );
};

export default InfoBox;
