import React, { useState } from 'react';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  Button,
  NavItem,
} from 'reactstrap';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import classes from './Navbar.module.css';
import { logout } from '../store/actions/auth';
import { getProfileById } from '../store/actions/profile';
const Navbarr = (props) => {
  const auth = useSelector((state) => state.auth.user);
  let id = '';
  if (auth) {
    id = auth._id;
  }
  const [collapsed, setCollapsed] = useState(true);

  const toggleNavbar = () => setCollapsed(!collapsed);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const login = (
    <Nav navbar>
      <NavItem className={classes.margin}>
        <Link
          className={classes.a}
          to={`/favoriteMovies/${id}`}
          onClick={() => {
            dispatch(getProfileById(id));
          }}
        >
          <Button style={{ backgroundColor: 'Black' }}>
            {' '}
            Favori Filmlerim
          </Button>
        </Link>
      </NavItem>
      <NavItem className={classes.margin}>
        <Link
          className={classes.a}
          to={`/favoriteStories/${id}`}
          onClick={() => {
            dispatch(getProfileById(id));
          }}
        >
          <Button style={{ backgroundColor: 'Black' }}>
            {' '}
            Favori Hikayelerim
          </Button>
        </Link>
      </NavItem>
      <NavItem className={classes.margin}>
        <Link className={classes.a} to={`/profile/${id}`}>
          <Button style={{ backgroundColor: 'Black' }}>Profilim</Button>
        </Link>
      </NavItem>
    </Nav>
  );
  /* const notLogin = (
    <Nav navbar>
      <NavItem className={classes.margin}>
        <Link className={classes.a} to='/Movie'>
          <strong> Filmler</strong>
        </Link>
      </NavItem>
      <NavItem className={classes.margin}>
        <Link className={classes.a} to='/Story'>
          <strong> Hikayeler</strong>
        </Link>
      </NavItem>
    </Nav>
  );*/
  return (
    <div>
      <Navbar color='faded' light>
        <NavbarBrand href='/' className='mr-auto'>
          <i className={`far fa-eye ${classes.icon}`}>ÖNCÜER</i>
        </NavbarBrand>

        <a className='btn btn-primary m-2' href='/movies'>
          <i className='fas fa-film' /> Tüm Filmler
        </a>
        <a className='btn btn-success' href='/stories'>
          <i className='fas fa-book-reader'></i> Tüm Hikayeler
        </a>
        {isAuthenticated && (
          <div style={{ margin: '10px' }}>
            <i className='fas fa-user' />{' '}
            <a
              href='/'
              className='btn btn-danger'
              onClick={() => {
                dispatch(logout());
              }}
            >
              Logout
            </a>
          </div>
        )}
        {isAuthenticated && (
          <NavbarToggler onClick={toggleNavbar} className='mr-2' />
        )}

        <Collapse isOpen={!collapsed} navbar>
          {isAuthenticated ? login : null}
        </Collapse>
      </Navbar>
    </div>
  );
};

export default Navbarr;
