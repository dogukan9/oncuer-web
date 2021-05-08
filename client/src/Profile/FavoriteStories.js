import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Row, Container } from 'reactstrap';
import Spinner from '../Spinner/Spinner';
import classes from './Profile.module.css';
import Story from '../MainPage/Story';
import { getFavStories } from '../store/actions/profile';
const FavoriteStories = (props) => {
  const stories = useSelector((state) => state.profile.user.favoriteStories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getFavStories(stories));
  }, []);

  return (
    <div className={classes.image}>
      {!stories ? (
        <Spinner />
      ) : (
        <Container>
          <Row xs='3'>
            {stories.map((x) => {
              return (
                <Story
                  key={x._id}
                  story={x}
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

export default FavoriteStories;
