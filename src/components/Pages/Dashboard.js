import React, { useContext, useEffect } from 'react';
import DashboardContext from '../../Context/DashboardContext';
import Spinner from '../layout/spinner';

const Dashboard = ({ location }) => {
  const dashboardContext = useContext(DashboardContext);
  const {
    favourites,
    firstVisit,
    setPage,
    setFavourites,
    setFirstVisit,
    setCoinList,
  } = dashboardContext;

  useEffect(() => {
    setPage(location.pathname);
    // eslint-disable-next-line
    localStorage.setItem('firstVisit', JSON.stringify(false));
    setFirstVisit();
  }, [firstVisit]);

  if (dashboardContext.loading === true) {
    return <Spinner />;
  } else {
    return <div>Dashboard</div>;
  }
};

export default Dashboard;
