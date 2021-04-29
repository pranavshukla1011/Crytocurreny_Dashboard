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

const AboutLinks = styled.div`
  margin: 40px;
  display: flex;
  justify-content: center;
  a {
    font-size: var(--l-length-s);
    color: var(--font-color-3);
    margin: 40px;
    transition-property: color, transform, animation;
    transition-duration: 150ms;
    transition-timing-function: ease-in-out;
    &:hover {
      transform: scale(1.5, 1.5);
      color: var(--main-color-pink);
      animation: animate1 1.5s infinite alternate;
    }
  }
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
            <p>
              <h4> Designed and developed by </h4>
              <h1 style={{ color: 'var(--font-color-3)' }}>Pranav Shukla.</h1>
            </p>
            <div></div>
            <p style={{ float: 'right' }}>
              <a target='_blank' href='https://pranav-shukla.netlify.app/'>
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

          <AboutLinks>
            <a href='https://github.com/pranavshukla1011'>
              <i class='fab fa-github'></i>
            </a>

            <a href='https://www.linkedin.com/in/shuklapranav1011/'>
              <i class='fab fa-linkedin-in'></i>
            </a>

            <a
              target='_blank'
              href='https://mail.google.com/mail/u/1/?view=cm&fs=1&to=pranav.1011.shukla@gmail.com&tf=1'
            >
              <i class='fab fa-google'></i>
            </a>
            <a target='_blank' href='https://pranav-shukla.netlify.app/'>
              <i class='fas fa-at'></i>
            </a>
          </AboutLinks>
        </div>
      </AboutContainer>
    </Fragment>
  );
};

export default About;
