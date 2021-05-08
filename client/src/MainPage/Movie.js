import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardSubtitle } from 'reactstrap';

import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classes from './Main.module.css';
import { useDispatch } from 'react-redux';
import {
  getMovie,
  likeMovie,
  dislikeMovie,
} from '../store/actions/movieAndstory';
import {
  likeFavMovie,
  dislikeFavMovie,
  removeCommentFavMovie,
  addCommentFavMovie,
} from '../store/actions/profile';
import Spinner from '../Spinner/Spinner';

const Movie = (props) => {
  const loading = useSelector((state) => state.auth.loading);

  const user = useSelector((state) => state.auth.user);
  let x = null;
  if (user) {
    x = props.movie.likes.find((temp) => temp._id === user._id);
  }
  const dispatch = useDispatch();

  return (
    <div className='container'>
      {loading ? (
        <Spinner />
      ) : (
        <Card className={`${classes.margin}`}>
          <CardImg
            style={{ maxHeight: '20rem' }}
            top
            width='100%'
            src={props.movie.imageUrl}
            alt='Card image cap'
          />

          <CardBody>
            <CardTitle tag='h5'>{props.movie.name}</CardTitle>
            <CardSubtitle tag='h6' className='mb-2 text-muted'>
              Category:{props.movie.category}
            </CardSubtitle>
            <CardSubtitle tag='h6' className='mb-2 text-muted'>
              Director:{props.movie.director}
            </CardSubtitle>
            <CardSubtitle tag='h6' className='mb-2 text-muted'>
              {x ? (
                <i
                  className='fas fa-heart'
                  onClick={() => {
                    props.isFav
                      ? dispatch(
                          dislikeFavMovie(
                            props.movie._id,
                            props.personId,
                            user._id
                          )
                        )
                      : dispatch(dislikeMovie(props.movie._id));
                  }}
                  style={{ color: 'red' }}
                ></i>
              ) : (
                <i
                  className='far fa-heart'
                  onClick={() => {
                    props.isFav
                      ? dispatch(
                          likeFavMovie(
                            props.movie._id,
                            props.personId,
                            user._id
                          )
                        )
                      : dispatch(likeMovie(props.movie._id));
                  }}
                ></i>
              )}
              {props.movie.likes.length}&nbsp;&nbsp;&nbsp;
              <i className='fas fa-comments'></i>
              {props.movie.comments.length}
            </CardSubtitle>
            {props.isFav ? (
              <Link
                onClick={(e) => {
                  dispatch(getMovie(props.movie._id));
                }}
                to={`/api/favoriteMovie/${props.movie._id}/${props.personId}`}
              >
                Detail
              </Link>
            ) : (
              <Link
                onClick={(e) => {
                  dispatch(getMovie(props.movie._id));
                }}
                to={`/api/movies/${props.movie._id}`}
              >
                Detail
              </Link>
            )}
          </CardBody>
        </Card>
      )}
    </div>
  );
};

export default Movie;
