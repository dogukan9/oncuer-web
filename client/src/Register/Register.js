import React, { useState } from 'react';
import classes from './Landing.module.css';
import { Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../store/actions/auth';
import Alert from '../Alert/Alert';

const Register = (props) => {
  const alerts = useSelector((state) => state.alert.alerts);

  const successRegister = useSelector((state) => state.auth.successRegister);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const { username, email, password } = formData;
  const onChange = (e) => {
    e.preventDefault();

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(register(username, email, password));
  };
  if (successRegister) {
    return <Redirect to='/' />;
  }
  return (
    <div className={`${classes.image}`}>
      <div className='container'>
        <div className={classes.box}>
          {alerts && <Alert />}
          <form onSubmit={(e) => onSubmit(e)}>
            <div className={classes.inputs}>
              <h4 style={{ display: 'block' }}>Register Page</h4>
              <label>Username: </label>
              <input
                type='text'
                name='username'
                required
                value={username}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className={classes.inputs}>
              <label>Email: </label>
              <input
                type='email'
                name='email'
                value={email}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className={classes.inputs}>
              <label>Password: </label>
              <input
                type='password'
                name='password'
                required
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className={classes.inputs}>
              <input
                type='submit'
                className='btn btn-primary my-1'
                value='Register'
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
