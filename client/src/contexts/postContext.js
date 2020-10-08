import React, { useReducer, createContext } from "react";
import {postReducer} from "../reducers/postReducer";

export const PostContext = createContext();

const PostContextProvider = (props) => {
  const [posts, dispatch] = useReducer(postReducer, {
    posts: null,
    isfetching: false,
  });

  return (
    <PostContext.Provider value={{ posts, dispatch }}>
      {props.children}
    </PostContext.Provider>
  );
};

export default PostContextProvider;
