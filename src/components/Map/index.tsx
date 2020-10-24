import React from 'react';
import { Map as LeafletMap, TileLayer, Circle, Popup } from 'react-leaflet';

import { MapCountry } from '../../pages/Dashboard';
import casesTypeColors from '../../utils/casesTypeColors';

import { Container } from './styles';

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
            // fillColor={casesTypeColors[casesType].hex}
            radius={Math.sqrt(
              country[casesType] * casesTypeColors[casesType].multiplier,
            )}
          >
            <Popup>IM A POPUP</Popup>
          </Circle>
        ))}
      </LeafletMap>
    </Container>
  );
};

export default Map;
