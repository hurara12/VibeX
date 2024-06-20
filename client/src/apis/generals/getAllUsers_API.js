import axios from "axios";

const getAllUsers_API = async (jwtToken) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
    },
  };
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/generals/getAllUsers`, config)
    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
  };
}

export default getAllUsers_API;