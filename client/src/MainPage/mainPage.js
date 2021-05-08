import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Col, Container } from 'reactstrap';
//import Stories from "./Stories";
import Movie from './Movie';
import Story from './Story';
import Spinner from '../Spinner/Spinner';

//import { loadUser } from '../store/actions/auth';
import classes from './Main.module.css';
import { getFavMovies, getFavStories } from '../store/actions/profile';
const MainPage = (props) => {
  const dispatch = useDispatch();
  const movies = useSelector((state) => state.moviesAndstories.movies);
  const stories = useSelector((state) => state.moviesAndstories.stories);
  const loading = useSelector((state) => state.auth.loading);
  const user = useSelector((state) => state.auth.user);
  /* useEffect(() => {
    dispatch(getFavMovies(user.favoriteMovies));
    dispatch(getFavStories(user.favoriteStories));
  }, [dispatch]);*/
  return (
    <div className={classes.image}>
      {loading && user ? (
        <Spinner />
      ) : (
        <Container>
          <Row>
            <Col xs='6'>
              {movies.map((x) => {
                return <Movie key={x._id} movie={x} />;
              })}
            </Col>
            <Col xs='6'>
              {' '}
              {stories.map((x) => {
                return <Story key={x._id} story={x} />;
              })}
            </Col>
          </Row>
        </Container>
      )}
    </div>
  );
};

export default MainPage;
