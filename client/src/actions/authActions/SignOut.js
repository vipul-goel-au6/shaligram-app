import { SET_USER} from "../../actionTypes";
import M from "materialize-css";
export const SignOut = (dispatch) => {
  localStorage.clear();
  M.toast({ html: "Signed Out Successfully", classes: "#8bc34a light-green" });
  dispatch({ type: SET_USER, payload: null });
};