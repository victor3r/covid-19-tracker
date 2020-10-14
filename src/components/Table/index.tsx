import React from 'react';

import { TableData } from '../../pages/Dashboard';

import { Container } from './styles';

interface TableProps {
  countries: TableData[];
}

const Table: React.FC<TableProps> = ({ countries }) => {
  return (
    <Container>
      <table>
        {countries.map(({ name, totalCases }) => (
          <tr>
            <td>{name}</td>
            <td>
              <strong>{totalCases}</strong>
            </td>
          </tr>
        ))}
      </table>
    </Container>
  );
};

export default Table;
