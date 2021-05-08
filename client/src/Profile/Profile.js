import React, { useEffect, Fragment, useState } from 'react';

import Spinner from '../Spinner/Spinner';

import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getProfileById, updateProfile } from '../store/actions/profile';
import classes from './Profile.module.css';
import { Button, Row, Col } from 'reactstrap';
const Profile = (props) => {
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(getProfileById(props.match.params.id));
  }, [getProfileById, props.match.params.id]);
  //const user = useSelector((state) => state.auth.user);
  const user = useSelector((state) => state.profile.user);

  const [infos, setInfos] = useState({
    age: auth ? auth.user.age : null,
    bio: auth ? auth.user.bio : null,
  });
  const { age, bio } = infos;
  const [edit, setEdit] = useState(false);
  const sendEdit = () => {
    setEdit((prev) => !prev);
    if (edit) {
      dispatch(updateProfile(age, bio));
    }
  };
  const onChange = (e) => {
    setInfos({
      ...infos,
      [e.target.name]: e.target.value,
    });
    console.log(bio, age);
  };
  return (
    <div>
      {auth.loading ? (
        <Spinner />
      ) : (
        <div className={`container ${classes.font}`}>
          {user && (
            <div className={classes.infos}>
              <img src={user.avatar} className={classes.img}></img>
              <h3>{user.username}</h3>
              <br />
              <br />
              <br />
              {edit ? (
                <div className={classes.p}>
                  {' '}
                  <label>Bio:</label>
                  <textarea
                    style={{ height: '8rem', width: '18rem' }}
                    name='bio'
                    onChange={(e) => onChange(e)}
                    value={bio}
                  />
                </div>
              ) : (
                <p className={classes.p}>
                  <strong>Hakkımda:</strong>
                  {user.bio}
                </p>
              )}

              {edit ? (
                <div className={classes.p}>
                  {' '}
                  <label>Yaş:</label>
                  <input
                    type='text'
                    onChange={(e) => onChange(e)}
                    value={age}
                    name='age'
                  />
                </div>
              ) : (
                <p className={classes.p}>
                  <strong>Yaş:</strong>
                  {user.age}
                </p>
              )}
            </div>
          )}

          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === props.match.params.id && (
              <Button
                onClick={sendEdit}
                className={`btn btn-dark ${classes.link}`}
              >
                {edit ? 'Kaydet' : 'Profili Güncelle'}
              </Button>
            )}
          <Link to='/main_page' className='btn btn-light'>
            Back to main page
          </Link>
        </div>
      )}
      <Row>
        <Col xs='6'>
          <Link
            to={`/favoriteMovies/${props.match.params.id}`}
            className={`btn btn-primary ${classes.buttonMovie} `}
          >
            <h1>
              <a
                style={{ color: 'white' }}
                href={`/favoriteMovies/${props.match.params.id}`}
              >
                Favorite Movies
              </a>
            </h1>{' '}
          </Link>
        </Col>
        <Col xs='6'>
          <Link
            to={`/favoriteStories/${props.match.params.id}`}
            className={`btn btn-primary ${classes.buttonMovie} `}
          >
            <Button
              className={`btn btn-primary ${classes.buttonStory} ${classes.boxes}`}
            >
              <h1>
                {' '}
                <a
                  style={{ color: 'white' }}
                  href={`/favoriteMovies/${props.match.params.id}`}
                >
                  Favorite Stories
                </a>
              </h1>{' '}
            </Button>
          </Link>
        </Col>
      </Row>
    </div>
  );
};

export default Profile;
