// redux/reducers/bookmarkReducer.js
import { ADD_BOOKMARK, REMOVE_BOOKMARK } from '../types';

const initialState = {
  bookmarks: [],
};

const bookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BOOKMARK:
      return {
        ...state,
        bookmarks: [...state.bookmarks, action.payload],
      };
    case REMOVE_BOOKMARK:
      return {
        ...state,
        bookmarks: state.bookmarks.filter((item) => item.id !== action.payload),
      };
    default:
      return state;
  }
};

export default bookmarkReducer;
