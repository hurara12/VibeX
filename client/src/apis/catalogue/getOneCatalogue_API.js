import axios from "axios";

const getOneCatalogue_API = async (jwtToken, catalogueId) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`, 
    },
  };
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/catalogue/getClickedCat/${catalogueId}`, config);
    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
  }
};

export default getOneCatalogue_API;
