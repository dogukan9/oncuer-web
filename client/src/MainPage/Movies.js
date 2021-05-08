import React from 'react';
import { useSelector } from 'react-redux';

import { Row, Container } from 'reactstrap';

import classes from './Main.module.css';
import Movie from './Movie';
import Spinner from '../Spinner/Spinner';
const Movies = () => {
  const movies = useSelector((state) => state.moviesAndstories.movies);
  const loading = useSelector((state) => state.auth.loading);
  return (
    <div className={classes.image}>
      {!movies ? (
        <Spinner />
      ) : (
        <Container>
          <Row xs='3'>
            {movies.map((x) => {
              console.log(x._id);
              return <Movie key={x._id} movie={x} />;
            })}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Movies;
