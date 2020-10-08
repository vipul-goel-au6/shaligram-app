import {
  UPDATE_USERDETAILS
} from "../../actionTypes";
import axios from "axios";

export const UnFollowUser = async (dispatch, userId) => {
  try {
    const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.put(
      `/unfollow/`,
      {
        unFollowId: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: JWTaccessToken,
        },
      }
    );
    dispatch({ type: UPDATE_USERDETAILS, payload: data.myUser.userDetails });
    return data.otherUser;
  } catch (err) {
    console.error(err);
  }
};