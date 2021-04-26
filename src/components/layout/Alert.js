import React, { useContext } from 'react';
import DashboardContext from '../../Context/DashboardContext';

const Alert = ({ alert }) => {
  const dashboardContext = useContext(DashboardContext);

  return (
    dashboardContext.alert != null && (
      <div
        className={`alert alert-${dashboardContext.alert.type}`}
        style={{
          color: 'red',
          opacity: '0.7',
          textAlign: 'center',
          margin: '10px',
        }}
      >
        <i className='fas fa-info-circle'>{dashboardContext.alert.msg}</i>
      </div>
    )
  );
};

export default Alert;
