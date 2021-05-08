import React, { useState } from 'react';
import classes from './Landing.module.css';
import { Button } from 'reactstrap';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../store/actions/auth';
import Alert from '../Alert/Alert';
//import { getMoviesAndStories } from '../store/actions/movieAndstory';
import Spinner from '../Spinner/Spinner';
const Landing = (props) => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const alerts = useSelector((state) => state.alert.alerts);
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const { email, password } = formData;
  const onChange = (e) => {
    e.preventDefault();

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  if (isAuthenticated) {
    return <Redirect to={`main_page`} />;
  }

  return (
    <div className={`${classes.image}`}>
      <div className='container'>
        {alerts && <Alert />}
        {loading ? (
          <Spinner />
        ) : (
          <div className={classes.box}>
            <form onSubmit={(e) => onSubmit(e)}>
              <div className={classes.inputs}>
                <h4 style={{ display: 'block' }}>Welcome to ÖNCÜER</h4>
                <span>
                  <i className='fas fa-user'></i>
                </span>
                <label>
                  Email:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;{' '}
                </label>
                <input
                  type='text'
                  name='email'
                  value={email}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className={classes.inputs}>
                <span>
                  <i className='fas fa-key'></i>
                </span>
                <label>Password:&nbsp;&nbsp;&nbsp; </label>
                <input
                  type='password'
                  name='password'
                  value={password}
                  onChange={(e) => onChange(e)}
                />
              </div>
              <div className={classes.inputs}>
                <button
                  type='submit'
                  className='btn btn-primary'
                  style={{ display: 'block', margin: 'auto' }}
                >
                  {' '}
                  Login
                </button>
                <p style={{ display: 'inline-block' }}>
                  Click here if you don't have an account-
                </p>
                <Button style={{ font: 'blue', backgroundColor: 'white' }}>
                  <Link to='/register'>Register</Link>
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
