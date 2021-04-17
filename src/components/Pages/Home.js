import React, { useContext, useEffect } from 'react';
import DashboardContext from '../../Context/DashboardContext';

const Home = ({ location }) => {
  const dashboardContext = useContext(DashboardContext);

  const { setPage } = dashboardContext;

  useEffect(() => {
    setPage(location.pathname);
    // eslint-disable-next-line
  }, []);

  return <div>Home</div>;
};

export default Home;
