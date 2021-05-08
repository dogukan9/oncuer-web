import React from 'react';
import { useSelector } from 'react-redux';

import { Row, Container } from 'reactstrap';
import Spinner from '../Spinner/Spinner';
import classes from './Main.module.css';
import Story from './Story';

const Stories = (props) => {
  const stories = useSelector((state) => state.moviesAndstories.stories);
  const loading = useSelector((state) => state.auth.loading);

  return (
    <div className={classes.image}>
      {loading ? (
        <Spinner />
      ) : (
        <Container>
          <Row xs='3'>
            {stories.map((x) => {
              return <Story key={x._id} story={x} />;
            })}
          </Row>
        </Container>
      )}
    </div>
  );
};

export default Stories;
