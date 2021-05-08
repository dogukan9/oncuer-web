import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import React, { Fragment, useEffect } from 'react';
import { Provider } from 'react-redux';
import Navbar from './Navbar/Navbar';
import Landing from './Login/Landing';
import Register from './Register/Register';
import NotFound from './NotFound/NotFound';
import alert from './store/reducers/alert';
import PrivateRoute from './routing/PrivateRoute';
import auth from './store/reducers/auth';
import profile from './store/reducers/profile';
import MainPage from './MainPage/mainPage';
import moviesAndstories from './store/reducers/movAndStr';
import Movies from './MainPage/Movies';
import Stories from './MainPage/Stories';
import Profile from './Profile/Profile';
import Movie from './MainPage/MovieById';
import FavMovie from './MainPage/FavMovie';
import FavStory from './MainPage/FavStory';
import StoryById from './MainPage/StoryById';
import FavoriteMovies from './Profile/FavoriteMovies';
import FavoriteStories from './Profile/FavoriteStories';
import AddMovie from './MainPage/AddMovie/AddMovie';
import AddStory from './MainPage/AddStory/AddStory';

import Alert from './Alert/Alert';
import setAuthToken from './setAuthToken/setAuthToken';
import { loadUser } from './store/actions/auth';
import { getMoviesAndStories } from './store/actions/movieAndstory';

const middleware = [thunk];

/*const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
      })
    : compose;*/

/*const enhancer = composeEnhancers(
  applyMiddleware(...middleware)
  // other store enhancers if any
);*/

const reducer = combineReducers({
  alert: alert,
  auth: auth,
  moviesAndstories: moviesAndstories,
  profile: profile,
});

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  //const dispatch = useDispatch();
  useEffect(() => {
    store.dispatch(loadUser());
    store.dispatch(getMoviesAndStories());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Route exact path='/' component={Landing} />
          <section className='container'>
            <Alert />
            <Switch>
              <Route exact path='/register' component={Register} />
              <PrivateRoute exact path='/main_page' component={MainPage} />
              <Route exact path='/movies' component={Movies} />
              <Route exact path='/stories' component={Stories} />
              <PrivateRoute
                exact
                path='/AddMovie/:person'
                component={AddMovie}
              />
              <PrivateRoute
                exact
                path='/AddStory/:person'
                component={AddStory}
              />
              <PrivateRoute exact path='/api/movies/:id' component={Movie} />
              <PrivateRoute
                exact
                path='/api/favoriteMovie/:movieId/:id'
                component={FavMovie}
              />
              <PrivateRoute
                exact
                path='/api/favoriteStory/:storyId/:id'
                component={FavStory}
              />
              <PrivateRoute
                exact
                path='/api/stories/:id'
                component={StoryById}
              />
              <PrivateRoute
                exact
                path='/favoriteMovies/:person'
                component={FavoriteMovies}
              />
              <PrivateRoute
                exact
                path='/favoriteStories/:person'
                component={FavoriteStories}
              />

              <PrivateRoute exact path='/profile/:id' component={Profile} />

              <Route path='/' component={NotFound} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
