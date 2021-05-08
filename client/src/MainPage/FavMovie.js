import React, { useState } from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardSubtitle,
  Col,
  Row,
} from 'reactstrap';
import Moment from 'react-moment';

import Spinner from '../Spinner/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import {
  likeFavMovie,
  dislikeFavMovie,
  removeCommentFavMovie,
  addCommentFavMovie,
} from '../store/actions/profile';
import classes from './Main.module.css';
import { Link } from 'react-router-dom';

const FavMovie = (props) => {
  const user = useSelector((state) => state.auth.user);
  let movie = useSelector((state) => state.profile.user.favoriteMovies);
  const dispatch = useDispatch();

  // const movie = useSelector((state) => state.moviesAndstories.movie);

  movie = movie.find((temp) => temp._id === props.match.params.movieId);

  const [showCom, setShowCom] = useState(false);
  const [text, setText] = useState('');
  let x;

  if (movie) {
    x = movie.likes.find((temp) => temp._id === user._id);
  }

  return (
    <div className='container'>
      {movie ? (
        <Card>
          <CardImg
            style={{ maxHeight: '50rem' }}
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
                        dispatch(
                          dislikeFavMovie(
                            movie._id,
                            props.match.params.id,
                            user._id
                          )
                        );
                      }}
                    ></i>
                  ) : (
                    <i
                      className='far fa-heart'
                      onClick={() => {
                        dispatch(
                          likeFavMovie(
                            movie._id,

                            props.match.params.id,
                            user._id
                          )
                        );
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
            </Row>
          </CardBody>
        </Card>
      ) : (
        <Spinner />
      )}
      {showCom && (
        <div className={classes.post}>
          <form
            className={`${classes.form} ${classes.my}`}
            onSubmit={(e) => {
              e.preventDefault();

              dispatch(
                addCommentFavMovie(
                  movie._id,
                  props.match.params.id,
                  user._id,
                  text
                )
              );
              setText('');
            }}
          >
            <textarea
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
              <Card
                className={
                  (classes.post, classes.bgwhite, classes.p1, classes.my1)
                }
              >
                <CardBody>
                  <Row>
                    <Col xs='3'>
                      <Link to={`/profile/${com.user}`}>
                        <img
                          className={classes.roundimg}
                          src={user.avatar}
                          alt=''
                        />

                        <CardSubtitle
                          style={{ position: 'absolute', left: '5rem' }}
                          tag='h4'
                          className='mb-2 text-muted'
                        >
                          {com.username}
                        </CardSubtitle>
                      </Link>
                    </Col>
                    <Col xs='9'>
                      <div style={{ display: 'inline-block' }}>
                        <CardSubtitle class='my-1'>
                          <strong>{com.text}</strong>
                        </CardSubtitle>
                        <CardSubtitle tag='h5' className={classes.tarih}>
                          Yayınlandı{' '}
                          <Moment format='YYYY/MM/DD'>{com.date}</Moment>
                        </CardSubtitle>
                        {!user.loading && com.user === user._id && (
                          <button
                            className={`btn btn-danger ${classes.buton}`}
                            onClick={(e) => {
                              dispatch(
                                removeCommentFavMovie(
                                  com._id,
                                  props.match.params.id,
                                  user._id,
                                  movie._id
                                )
                              );
                            }}
                            type='button'
                          >
                            {' '}
                            Sil <i className='fas fa-times' />
                          </button>
                        )}
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

export default FavMovie;
