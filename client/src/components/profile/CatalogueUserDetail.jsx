import React from 'react'
import {
  Card,
} from "@/shadcn-components/ui/card"
import { Button } from '@/shadcn-components/ui/button'
import { NavLink, useNavigate } from 'react-router-dom';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/shadcn-components/ui/avatar"

function CatalogueUserDetail({ catalogueDetail }) {

  return (
    <Card className="rounded-3xl h-[10vh] w-[40vw]  mt-[1vh] ">


      <div className="flex justify-between ">
        <div className="mt-2">
          <NavLink to={`/profile/${catalogueDetail.uploadedBy._id}`}>
            <div className="flex">
              <Avatar className="w-[3.9vw] h-[4vw] ml-[1vw] mr-[1vw]">
                <AvatarImage src={catalogueDetail?.uploadedBy?.profilepicture} className={`rounded-full`} />
              </Avatar>

              <p className="text-base  mt-[1.2vh] font-bold">{catalogueDetail?.uploadedBy?.name}</p>
            </div>
          </NavLink>
        </div>
        <div>
          <Button className="rounded-3xl mt-[1.3vh] mr-[2vh] bg-[#059669]"
          >
            {new Date(catalogueDetail?.date).toISOString().split('T')[0]}
          </Button>
        </div>
      </div>
    </Card>

  )
}

export default CatalogueUserDetail;