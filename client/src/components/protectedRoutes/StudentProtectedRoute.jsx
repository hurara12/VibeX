import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";

import Cookies from "js-cookie";

import getUser_API from "../../apis/generals/getUser_API";
import { useAuth } from "../../contexts/authContext/AuthContext";

export function StudentProtectedRoute({ elementBody: Component }) {
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

  return (
    <>
      {isLoggedIn && userDetails.usertype === "student" ? (
        Component
      ) : (
        <Navigate to="/" replace/>
      )}
    </>
  );
}

export default StudentProtectedRoute;
