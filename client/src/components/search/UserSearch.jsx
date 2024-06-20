import React from 'react'
import {
  Card,
} from "@/shadcn-components/ui/card"
import { Button } from '@/shadcn-components/ui/button'
import { NavLink } from 'react-router-dom';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn-components/ui/avatar"

function UserSearch({ userData }) {
  return (
    <Card className="rounded-3xl h-[10vh] mt-[1vh]  ">


      <div className="flex justify-between ">
        <div className="mt-2">
          <NavLink to={`/profile/${userData?._id}`}>
            <div className="flex">
              <Avatar className="w-[3.9vw] h-[4vw] ml-[1vw] mr-[1vw]">
                <AvatarImage src={userData?.profilepicture} className={`rounded-full`} />
              </Avatar>



              <p className="text-base  mt-[1.2vh] ">{userData?.name}</p>
            </div>
          </NavLink>
        </div>
        <div>
          <NavLink to={`/profile/${userData?._id}`}>
            <Button className="rounded-3xl mt-[1.3vh] mr-[2vh]" >View</Button>
          </NavLink>
        </div>
      </div>
    </Card>

  )
}

export default UserSearch