import React, { Fragment, useContext, useEffect } from 'react';
import DashboardContext from '../../Context/DashboardContext';

const About = ({ location }) => {
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
  return (
    <Fragment>
      <h1>About</h1>
      <p>This is a cryptocurrency dashboard.</p>
    </Fragment>
  );
};

export default About;
