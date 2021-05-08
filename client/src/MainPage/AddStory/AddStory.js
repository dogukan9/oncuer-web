import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import classes from './AddStory.module.css';
import { addStory } from '../../store/actions/movieAndstory';
import { Card, CardTitle } from 'reactstrap';
import { useDispatch } from 'react-redux';
const AddStory = (props) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    story: '',
    writer: '',
    imgUrl: '',
  });

  const { name, story, writer, imgUrl } = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submit = () => {
    dispatch(addStory(name, story, writer, imgUrl));
  };
  return (
    <div className='container'>
      <Card className={classes.card}>
        <CardTitle className={classes.cardTitle}>Add Your Movie</CardTitle>

        <form className='form'>
          <div>
            <input
              className={classes.formGroup}
              type='text'
              placeholder='Story Name'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div>
            <textarea
              className={classes.textarea}
              placeholder='Story'
              value={story}
              onChange={(e) => onChange(e)}
              name='story'
              required
            />
          </div>
          <div>
            <input
              className={classes.formGroup}
              type='text'
              placeholder='Writer'
              name='writer'
              value={writer}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div>
            <input
              className={classes.formGroup}
              type='text'
              placeholder='Image Url'
              value={imgUrl}
              onChange={(e) => onChange(e)}
              name='imgUrl'
              required
            />
          </div>
          <Link to='/main_page'>
            <input
              type='button'
              className={`btn btn-primary ${classes.button}`}
              onClick={submit}
              value='Ekle'
            />
          </Link>
          <Link className={`btn btn-light ${classes.link}`} to='/main_page'>
            Go Back
          </Link>
        </form>
      </Card>
    </div>
  );
};

export default AddStory;
