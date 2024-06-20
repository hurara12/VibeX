import axios from "axios";

const likeCatalogue_API = async (jwtToken,catalogueId,userId) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`, 
    },
  };
  try {
    const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/catalogue/like`,{catalogueId,userId} ,config)
  }
  catch (error) {
    console.error('Error:', error);
  };
}


export {likeCatalogue_API};