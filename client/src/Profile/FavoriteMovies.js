import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Container } from 'reactstrap';
import Spinner from '../Spinner/Spinner';
import classes from './Profile.module.css';
import Movie from '../MainPage/Movie';
import { getFavMovies } from '../store/actions/profile';
const FavoriteMovies = (props) => {
  //const favMovies = useSelector((state) => state.auth.user.favoriteMovies);
  const movies = useSelector((state) => state.profile.user.favoriteMovies);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFavMovies(movies));
  }, []);

  return (
    <div className={classes.image}>
      {!movies ? (
        <Spinner />
      ) : (
        <Container>
          <Row xs='3'>
            {movies.map((x) => {
              console.log(x._id);
              return (
                <Movie
                  key={x._id}
                  movie={x}
                  isFav={true}
                  personId={props.match.params.person}
                />
              );
            })}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default FavoriteMovies;
