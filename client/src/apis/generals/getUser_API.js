import axios from "axios";

const getUser_API = async (jwtToken) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
    },
  };
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/generals/getUser`, config)
    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
  };
}

export default getUser_API;