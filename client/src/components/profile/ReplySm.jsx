import React, { useEffect, useState } from 'react'
import { Button } from "@/shadcn-components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/shadcn-components/ui/card"

import ImgUrl from "../../assets/ImageSlider/slider_3.jpg";
import { MdDelete, MdEdit, MdFavoriteBorder } from 'react-icons/md'
import getCommentBy_API from '@/apis/catalogue/commentBy_API';
import Cookies from 'js-cookie';
import { CatalogueDeleteReply_API } from '@/apis/catalogue/CatalogueComments_API';

function ReplySm({replyData,repSwitch,repSwitchHandle,myUser}) {
    const [userData, setUserData] = useState(null);
    useEffect(() => {
        async function fetchData() {
            const replyUser = await getCommentBy_API(Cookies.get("jwtToken"), replyData?._id);
            
            console.log("------------------------")
            console.log(replyUser)
            console.log("------------------------")
            setUserData(replyUser);

        }
        console.log('------------------')
        console.log(myUser);
        fetchData();
    }, [])
    const deleteReply=async ()=>{
        const response=await CatalogueDeleteReply_API(Cookies.get("jwtToken"),replyData?._id);
        const currRep=repSwitch;
        repSwitchHandle(!currRep);
    }
    return (
        <Card className="w-[71vw] flex flex-col p-2 mt-3 ml-2
        lg:w-[45vw] lg:items-stretch lg:ml-5 ">
            <div className="w-[71vw] flex flex-row pr-4 
            lg:w-[45vw] lg:m-0">
            <div>
                <CardHeader className="p-0 ">
                    <CardDescription className="flex flex-col justify-between p-0 m-0 w-[11vw] 
                    lg:w-[4vw]">
                        <img src={userData?.profilepicture} className="w-[8vw] h-[8vw] rounded-full 
                        lg:w-[3vw] lg:h-[3vw]" />

                    </CardDescription>
                </CardHeader>
            </div>
            <div className="flex-grow">
                <CardContent className="flex flex-col justify-between p-0">
                    <p className="font-bold md:text-xl lg:text-sm">{userData?.name}</p>

                    <p className="md:text-xl lg:text-xs">{replyData.commentText}
                    </p>
                    
                </CardContent>

            </div>
            <div className="sm:flex sm:flex-col sm:space-y-2 
                lg:flex-row lg:space-y-0">
                {myUser?._id==userData?._id?(<>
                <div className="flex items-center mr-2">
                    <MdDelete className='flex text-2xl md:text-5xl lg:text-2xl text-red-500' onClick={deleteReply}/>
                </div>
                
                <div className="flex items-center mr-2">
                    <MdEdit className='flex text-2xl md:text-5xl lg:text-2xl' />
                </div>
                </>
                ):<div></div>
                }
                <div className="flex items-center mr-4">
                    <MdFavoriteBorder className='text-2xl md:text-5xl lg:text-2xl' />
                </div>
                </div>
            </div>
           
        </Card>
        
    )
}

export default ReplySm
