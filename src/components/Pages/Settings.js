import React, { useContext, useEffect } from 'react';
import DashboardContext from '../../Context/DashboardContext';

const Settings = ({ location }) => {
  const dashboardContext = useContext(DashboardContext);

  const { setPage } = dashboardContext;

  useEffect(() => {
    setPage(location.pathname);
    // eslint-disable-next-line
  }, []);

  return <div>Settings</div>;
};

export default Settings;
