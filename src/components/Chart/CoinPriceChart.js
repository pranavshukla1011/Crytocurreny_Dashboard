import React, { Fragment } from 'react';
import ReactHighCharts from 'react-highcharts';
import '../Chart/HighCharts.css';
const config = {
  title: {
    text: '',
  },
  subtitle: {
    text: 'Source: WorldClimate.com',
    verticalAlign: 'bottom',
    y: 30,
  },
  xAxis: {
    categories: [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ],
  },
  yAxis: {
    title: {
      text: '',
    },
  },
  colors: [
    'var(--main-color-purple)',
    'var(--main-color-pink)',
    'orange',
    'green',
    'yellow',
    'voilet',
    'teal',
    'peach',
    '#df5353',
    '#7798bf',
    '#aaeeee',
  ],
  tooltip: {
    valueSuffix: '°C',
  },
  legend: {
    borderWidth: 0,
    margin: 12,
    itemStyle: {
      color: 'var(--font-color-2)',
      cursor: 'pointer',
      fontSize: '1rem',
      fontWeight: 'normal',
      textOverflow: 'ellipsis',
    },
    itemMarginTop: 5,
  },
  series: [
    {
      name: 'Tokyo',
      data: [
        7.0,
        6.9,
        9.5,
        14.5,
        18.2,
        21.5,
        25.2,
        26.5,
        23.3,
        18.3,
        13.9,
        9.6,
      ],
    },
    {
      name: 'New York',
      data: [
        -0.2,
        0.8,
        5.7,
        11.3,
        17.0,
        22.0,
        24.8,
        24.1,
        20.1,
        14.1,
        8.6,
        2.5,
      ],
    },
    {
      name: 'Berlin',
      data: [-0.9, 0.6, 3.5, 8.4, 13.5, 17.0, 18.6, 17.9, 14.3, 9.0, 3.9, 1.0],
    },
    {
      name: 'London',
      data: [3.9, 4.2, 5.7, 8.5, 11.9, 15.2, 17.0, 16.6, 14.2, 10.3, 6.6, 4.8],
    },
    {
      name: 'George',
      data: [-0.9, 0.3, 3.2, 8.4, 13.5, 12.0, 11.6, 17.9, 15.3, 0.0, 1.9, 3.0],
    },
    {
      name: 'of',
      data: [-0.9, 1.6, 4.5, 9.4, 3.5, 10.0, 19.6, 7.9, 6.3, 6.0, 4.9, 11.0],
    },
    {
      name: 'Jungle',
      data: [
        -3.9,
        2.6,
        1.5,
        6.4,
        18.5,
        11.0,
        12.6,
        10.9,
        -14.3,
        -9.0,
        -3.9,
        -1.0,
      ],
    },
    {
      name: 'of',
      data: [
        -0.9,
        -1.6,
        -4.5,
        -9.4,
        -3.5,
        -10.0,
        -19.6,
        -7.9,
        -6.3,
        -6.0,
        -4.9,
        -11.0,
      ],
    },
    {
      name: 'of',
      data: [
        -0.9,
        1.6,
        4.5,
        9.4,
        -3.5,
        10.0,
        19.6,
        -7.9,
        -6.3,
        6.0,
        4.9,
        -11.0,
      ],
    },
    {
      name: 'of',
      data: [
        -0.9,
        -1.6,
        4.5,
        -9.4,
        3.5,
        -10.0,
        -19.6,
        7.9,
        -6.3,
        -6.0,
        -4.9,
        11.0,
      ],
    },
  ],
};

export const CoinPriceChart = () => {
  return (
    <Fragment>
      <ReactHighCharts config={config}></ReactHighCharts>
    </Fragment>
  );
};
export default CoinPriceChart;
