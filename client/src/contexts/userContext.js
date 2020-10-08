import React, { useReducer, createContext } from "react";
import {userReducer} from "../reducers/userReducer";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const [user, dispatch] = useReducer(userReducer, {
    user: JSON.parse(localStorage.getItem("user")) || null,
    isfetching: false,
  });

  return (
    <UserContext.Provider value={{ user, dispatch }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
