import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';

import { MenuItem, Select, CardContent } from '@material-ui/core';

import api from '../../services/api';

import InfoBox from '../../components/InfoBox';
import Map from '../../components/Map';

import { Container, Header, Dropdown, Stats, Left, Right } from './styles';

interface Country {
  name: string;
  value: string;
}

interface COVID19CountriesResponse {
  country: string;
  countryInfo: {
    iso2: string;
  };
}

const Dashboard: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('worldwide');

  useEffect(() => {
    api.get<COVID19CountriesResponse[]>('countries').then(response => {
      setCountries(
        response.data.map(country => ({
          name: country.country,
          value: country.countryInfo.iso2,
        })),
      );
    });
  }, []);

  const handleSelectCountryCode = useCallback(
    (event: ChangeEvent<{ value: unknown }>) => {
      const countryCode = event.target.value as string;

      setSelectedCountryCode(countryCode);
    },
    [],
  );

  return (
    <Container>
      <Left>
        <Header>
          <h1>Monitor COVID 19</h1>
          <Dropdown>
            <Select
              variant="outlined"
              value={selectedCountryCode}
              onChange={handleSelectCountryCode}
            >
              <MenuItem value="worldwide">Mundial</MenuItem>
              {countries.map(country => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}
            </Select>
          </Dropdown>
        </Header>

        <Stats>
          <InfoBox title="Casos confirmados" cases={5000} total={2000} />
          <InfoBox title="Recuperados" cases={5000} total={3000} />
          <InfoBox title="Mortes" cases={5000} total={400} />
        </Stats>

        <Map />
      </Left>

      <Right>
        <CardContent>
          <h3>Casos em Tempo Real por País</h3>
          <h3>Novos casos mundiais</h3>
        </CardContent>
      </Right>
    </Container>
  );
};

export default Dashboard;
