import {
  GET_MOVIES_AND_STORIES,
  GET_MOVIE,
  MOVIE_ERROR,
  GET_STORY,
  STORY_ERROR,
  LIKE_MOVIE,
  DISLIKE_MOVIE,
  //LIKE_MOVIEE,
  //DISLIKE_MOVIEE,
  LIKE_STORY,
  DISLIKE_STORY,
  //LIKE_STORYY,
  //DISLIKE_STORYY,
  ADD_COMMENT_MOVIE,
  REMOVE_COMMENT_MOVIE,
  ADD_COMMENT_STORY,
  REMOVE_COMMENT_STORY,
} from '../actions/movieAndstory';

const initialState = {
  movies: [],
  stories: [],
  movie: null,
  story: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_MOVIES_AND_STORIES:
      return {
        ...state,
        movies: action.movie,
        stories: action.story,
      };

    case GET_MOVIE:
      return {
        ...state,
        movie: action.payload,
      };

    case LIKE_MOVIE:
    case DISLIKE_MOVIE:
      return {
        ...state,
        movies: action.payload,
      };

    case ADD_COMMENT_MOVIE:
    case REMOVE_COMMENT_MOVIE:
      const film = action.payload.find((mov) => mov._id === action.id);
      return {
        ...state,
        movies: action.payload,
        movie: film,
      };

    case ADD_COMMENT_STORY:
    case REMOVE_COMMENT_STORY:
      const story = action.payload.find((st) => st._id === action.id);
      return {
        ...state,
        stories: action.payload,
        story: story,
      };

    case LIKE_STORY:
    case DISLIKE_STORY:
      return {
        ...state,
        stories: action.payload,
      };
    /* case LIKE_MOVIEE:
    case DISLIKE_MOVIEE:
      return {
        ...state,
        movie: action.payload,
      };
    case LIKE_STORYY:
    case DISLIKE_STORYY:
      return {
        ...state,
        story: action.payload,
      };
*/
    case GET_STORY:
      return {
        ...state,
        story: action.payload,
      };
    default:
      return state;
  }
}
