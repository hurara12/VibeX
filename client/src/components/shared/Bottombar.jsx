import React, { useEffect, useState } from 'react'
import {
    MdHome, MdOutlineSearch, MdChatBubbleOutline, MdWorkspaces, MdAddBox,
    MdAddToPhotos, MdNotificationsActive, MdNotifications, MdLogout
  } from "react-icons/md";
  import { LazyLoadImage } from 'react-lazy-load-image-component';
import { NavLink } from 'react-router-dom';
import Logo from '../../assets/ImageSlider/vibex.png';
import getUser_API from '@/apis/generals/getUser_API';
import Cookies from 'js-cookie';
import { useAuth } from '@/contexts/authContext/AuthContext';
import Catalogue from '@/pages/generals/Catalogue';

function Bottombar() {
    const [userData, setUserData] = useState(null);
    const {logout}= useAuth();

    useEffect(() => {
      async function fetchData() {
        try {
          const fetchedUser = await getUser_API(Cookies.get("jwtToken"));
          setUserData(fetchedUser);
        } catch (error) {
          console.error(error);
        }
      }
      fetchData();
    }, []);
  return (
    <div className="flex flex-row justify-between bg-slate-200 text-black h-13 fixed bottom-0 left-0 right-0 lg:hidden">
              <div>
        <NavLink to="/dashboard">
          <img src={Logo} className="h-14 mt-1 ml-5 hidden md:block " />
        </NavLink>
      </div>
      <div>
        <NavLink to="/dashboard"
          className={({ isActive, isPending }) =>
          isPending ? "" : isActive ? "text-[#7dd3fc]" : "text-black"
        }>
          <MdHome className="text-4xl md:text-5xl mt-2.5" />
        </NavLink>
      </div>
      <div>
        <NavLink to="/team">
          <MdOutlineSearch className="text-4xl md:text-5xl text-black mt-2.5" />
        </NavLink>
      </div>
      <div>
        <NavLink to="/team">
          <MdChatBubbleOutline className="text-3xl md:text-4xl text-black mt-3" />
        </NavLink>
      </div>
      <div>
        <NavLink to="/team">
          <MdWorkspaces className="text-3xl md:text-4xl text-black mt-3" />
        </NavLink>
      </div>
      <div>
        <Catalogue/>
      </div>
      <div>
        <NavLink to="/team">
          <MdNotifications className="text-3xl md:text-4xl text-black mt-3" />
        </NavLink>
      </div>

      <div>
        <NavLink to="/profile">
        <LazyLoadImage  
          src={userData?.profilepicture}
          className={`h-8 md:h-10 rounded-full mt-2.5`}
        />
        </NavLink>
      </div>

      <div>
          <button onClick={logout}><MdLogout className="text-3xl  md:text-4xl text-black mt-3 mr-6" /></button>
      </div>
    </div>
  )
}

export default Bottombar