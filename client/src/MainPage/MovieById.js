import React, { useState } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  Button,
  CardSubtitle,
  Col,
  Row,
} from 'reactstrap';
import Moment from 'react-moment';

import Spinner from '../Spinner/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { likeMovie, dislikeMovie } from '../store/actions/movieAndstory';
import classes from './Main.module.css';
import { Link } from 'react-router-dom';
import {
  removeCommentMovie,
  addCommentMovie,
} from '../store/actions/movieAndstory';

import {
  addFavoriteMovies,
  removeFavoriteMovies,
} from '../store/actions/profile';
const Movie = (props) => {
  const user = useSelector((state) => state.auth.user);
  const favMovies = useSelector((state) => state.profile.user.favoriteMovies);
  const dispatch = useDispatch();

  // const movie = useSelector((state) => state.moviesAndstories.movie);
  let movie = useSelector((state) => state.moviesAndstories.movies);
  movie = movie.find((temp) => temp._id === props.match.params.id);

  const [showCom, setShowCom] = useState(false);
  const [text, setText] = useState('');
  let x;
  let Fav;

  if (movie) {
    Fav = favMovies.find((fav) => fav._id === movie._id);
    x = movie.likes.find((temp) => temp._id === user._id);
  }

  return (
    <div>
      {movie ? (
        <Card className={classes.container}>
          <CardImg
            className={classes.CardImg}
            top
            width='100%'
            src={movie.imageUrl}
            alt='Card image cap'
          />

          <CardBody>
            <CardTitle tag='h5'>{movie.name}</CardTitle>
            <CardSubtitle tag='h5' className='mb-2 text-muted'>
              Category:{movie.category}
            </CardSubtitle>
            <CardSubtitle tag='h5' className='mb-2 text-muted'>
              Director:{movie.director}
            </CardSubtitle>
            <Row>
              <Col xs='10'>
                <CardSubtitle tag='h4' className='mb-2 text-muted'>
                  {x ? (
                    <i
                      className='fas fa-heart'
                      style={{ color: 'red' }}
                      onClick={() => {
                        dispatch(dislikeMovie(movie._id));
                      }}
                    ></i>
                  ) : (
                    <i
                      className='far fa-heart'
                      onClick={() => {
                        dispatch(likeMovie(movie._id));
                      }}
                    ></i>
                  )}
                  {movie.likes.length}&nbsp;&nbsp;&nbsp;
                  <i
                    className='fas fa-comments'
                    onClick={() => setShowCom((prev) => !prev)}
                  ></i>
                  {movie.comments.length}
                </CardSubtitle>
              </Col>
              <Col xs='2'>
                <Button
                  style={{ backgroundColor: 'green' }}
                  onClick={() => {
                    if (!Fav) {
                      console.log('ekle');
                      dispatch(addFavoriteMovies(movie._id));
                    } else {
                      console.log('cıkar');
                      dispatch(removeFavoriteMovies(movie._id));
                    }
                  }}
                >
                  {Fav ? 'Favorilerden Kaldır' : 'Favorilere Ekle'}
                </Button>
              </Col>
            </Row>
          </CardBody>
        </Card>
      ) : (
        <Spinner />
      )}
      {showCom && (
        <div className={classes.post}>
          <form
            className={classes.form}
            onSubmit={(e) => {
              e.preventDefault();

              dispatch(addCommentMovie(movie._id, text));
              setText('');
            }}
          >
            <textarea
              className={classes.form}
              name='text'
              cols='90'
              rows='5'
              placeholder='Yorumunu Yaz'
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
            ></textarea>
            <input type='submit' className='btn btn-dark my-1' value='Gönder' />
          </form>

          {movie.comments.map((com) => {
            return (
              <Card className={classes.comment}>
                <CardBody>
                  <Row>
                    <Col xs='3'>
                      <Link to={`/profile/${com.user}`}>
                        <img
                          className={classes.roundimg}
                          src={user.avatar}
                          alt=''
                        />

                        <CardSubtitle tag='h4' className={classes.commentName}>
                          {com.username}
                        </CardSubtitle>
                      </Link>
                    </Col>
                    <Col xs='9'>
                      <div>
                        <CardSubtitle
                          className={classes.commentText}
                          class='my-1'
                        >
                          <strong>{com.text}</strong>
                        </CardSubtitle>
                        <CardSubtitle tag='h5' className={classes.tarih}>
                          Yayınlandı{' '}
                          <Moment format='YYYY/MM/DD'>{com.date}</Moment>
                          {!user.loading && com.user === user._id && (
                            <button
                              className={`btn btn-danger ${classes.buton}`}
                              onClick={(e) => {
                                dispatch(
                                  removeCommentMovie(com._id, movie._id)
                                );
                              }}
                              type='button'
                            >
                              {' '}
                              <i className='fas fa-times' />
                            </button>
                          )}
                        </CardSubtitle>
                      </div>
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Movie;
