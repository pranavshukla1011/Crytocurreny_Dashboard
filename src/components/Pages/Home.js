import React, { Fragment, useContext, useEffect } from 'react';
import DashboardContext from '../../Context/DashboardContext';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Spinner from '../layout/spinner';

const Home = ({ location }) => {
  const dashboardContext = useContext(DashboardContext);

  const { favourites, firstVisit, setPage, setFirstVisit } = dashboardContext;

  useEffect(() => {
    setPage(location.pathname);
    // eslint-disable-next-line
    setFirstVisit();
  }, [firstVisit]);

  const MainDiv = styled.div`
    text-align: center;
    display: flex;
    flex-direction: column;
    // border: 2px solid white;
    align-items: center;
    justify-content: center;
    height: 60vh;
    color: var(--font-color-3);

    & h1 {
      font-size: var(--l-length-m);
    }

    & h2 {
      font-size: var(--l-length-s);
    }

    & h3 {
      margin: var(--m-length-m) 0 0 0;
      font-size: var(--m-length-m);
    }
  `;

  const StyledLink = styled(Link)`
    text-decoration: none;
    color: var(--font-color-3);
    border: 2px solid var(--main-color-purple);
    border-radius: var(--m-length-m);
    padding: 10px;
    font-size: var(--m-length-l);
    text-shadow: 0px 0px var(--s-length-l) var(--main-color-pink);
    transition-property: transform, text-shadow, color;
    transition-duration: 150ms;
    transition-iming-function: ease-in-out;
    &:hover {
      text-shadow: none;
      transform: scale(1.1, 1.1);
      color: var(--font-color-2);
    }
  `;

  if (dashboardContext.loading === true) {
    return <Spinner />;
  } else {
    return (
      <div className='container'>
        <MainDiv>
          {firstVisit === true || firstVisit == null ? (
            <Fragment>
              <h1>Hi Newbie...</h1>
              <h2>Welcome to CryptoCurrency Dashboard.</h2>
              <br />
            </Fragment>
          ) : (
            <Fragment>
              <h1>Glad to have you back...</h1>
              <br />
            </Fragment>
          )}
          {favourites === null ? (
            <Fragment>
              <h3>
                Please click the <i>Settings</i> tab to setup you currency to
                get started.
              </h3>
              <br />
              <StyledLink to='/settings'>
                <p>Settings</p>
              </StyledLink>
            </Fragment>
          ) : (
            <Fragment>
              <h3>
                Please click the <i>Dashboard</i> tab to view your currency.
              </h3>
              <br />
              <StyledLink to='/dashboard'>
                <p>Dashboard</p>
              </StyledLink>
            </Fragment>
          )}
        </MainDiv>
      </div>
    );
  }
};

export default Home;
