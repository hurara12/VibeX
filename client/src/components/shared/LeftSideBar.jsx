import React, { useEffect, useState } from 'react'
import { useLocation, NavLink } from 'react-router-dom';
import Logo from '../../assets/ImageSlider/vibex.png';
import getUser_API from '@/apis/generals/getUser_API';
import {
  MdHome, MdOutlineSearch, MdChatBubbleOutline, MdWorkspaces, MdAddBox,
  MdAddToPhotos, MdNotificationsActive, MdNotifications, MdLogout
} from "react-icons/md";
import Cookies from 'js-cookie';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useAuth } from '@/contexts/authContext/AuthContext';
import Catalogue from '@/pages/generals/Catalogue';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Import styles for lazy loading effect


function LeftSideBar(props) {
  const [catalogueState, setCatalogueState] = useState(false);
  const [userData, setUserData] = useState(null);

  const { logout } = useAuth();

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

  const showCataloguePage = () => {
    props.CatalogueHandler(true);
    setCatalogueState(!catalogueState);
  }

  return (
    <div className="lg:flex flex-col items-center sticky top-0 w-24 lg:w-64 h-screen bg-slate-200 hidden">
      <div>
        <NavLink to="/dashboard">
          <div className="flex flex-row justify-between">
            <img src={Logo} className="h-14 w-17 mt-10" />
            <p className="mt-14 text-4xl font-bold font-protest-guerrilla">VIBEX</p>
          </div>
        </NavLink>
      </div>
      <div>
        <NavLink to="/dashboard"
          className={({ isActive, isPending }) =>
            isPending ? "" : isActive ? "text-[#64748b] font-bold" : "text-black "
          }>
          <div className="lg:flex flex-row justify-between hidden  lg:w-32">
            <MdHome className="text-4xl  mt-10" />
            <p className="text-base  mt-12 hidden lg:block">Home</p>
          </div>
        </NavLink>
      </div>
      <div>
        <NavLink to="/search">
          <div className="lg:flex flex-row justify-between hidden lg:w-32">
            <MdOutlineSearch className="text-4xl text-black mt-3" />
            <p className="text-base mt-3">Search</p>
          </div>
        </NavLink>

      </div>
      <div>
        <NavLink to="http://localhost:3000/chats">
          <div className="lg:flex flex-row justify-between hidden lg:w-32">
            <MdChatBubbleOutline className="text-3xl text-black mt-3 lg:ml-1" />
            <p className="text-base  mt-3">Chats</p>
          </div>
        </NavLink>
      </div>
      <div>
        <NavLink to="/spaces">
          <div className="lg:flex flex-row justify-between hidden lg:w-32">
            <MdWorkspaces className="text-3xl text-black mt-3 lg:ml-1" />
            <p className="text-base  mt-3">Spaces</p>
          </div>
        </NavLink>
      </div>
      <div>
        <Catalogue />
      </div>
 

      <div>
        <NavLink to={`/profile/${userData?._id}`}  className={({ isActive, isPending }) =>
            isPending ? "" : isActive ? "text-[#64748b] font-bold" : "text-black "
          }>
        <div className="lg:flex flex-row hidden justify-between lg:w-32">
          <LazyLoadImage
            src={userData?.profilepicture}
            effect="blur"
            className={`h-8 rounded-full mt-3 lg:ml-1`}
          />
          <p className="text-base  mt-3 ">Profile</p>
          </div>
        </NavLink>
      </div>

      <div className="lg:flex flex-row hidden justify-between lg:w-32 cursor-pointer" onClick={logout}>
        <button ><MdLogout className="text-3xl text-black mt-3 ml-1 " />
        
        </button>
        <p className="text-base mt-3 hidden lg:block">Logout</p>
      </div>
    </div>
  )
}

export default LeftSideBar