import axios from "axios";

const searchUser_API = async (jwtToken,usernameText) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
    },
  };
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/generals/searchUser/${usernameText}`, config)
    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
  };
}

export default searchUser_API;