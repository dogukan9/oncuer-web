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
  Container,
} from 'reactstrap';
import Moment from 'react-moment';
import {
  addFavoriteStories,
  removeFavoriteStories,
} from '../store/actions/profile';
import Spinner from '../Spinner/Spinner';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { likeStory, dislikeStory } from '../store/actions/movieAndstory';
import classes from './Main.module.css';
import {
  removeCommentStory,
  addCommentStory,
} from '../store/actions/movieAndstory';
const StoryById = (props) => {
  const [showCom, setShowCom] = useState(false);
  const [text, setText] = useState('');

  const dispatch = useDispatch();
  let x;
  const user = useSelector((state) => state.auth.user);
  const favStories = useSelector((state) => state.profile.user.favoriteStories);
  //const story = useSelector((state) => state.moviesAndstories.story);
  let story = useSelector((state) => state.moviesAndstories.stories);
  story = story.find((temp) => temp._id === props.match.params.id);

  //const loading = useSelector((state) => state.auth.loading);
  let Fav;
  if (story) {
    Fav = favStories.find((fav) => fav._id === story._id);

    x = story.likes.find((temp) => temp._id === user._id);
  }

  return (
    <div>
      {story ? (
        <Card className={classes.container}>
          <CardImg
            className={classes.CardImg}
            top
            width='100%'
            src={story.imageUrl}
            alt='Card image cap'
          />

          <CardBody>
            <CardTitle tag='h5'>{story.name}</CardTitle>
            <CardSubtitle tag='h5' className='mb-2 text-muted'>
              Category:{story.story}
            </CardSubtitle>
            <CardSubtitle tag='h5' className='mb-2 text-muted'>
              Writer:{story.writer}
            </CardSubtitle>
            <Row>
              <Col xs='10'>
                <CardSubtitle tag='h4' className='mb-2 text-muted'>
                  {x ? (
                    <i
                      className='fas fa-heart'
                      onClick={() => {
                        dispatch(dislikeStory(story._id));
                      }}
                      style={{ color: 'red' }}
                    ></i>
                  ) : (
                    <i
                      className='far fa-heart'
                      onClick={() => {
                        dispatch(likeStory(story._id));
                      }}
                    >
                      {' '}
                    </i>
                  )}
                  {story.likes.length}&nbsp;&nbsp;&nbsp;
                  <i
                    className='fas fa-comments'
                    onClick={() => setShowCom((prev) => !prev)}
                  ></i>
                  {story.comments.length}
                </CardSubtitle>
              </Col>
              <Col xs='2'>
                <Button
                  style={{ backgroundColor: 'green' }}
                  onClick={() => {
                    if (!Fav) {
                      dispatch(addFavoriteStories(story._id));
                    } else {
                      dispatch(removeFavoriteStories(story._id));
                    }
                  }}
                >
                  {Fav ? 'Favorilerden Kald??r' : 'Favorilere Ekle'}
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

              dispatch(addCommentStory(story._id, text));
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
            <input type='submit' className='btn btn-dark my-1' value='G??nder' />
          </form>

          {story.comments.map((com) => {
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
                        <CardSubtitle className={classes.commentText}>
                          <strong>{com.text}</strong>
                        </CardSubtitle>
                        <CardSubtitle tag='h5' className={classes.tarih}>
                          Yay??nland??{' '}
                          <Moment format='YYYY/MM/DD'>{com.date}</Moment>
                          {!user.loading && com.user === user._id && (
                            <button
                              className={`btn btn-danger ${classes.buton}`}
                              onClick={(e) => {
                                dispatch(
                                  removeCommentStory(com._id, story._id)
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

export default StoryById;
