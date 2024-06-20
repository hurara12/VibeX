import axios from "axios";

const checkProfile_API = async (jwtToken,userId) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
    },
  };
  try {
    const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/generals/checkProfile`,{userId}, config)
    console.log(response);
    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
  };
}

export default checkProfile_API;