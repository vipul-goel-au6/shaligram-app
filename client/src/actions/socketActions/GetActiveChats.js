import axios from "axios";
export const GetActiveChats = async () => {
  try {
    const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.get(`/getactivechats`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: JWTaccessToken,
      },
    });
    return data
  } catch (err) {
    console.log(err)
  }
};
