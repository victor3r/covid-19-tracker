import React from 'react';
import { CardContent } from '@material-ui/core';
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
        <Cases>{cases}</Cases>
        <Total color="textSecondary">{`${total} Total`}</Total>
      </CardContent>
    </Container>
  );
};

export default InfoBox;
