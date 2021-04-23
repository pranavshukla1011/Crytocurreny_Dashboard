import React, { useContext, useEffect, Fragment } from 'react';
import DashboardContext from '../../Context/DashboardContext';
import Spinner from '../layout/spinner';
import CoinPriceChart from '../Chart/CoinPriceChart';

const Dashboard = ({ location }) => {
  const dashboardContext = useContext(DashboardContext);
  const { firstVisit, setPage, setFirstVisit } = dashboardContext;

  useEffect(() => {
    setPage(location.pathname);
    // eslint-disable-next-line
    localStorage.setItem('firstVisit', JSON.stringify(false));
    setFirstVisit();
  }, [firstVisit]);

  if (dashboardContext.loading === true) {
    return <Spinner />;
  } else {
    return (
      <Fragment>
        <div>Dashboard</div>;
        <div>
          <CoinPriceChart />
        </div>
      </Fragment>
    );
  }
};

export default Dashboard;
