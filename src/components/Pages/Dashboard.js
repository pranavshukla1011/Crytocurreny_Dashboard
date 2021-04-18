import React, { useContext, useEffect } from 'react';
import DashboardContext from '../../Context/DashboardContext';

const Dashboard = ({ location }) => {
  const dashboardContext = useContext(DashboardContext);
  const {
    favourites,
    firstVisit,
    setPage,
    setFavourites,
    setFirstVisit,
  } = dashboardContext;

  useEffect(() => {
    setPage(location.pathname);
    // eslint-disable-next-line
  }, []);

  return <div>Dashboard</div>;
};

export default Dashboard;
