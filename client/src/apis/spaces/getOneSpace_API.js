import axios from "axios";

const getSpace_API = async (jwtToken, spaceName) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`,
    },
  };
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/spaces/SpecificCatalogue/${spaceName}`,config);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
  }
}

export default getSpace_API;
