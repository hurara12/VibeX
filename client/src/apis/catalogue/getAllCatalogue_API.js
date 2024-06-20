import axios from "axios";

const getAllCatalogue_API = async (jwtToken) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`, 
    },
  };
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/catalogue/getAll`,config)

    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
  };
}

export default getAllCatalogue_API;