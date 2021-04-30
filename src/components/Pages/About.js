import React, { Fragment, useContext, useEffect } from 'react';
import DashboardContext from '../../Context/DashboardContext';
import AboutLinks from '../layout/AboutLinks';
import styled from 'styled-components';

const AboutContainer = styled.div`
  font-size: var(--m-length-l);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 40px;
  p {
    margin: 20px;
    font-size: var(--m-length-m);
  }
  ul {
    margin: 20px;
  }
  li {
    margin: 10px;
  }
  h4 {
    margin-top: 20px;
  }
  a {
    color: var(--main-color-purple);
  }
`;

const AboutInfo = styled.div`
  display: grid;
  grid-template-columns: 2fr auto 1fr;
  align-items: center;
  justify-content: center;
`;

const About = ({ location }) => {
  const dashboardContext = useContext(DashboardContext);
  const { setPage } = dashboardContext;

  useEffect(() => {
    setPage(location.pathname);
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <AboutContainer>
        <div>
          <h1 style={{ textAlign: 'center' }}>About</h1>
          <p>
            This is a cryptocurrency dashboard where you can lookup the latest
            pricing and trends for over 6000 cryptocurrencies.
          </p>
          <p>
            <h2>Dependencies used:</h2>
            <ul>
              <li>ReactJs, React Router</li>
              <li>Context API</li>
              <li>React Styled-Components</li>
              <li>
                {' '}
                Cryptocompare API : -- for fetching latest info of various
                currencies. Click{' '}
                <a
                  target='_blank'
                  rel='noreferrer'
                  href='https://www.cryptocompare.com/'
                >
                  here
                </a>{' '}
                to check out the API
              </li>{' '}
              <li>
                {' '}
                React Highcharts : -- for visualising the data fetched. Click{' '}
                <a target='_blank' href=' https://www.highcharts.com/'>
                  here
                </a>{' '}
                to checkout highcarts{' '}
              </li>
              <li>
                Moment : -- A JavaScript date library for parsing, validating,
                manipulating, and formatting dates.
              </li>
            </ul>
          </p>
          <AboutInfo>
            <p>
              <h4> Designed and developed by </h4>
              <h1 style={{ color: 'var(--font-color-3)' }}>Pranav Shukla.</h1>
            </p>
            <div></div>
            <p style={{ float: 'right' }}>
              <a
                target='_blank'
                rel='noreferrer'
                href='https://pranav-shukla.netlify.app/'
              >
                Click to checkout my other projects.
              </a>{' '}
              <br />
              <br />
              <span style={{ color: 'var(--font-color-3)' }}>
                {' '}
                I'm open to front-end dev opportunities.
              </span>
              <br />
              <br />
              <span style={{ color: 'var(--font-color-3)' }}>
                {' '}
                Thankyou for visiting!! Toodles...
              </span>
              <br />
            </p>
          </AboutInfo>

          <AboutLinks></AboutLinks>
        </div>
      </AboutContainer>
    </Fragment>
  );
};

export default About;
