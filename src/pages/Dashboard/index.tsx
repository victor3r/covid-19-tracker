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

interface CountryInfo {
  todayCases: number;
  todayRecovered: number;
  todayDeaths: number;
  cases: number;
  recovered: number;
  deaths: number;
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
  const [selectedCountryInfo, setSelectedCountryInfo] = useState<CountryInfo>(
    {} as CountryInfo,
  );

  useEffect(() => {
    api.get('all').then(response => {
      setSelectedCountryInfo(response.data);
    });
  }, []);

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
    async (event: ChangeEvent<{ value: unknown }>) => {
      const countryCode = event.target.value as string;

      setSelectedCountryCode(countryCode);

      const url =
        countryCode === 'worldwide' ? 'all' : `countries/${countryCode}`;

      const response = await api.get(url);

      setSelectedCountryInfo(response.data);
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
          <InfoBox
            title="Casos Confirmados"
            cases={selectedCountryInfo.todayCases}
            total={selectedCountryInfo.cases}
          />
          <InfoBox
            title="Recuperados"
            cases={selectedCountryInfo.todayRecovered}
            total={selectedCountryInfo.recovered}
          />
          <InfoBox
            title="Mortes"
            cases={selectedCountryInfo.todayDeaths}
            total={selectedCountryInfo.deaths}
          />
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
