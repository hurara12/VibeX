import axios from "axios"
import { toast } from 'react-toastify'; 

const auth_API = async (token) => {
  try {
    const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/auth/google-token`, { token });
    return response.data.token;
  } catch (error) {
    if (error.response && error.response.data && error.response.data.message) {
      toast(error.response.data.message);
    } else {
      toast(error);
    }
  }
}

export default auth_API;
