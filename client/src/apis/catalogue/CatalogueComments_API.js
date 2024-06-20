import axios from "axios";

const CatalogueCommentAdd_API = async (jwtToken,catalogueId,comment,userId) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`, 
    },
  };
  try {
    
    const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/catalogue/addComment`,{catalogueId ,comment,userId},config)
    
    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
  };
}


const CatalogueCommentGet_API=async (jwtToken,catalogueId)=>{
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`, 
    },
  };
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/catalogue/getComments/${catalogueId}`, config);
    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
  }
}

const CatalogueCommentReplyAdd_API = async (jwtToken,reply,commentId,userId) => {
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`, 
    },
  };
  console.log(commentId,userId);
  try {
    const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/catalogue/addReply`,{reply ,commentId,userId},config)
    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
  };
}
const CatalogueCommentReplyGet_API=async (jwtToken,commentId)=>{
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`, 
    },
  };
  try {
    const response = await axios.get(`${import.meta.env.VITE_SERVER}/api/catalogue/getReply/${commentId}`, config);
    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
  }
}
const CatalogueDeleteReply_API=async(jwtToken,replyId)=>{
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`, 
    },
  };
  try {
    
    const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/catalogue/deleteReply`,{replyId},config)   
    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
  };
}
const CatalogueDeleteComment_API=async(jwtToken,commentId)=>{
  const config = {
    headers: {
      'Authorization': `Bearer ${jwtToken}`, 
    },
  };
  try {
    
    const response = await axios.post(`${import.meta.env.VITE_SERVER}/api/catalogue/deleteComment`,{commentId},config)   
    return response.data;
  }
  catch (error) {
    console.error('Error:', error);
  };
}

export {CatalogueCommentAdd_API,
        CatalogueCommentGet_API,
        CatalogueCommentReplyAdd_API,
        CatalogueCommentReplyGet_API,
        CatalogueDeleteReply_API,
        CatalogueDeleteComment_API};