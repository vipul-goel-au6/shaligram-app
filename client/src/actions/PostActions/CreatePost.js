import axios from "axios";
import M from "materialize-css";

export const CreatePost = async (form_data) => {
  try {
    const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.post(
      `/upload`,
      form_data,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: JWTaccessToken,
        },
      }
    );
    if (data.error) {
      M.toast({ html: data.error, classes: "#d50000 red accent-4" });
    } else {
      M.toast({ html: data.message, classes: "#8bc34a light-green" });
    }
  } catch (err) {
    console.error(err);
  }
};
