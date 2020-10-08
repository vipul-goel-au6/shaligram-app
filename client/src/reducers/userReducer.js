import {
  TOGGLEFETCHINGSTATE,
  SET_USER,
  UPDATE_USERDETAILS,
  UPDATE_NAME,
  UPDATE_OTP_SECRET,
  EDIT_PROFILE,
} from "../actionTypes";

export const userReducer = (state, actions) => {
  const { type, payload } = actions;

  switch (type) {
    case SET_USER:
      if (!payload) return { ...state, user: payload };
      const user = JSON.stringify(payload);
      localStorage.setItem("user", user);
      return { ...state, user: payload };
    case UPDATE_USERDETAILS:
      const localUser = JSON.parse(localStorage.getItem("user"));
      localUser.userDetails = payload;
      const updatedUser = JSON.stringify(localUser);
      localStorage.setItem("user", updatedUser);
      return { ...state, user: { ...state.user, userDetails: payload } };
    case EDIT_PROFILE:
      const localUser2 = JSON.parse(localStorage.getItem("user"));
      localUser2.name = payload.name;
      localUser2.userDetails = payload.userDetails;
      localUser2.userName = payload.userName;
      localUser2.email = payload.email;
      localUser2.phoneNumber = payload.phoneNumber;
      const updatedUser2 = JSON.stringify(localUser2);
      localStorage.setItem("user", updatedUser2);
      return {
        ...state,
        user: {
          ...state.user,
          name: payload.name,
          userName: payload.userName,
          email: payload.email,
          phoneNumber: payload.phoneNumber,
          userDetails: payload.userDetails,
        },
      };
    case UPDATE_OTP_SECRET:
      const localUser3 = JSON.parse(localStorage.getItem("user"));
      localUser3.otpSecret = payload;
      const updatedUser3 = JSON.stringify(localUser3);
      localStorage.setItem("user", updatedUser3);
      return { ...state, user: { ...state.user, otpSecret: payload } };
    case TOGGLEFETCHINGSTATE:
      return { ...state, isfetching: !state.isfetching };
    default:
      return state;
  }
};
