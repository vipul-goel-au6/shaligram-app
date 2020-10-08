import axios from "axios";
import M from "materialize-css";
export const VerifyUsername = async (userName) => {
    try{
      const {data} = await axios.get(`/checkusername?q=${userName}`)
      return data
    }catch (err){
      console.error(err);
    }
  }