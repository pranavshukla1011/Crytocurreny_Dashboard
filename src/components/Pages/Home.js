import React, { useContext, useEffect, Fragment } from 'react';
import DashboardContext from '../../Context/DashboardContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Home = ({ location }) => {
  const dashboardContext = useContext(DashboardContext);

  const { setPage, firstVisit } = dashboardContext;

  useEffect(() => {
    setPage(location.pathname);
    // eslint-disable-next-line
  }, []);

  const MainDiv = styled.div`
    text-align: center;
    border: 2px black solid;
    margin-top: 50px;
    color: var(--font-color-2);
  `;

  const LinkStyle = {
    textDecoration: 'none',
  };

  const Button = () => {
    return (
      <Link
        style={LinkStyle}
        to={firstVisit ? '/settings' : '/dashboard'}
      ></Link>
    );
  };

  return (
    <div className='container'>
      {firstVisit === true ? (
        <MainDiv>
          <h1>Hello,New User</h1>
          <h2>Welcome to CryptoCurrency Dashboard.</h2>
          <br />
          <h2>
            Please click the <i>Settings</i> tab to setup you currency to get
            started.
          </h2>
          <br />
          <Button />
        </MainDiv>
      ) : (
        <MainDiv>
          <strong>Glad to have you back...</strong> <br /> Please move to
          <i> Dashboard </i> tab to get started.
          <br />
          <Button></Button>
        </MainDiv>
      )}
    </div>
  );
};

export default Home;
