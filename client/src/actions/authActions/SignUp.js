import { SET_USER, TOGGLEFETCHINGSTATE } from "../../actionTypes";
import axios from "axios";
import M from "materialize-css";

export const SignUp = async (
  dispatch,
  { name, credentials, password, userName, mode }
) => {
  try {
    dispatch({ type: TOGGLEFETCHINGSTATE });
    const { data } = await axios.post(
      `/signup`,
      { name, credentials, password, userName, mode },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: SET_USER, payload: data });
    return data
  } catch (err) {
    console.error(err);
  } finally {
    dispatch({ type: TOGGLEFETCHINGSTATE });
  }
};
