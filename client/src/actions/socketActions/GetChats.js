import axios from "axios";

export const GetChats = async (id) => {
  try {
    const { JWTaccessToken } = JSON.parse(localStorage.getItem("user"));
    const { data } = await axios.get(`/getchat/${id}`, {
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