import React from 'react';
import {
  Card,
  CardImg,
  CardBody,
  CardTitle,
  CardText,
  CardSubtitle,
} from 'reactstrap';
import classes from './Main.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import Spinner from '../Spinner/Spinner';

import {
  getStory,
  likeStory,
  dislikeStory,
} from '../store/actions/movieAndstory';
import {
  likeFavStory,
  dislikeFavStory,
  // removeCommentFavMovie,
  // addCommentFavMovie,
} from '../store/actions/profile';
const Story = (props) => {
  const loading = useSelector((state) => state.auth.loading);

  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();
  let x = null;
  if (user) {
    x = props.story.likes.find((temp) => temp._id === user._id);
  }
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
            src={props.story.imageUrl}
            alt='Card image cap'
          />
          <CardBody>
            <CardTitle tag='h5'>{props.story.name}</CardTitle>
            <CardSubtitle tag='h6' className='mb-2 text-muted'>
              Writer:{props.story.writer}
            </CardSubtitle>
            <CardSubtitle tag='h6' className='mb-2 text-muted'>
              {x ? (
                <i
                  className='fas fa-heart'
                  onClick={() => {
                    props.isFav
                      ? dispatch(
                          dislikeFavStory(
                            props.story._id,
                            props.personId,
                            user._id
                          )
                        )
                      : dispatch(dislikeStory(props.story._id));
                  }}
                  style={{ color: 'red' }}
                ></i>
              ) : (
                <i
                  className='far fa-heart'
                  onClick={() => {
                    props.isFav
                      ? dispatch(
                          likeFavStory(
                            props.story._id,
                            props.personId,
                            user._id
                          )
                        )
                      : dispatch(likeStory(props.story._id));
                  }}
                ></i>
              )}
              {props.story.likes.length}&nbsp;&nbsp;&nbsp;
              <i className='fas fa-comments'></i>
              {props.story.comments.length}
            </CardSubtitle>
            <CardText
              tag='h6'
              className='mb-2 text-muted'
              style={{ height: '10rem', overflow: 'auto' }}
            >
              Hikaye:{props.story.story}
            </CardText>
            {props.isFav ? (
              <Link
                onClick={(e) => {
                  dispatch(getStory(props.story._id));
                }}
                to={`/api/favoriteStory/${props.story._id}/${props.personId}`}
              >
                Detail
              </Link>
            ) : (
              <Link
                onClick={(e) => {
                  dispatch(getStory(props.story._id));
                }}
                to={`/api/stories/${props.story._id}`}
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

export default Story;
