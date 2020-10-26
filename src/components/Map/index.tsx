import React from 'react';
import { Map as LeafletMap, TileLayer, Circle, Popup } from 'react-leaflet';
import numeral from 'numeral';

import { MapCountry } from '../../pages/Dashboard';
import casesTypeColors from '../../utils/casesTypeColors';

import {
  Container,
  InfoContainer,
  InfoFlag,
  InfoName,
  InfoCases,
} from './styles';

interface MapProps {
  countries: MapCountry[];
  casesType: 'cases' | 'deaths' | 'recovered';
  center: { lat: number; lng: number };
  zoom: number;
}

const Map: React.FC<MapProps> = ({ countries, casesType, center, zoom }) => {
  return (
    <Container>
      <LeafletMap center={center} zoom={zoom}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {countries.map(country => (
          <Circle
            key={country.country}
            center={[country.lat, country.lng]}
            fillOpacity={0.4}
            color={casesTypeColors[casesType].hex}
            radius={Math.sqrt(
              country[casesType] * casesTypeColors[casesType].multiplier,
            )}
          >
            <Popup>
              <InfoContainer>
                <InfoFlag
                  style={{
                    backgroundImage: `url(${country.flag})`,
                  }}
                />
                <InfoName>{country.country}</InfoName>
                <InfoCases>
                  {`Casos: ${numeral(country.cases).format('0,0')}`}
                </InfoCases>
                <InfoCases>
                  {`Recuperados: ${numeral(country.recovered).format('0,0')}`}
                </InfoCases>
                <InfoCases>
                  {`Mortes: ${numeral(country.deaths).format('0,0')}`}
                </InfoCases>
              </InfoContainer>
            </Popup>
          </Circle>
        ))}
      </LeafletMap>
    </Container>
  );
};

export default Map;
