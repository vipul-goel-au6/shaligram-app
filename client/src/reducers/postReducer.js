import {SET_POSTS, TOGGLEFETCHINGSTATE} from "../actionTypes";

export const postReducer = (state, actions) => {
  const { type, payload } = actions;

  switch (type) {
    case SET_POSTS:
      return { ...state, posts: payload };
    case TOGGLEFETCHINGSTATE:
      return { ...state, isfetching: !state.isfetching };
    default:
      return state;
  }
};
