import numeral from 'numeral';

export default {
  legend: { display: false },
  elements: { point: { radius: 0 } },
  maintainAspectRatio: false,
  tooltips: {
    mode: 'index',
    intersect: false,
    callbacks: {
      label: (tooltipItem: { value: number }, data: unknown): string =>
        numeral(tooltipItem.value).format('+0,0'),
    },
  },
  scales: {
    xAxes: [
      {
        type: 'time',
        time: { parser: 'MM/DD/YY', tooltipFormat: 'll' },
      },
    ],
    yAxes: [
      {
        gridLines: { display: false },
        ticks: {
          callback: (value: number, index: unknown, values: unknown): string =>
            numeral(value).format('0a'),
        },
      },
    ],
  },
};
