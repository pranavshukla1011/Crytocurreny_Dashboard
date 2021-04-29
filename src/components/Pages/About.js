import React, { Fragment, useContext, useEffect } from 'react';
import DashboardContext from '../../Context/DashboardContext';
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
      {/* "dependencies": {
    "@testing-library/jest-dom": "^5.11.4",
    "@testing-library/react": "^11.1.0",
    "@testing-library/user-event": "^12.1.10",
    "cryptocompare": "^1.0.0",
    "moment": "^2.29.1",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-highcharts": "^16.1.0",
    "react-router": "^5.2.0",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.3",
    "styled-components": "^5.2.3",
    "web-vit */}
      <AboutContainer>
        <div>
          <h1 style={{ textAlign: 'center' }}>About</h1>
          <p>
            This is a cryptocurrency dashboard where you can lookup the latest
            pricing and tends for over 6000 cryptocurrencies.
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
                <a target='_blank' href='https://www.cryptocompare.com/'>
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
            <p style={{ float: 'left' }}>
              <h4> Designed and developed by </h4>
              <h1>Pranav Shukla.</h1>
            </p>
            <div></div>
            <p style={{ float: 'right' }}>
              <a target='_blank' href='https://pranav-shukla.netlify.app/'>
                Click to checkout my other projects.
              </a>{' '}
              <br />
              <br />
              I'm open to front-end dev opportunities.
              <br />
              <br />
              Thankyou for visiting!! Toodles...
              <br />
            </p>
          </AboutInfo>
        </div>
      </AboutContainer>
    </Fragment>
  );
};

export default About;
