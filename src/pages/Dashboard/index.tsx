import React, { useState, useEffect, useCallback, ChangeEvent } from 'react';
import { AxiosResponse } from 'axios';
import { MenuItem, Select, CardContent } from '@material-ui/core';

import InfoBox from '../../components/InfoBox';
import Map from '../../components/Map';
import Table from '../../components/Table';
import LineGraph from '../../components/LineGraph';

import api from '../../services/api';
import sortData from '../../utils/sortData';

import { Container, Header, Dropdown, Stats, Left, Right } from './styles';

interface Country {
  name: string;
  value: string;
}

export interface MapCountry {
  country: string;
  lat: number;
  lng: number;
  cases: number;
  recovered: number;
  deaths: number;
  flag: string;
}

export interface TableData {
  name: string;
  totalCases: number;
}

interface COVID19CountryInfoResponse {
  country: string;
  todayCases: number;
  todayRecovered: number;
  todayDeaths: number;
  cases: number;
  recovered: number;
  deaths: number;
  countryInfo: {
    iso2: string;
    lat: number;
    long: number;
    flag: string;
  };
}

type CountryInfo = Omit<COVID19CountryInfoResponse, 'country' | 'countryInfo'>;

const Dashboard: React.FC = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountry, setSelectedCountry] = useState('worldwide');
  const [tableData, setTableData] = useState<TableData[]>([]);
  const [mapCountries, setMapCountries] = useState<MapCountry[]>([]);
  const [casesType, setCasesType] = useState<'cases' | 'recovered' | 'deaths'>(
    'cases',
  );
  const [casesTypeName, setCasesTypeName] = useState('Casos confirmados');
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });
  const [selectedCountryInfo, setSelectedCountryInfo] = useState<CountryInfo>(
    {} as CountryInfo,
  );

  useEffect(() => {
    api.get('all').then(response => {
      setSelectedCountryInfo(response.data);
    });
  }, []);

  useEffect(() => {
    api.get<COVID19CountryInfoResponse[]>('countries').then(({ data }) => {
      setCountries(
        data.map(({ country, countryInfo: { iso2 } }) => ({
          name: country,
          value: iso2,
        })),
      );

      setTableData(
        sortData(
          data.map(({ country, cases }) => ({
            name: country,
            totalCases: cases,
          })),
        ),
      );

      setMapCountries(
        data.map(
          ({
            cases,
            deaths,
            recovered,
            country,
            countryInfo: { lat, long, flag },
          }) => ({
            lat,
            lng: long,
            cases,
            deaths,
            recovered,
            country,
            flag,
          }),
        ),
      );
    });
  }, []);

  const handleSelectCountry = useCallback(
    async (event: ChangeEvent<{ value: unknown }>) => {
      const countryCode = event.target.value as string;
      let url: string;
      let response: AxiosResponse<COVID19CountryInfoResponse>;
      let coords: { lat: number; lng: number } = { lat: 0, lng: 0 };

      if (countryCode === 'worldwide') {
        url = 'all';
        response = await api.get<COVID19CountryInfoResponse>(url);
        coords = { lat: 0, lng: 0 };
      } else {
        url = `countries/${countryCode}`;
        response = await api.get<COVID19CountryInfoResponse>(url);
        coords = {
          lat: response.data.countryInfo.lat,
          lng: response.data.countryInfo.long,
        };
      }

      setMapCenter(coords);
      setSelectedCountry(countryCode);
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
              value={selectedCountry}
              onChange={handleSelectCountry}
            >
              <MenuItem value="worldwide">Mundial</MenuItem>
              {countries.map(country => (
                <MenuItem key={country.name} value={country.value}>
                  {country.name}
                </MenuItem>
              ))}
            </Select>
          </Dropdown>
        </Header>

        <Stats>
          <InfoBox
            casesType="cases"
            isActive={casesType === 'cases'}
            onClick={_ => {
              setCasesType('cases');
              setCasesTypeName('Casos confirmados');
            }}
            title="Casos Confirmados"
            cases={selectedCountryInfo.todayCases}
            total={selectedCountryInfo.cases}
          />
          <InfoBox
            casesType="recovered"
            isActive={casesType === 'recovered'}
            onClick={_ => {
              setCasesType('recovered');
              setCasesTypeName('Recuperados');
            }}
            title="Recuperados"
            cases={selectedCountryInfo.todayRecovered}
            total={selectedCountryInfo.recovered}
          />
          <InfoBox
            casesType="deaths"
            isActive={casesType === 'deaths'}
            onClick={_ => {
              setCasesType('deaths');
              setCasesTypeName('Mortes');
            }}
            title="Mortes"
            cases={selectedCountryInfo.todayDeaths}
            total={selectedCountryInfo.deaths}
          />
        </Stats>

        <Map
          countries={mapCountries}
          casesType={casesType}
          center={mapCenter}
          zoom={3}
        />
      </Left>

      <Right>
        <CardContent>
          <h3>Casos em Tempo Real por País</h3>
          <Table countries={tableData} />
          <h3>{`${casesTypeName} no mundo`}</h3>
          <LineGraph historicalType={casesType} />
        </CardContent>
      </Right>
    </Container>
  );
};

export default Dashboard;
