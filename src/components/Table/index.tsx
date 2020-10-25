import React from 'react';
import numeral from 'numeral';

import { TableData } from '../../pages/Dashboard';

import { Container } from './styles';

interface TableProps {
  countries: TableData[];
}

const Table: React.FC<TableProps> = ({ countries }) => {
  return (
    <Container>
      <table>
        <tbody>
          {countries.map(({ name, totalCases }) => (
            <tr key={name}>
              <td>{name}</td>
              <td>
                <strong>{numeral(totalCases).format('0,0')}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
};

export default Table;
