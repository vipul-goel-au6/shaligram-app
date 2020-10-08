import {
  UPDATE_USERDETAILS,
} from "../../actionTypes";
import axios from "axios";

export const FollowUser = async (dispatch, userId) => {
  try {
    const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.put(
      `/follow/`,
      {
        followId: userId,
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