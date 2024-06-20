import React from 'react'
import {
  Card,
} from "@/shadcn-components/ui/card"
import { Button } from '@/shadcn-components/ui/button'
import { NavLink, useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import ImgUrl3 from "../../assets/ImageSlider/slider_3.jpg";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn-components/ui/avatar"

function PostedDetails({ userData, catalogueDetail }) {
  const navigate = useNavigate();

  const handleSubmit = () => {
    console.log("Triggered");
    navigate('/view-catalogue-sm', { state: catalogueDetail });
  }

  return (
    <Card className="rounded-3xl h-[10vh] w-[35vw] ml-[3vw] mt-[1vh] ">


      <div className="flex justify-between ">
        <div className="mt-2">
          <NavLink to={`/profile`}>
            <div className="flex">
              <Avatar className="ml-[2vh] w-[3vw] h-[3vw] mt-[1vh]">
                <AvatarImage src={userData?.profilepicture}  className={`rounded-full`} />
              </Avatar>

              <p className="text-base  mt-[2.2vh] ml-[1vh] ">{userData?.name}</p>
            </div>
          </NavLink>
        </div>
        <div>
          <Button className="rounded-3xl mt-[2.3vh] mr-[2vh] bg-[#059669]"
            onClick={handleSubmit}>
            View Post</Button>
        </div>
      </div>
    </Card>

  )
}

export default PostedDetails;