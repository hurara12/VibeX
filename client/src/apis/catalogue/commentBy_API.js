import axios from "axios";

const getCommentBy_API = async (jwtToken, commentId) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`, 
    },
  };
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/catalogue/getCommentBy/${commentId}`, config);
    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
  }
};

export default getCommentBy_API;
