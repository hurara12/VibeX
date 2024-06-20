import axios from "axios";

const getAllSpaces_API = async (jwtToken) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`, 
    },
  };
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/spaces/getAllSpacesCount`,config)

    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
  };
}

export default getAllSpaces_API;