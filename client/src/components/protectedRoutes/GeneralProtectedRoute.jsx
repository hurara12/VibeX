import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import Cookies from "js-cookie";
import { useAuth } from "../../contexts/authContext/AuthContext";
import getUser_API from "../../apis/generals/getUser_API"


export function GeneralProtectedRoute({ elementBody: Component }) {
  const [userDetails, setUserDetails] = useState(null);
  const { isLoggedIn } = useAuth();

  
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedUser = await getUser_API(Cookies.get("jwtToken"));
        setUserDetails(fetchedUser);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  if (!userDetails && isLoggedIn) {
    return <div>Loading.....</div>;
  }
  const validUserTypes = ["student", "admin", "visitor", "alumni"];
  return (
    <>
      {isLoggedIn &&validUserTypes.includes(userDetails.usertype) ? (
        Component
      ) : (
        <Navigate to="/" replace/>
      )}
    </>
  );
}

export default GeneralProtectedRoute;
