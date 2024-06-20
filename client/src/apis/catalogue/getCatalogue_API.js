import axios from "axios";

const getCatalogue_API = async (jwtToken,userid) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`, 
    },
  };
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/catalogue/get/${userid}`,config)

    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
  };
}

export default getCatalogue_API;