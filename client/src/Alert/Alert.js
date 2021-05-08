import React from 'react';

import { useSelector } from 'react-redux';

const Alert = (props) => {
  const alerts = useSelector((state) => state.alert.alerts);

  return <div className={`alert alert-${alerts.alertType}`}>{alerts.msg}</div>;
};

export default Alert;
