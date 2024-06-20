import axios from "axios";

const deleteCatalogue_API = async (jwtToken, catalogueId) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`, 
    },
  };
  try {
    const response = await axios.delete(`${import.meta.env.VITE_SERVER}/api/catalogue/delete/${catalogueId}`, config);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    throw error; // Rethrow the error for handling at higher levels
  }
};

export default deleteCatalogue_API;
