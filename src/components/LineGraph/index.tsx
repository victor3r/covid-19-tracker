import React, { useState, useEffect, useCallback } from 'react';
import { Line } from 'react-chartjs-2';

import api from '../../services/api';
import graphConfig from '../../config/graph';
import casesTypeColors from '../../utils/casesTypeColors';

import { Container } from './styles';

interface ChartData {
  x: string;
  y: number;
}

interface Historical {
  cases: {
    [key: string]: number;
  };
  deaths: {
    [key: string]: number;
  };
  recovered: {
    [key: string]: number;
  };
}

interface LineGraphProps {
  historicalType: 'cases' | 'deaths' | 'recovered';
}

const LineGraph: React.FC<LineGraphProps> = ({ historicalType }) => {
  const [chartData, setChartData] = useState<ChartData[]>([]);

  const buildChartData = useCallback(
    (historical: Historical, type: 'cases' | 'deaths' | 'recovered') =>
      Object.entries(historical[type]).map((date, index, array) => ({
        x: date[0],
        y: !index ? date[1] : date[1] - array[index - 1][1],
      })),
    [],
  );

  useEffect(() => {
    api
      .get('historical/all', {
        params: { lastdays: 120 },
      })
      .then(response => {
        const chartDataShifted = buildChartData(response.data, historicalType);
        chartDataShifted.shift();
        setChartData(chartDataShifted);
      });
  }, [buildChartData, historicalType]);

  return (
    <Container>
      <Line
        options={graphConfig}
        data={{
          datasets: [
            {
              backgroundColor: casesTypeColors[historicalType].half_op,
              borderColor: casesTypeColors[historicalType].hex,
              data: chartData,
            },
          ],
        }}
      />
    </Container>
  );
};

export default LineGraph;
