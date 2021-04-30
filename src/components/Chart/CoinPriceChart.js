import React, { Fragment, useContext } from 'react';
import ReactHighCharts from 'react-highcharts';
import '../Chart/HighCharts.css';
import DashboardContext from '../../Context/DashboardContext';

export const CoinPriceChart = () => {
  const dashboardContext = useContext(DashboardContext);
  const { chartSeries } = dashboardContext;

  const config = {
    title: {
      text: '',
    },
    subtitle: {
      text: '',
      verticalAlign: 'bottom',
      y: 30,
    },
    xAxis: { type: 'datetime' },
    yAxis: {
      title: {
        text: 'Price',
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

    series: chartSeries,
  };

  return (
    <Fragment>
      <ReactHighCharts config={config}></ReactHighCharts>
    </Fragment>
  );
};
export default CoinPriceChart;
