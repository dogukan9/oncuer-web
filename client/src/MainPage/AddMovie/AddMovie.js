import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import classes from './AddMovie.module.css';
import { addMovie } from '../../store/actions/movieAndstory';
import { Card, CardTitle } from 'reactstrap';
import { useDispatch } from 'react-redux';
const AddMovie = (props) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    director: '',
    imgUrl: '',
  });

  const { name, category, director, imgUrl } = formData;
  const onChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const submit = () => {
    dispatch(addMovie(name, category, director, imgUrl));
  };
  return (
    <div className='container'>
      <Card className={classes.card}>
        <CardTitle className={classes.cardTitle}>Add Your Movie</CardTitle>

        <form className='form'>
          <div className={classes.formGroup}>
            <input
              type='text'
              placeholder='Movie Name'
              name='name'
              value={name}
              onChange={(e) => onChange(e)}
              required
            />
          </div>
          <div className={classes.formGroup}>
            <input
              type='text'
              placeholder='Category'
              value={category}
              onChange={(e) => onChange(e)}
              name='category'
              required
            />
          </div>
          <div className={classes.formGroup}>
            <input
              type='text'
              placeholder='Director'
              name='director'
              value={director}
              onChange={(e) => onChange(e)}
            />
          </div>
          <div className={classes.formGroup}>
            <input
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

export default AddMovie;
