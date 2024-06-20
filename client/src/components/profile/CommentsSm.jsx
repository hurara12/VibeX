import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
} from "@/shadcn-components/ui/card"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/shadcn-components/ui/accordion"

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/shadcn-components/ui/avatar"

import { MdFavoriteBorder } from 'react-icons/md'
import ReplyCommentForm from './ReplyCommentForm'
import { MdDelete, MdEdit } from 'react-icons/md';
import { useEffect, useState } from 'react'
import getCommentBy_API from '@/apis/catalogue/commentBy_API'
import Cookies from 'js-cookie'
import 'react-lazy-load-image-component/src/effects/blur.css';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { CatalogueDeleteComment_API } from '@/apis/catalogue/CatalogueComments_API'
import getUser_API from '@/apis/generals/getUser_API'
function CommentsSm(props) {
    const [userData, setUserData] = useState(null);
    const [myUser, setMyUser] = useState([]);

    useEffect(() => {
        async function fetchData() {
            const myUse = await getUser_API(Cookies.get("jwtToken"));
            setMyUser(myUse);
        }
        fetchData();
    }, [])

    useEffect(() => {
        async function fetchData() {
            const commentUser = await getCommentBy_API(Cookies.get("jwtToken"), props.userComment._id);
            setUserData(commentUser);
        }
        fetchData();
    }, [])
    const deleteComment = async () => {
        const result = await CatalogueDeleteComment_API(Cookies.get("jwtToken"), props.userComment._id);
        const currComSiwtch = !props.switchVal;
        props.stateHandler(currComSiwtch);
    }
    return (
        <Card className="w-[95vw] flex flex-col p-2 mt-3
        lg:w-[60vw]">
            <div className="w-[95vw] flex flex-row pr-4 mt-3
            lg:w-[60vw]">
                <div>
                    <CardHeader className="p-0 ">
                        <CardDescription className="flex flex-col justify-between p-0 m-0 w-[14vw]
                        lg:w-[6vw]">
                            <Avatar className="w-[3.9vw] h-[4vw] ml-[1vw] mr-[1vw]">
                                <AvatarImage src={userData?.profilepicture} className={`rounded-full`} />
                            </Avatar>

                        </CardDescription>
                    </CardHeader>
                </div>
                <div className="flex-grow">
                    <CardContent className="flex flex-col p-0">
                        <p className="font-bold 
                        md:text-2xl
                        lg:text-base">{userData?.name}</p>

                        <p className="md:text-xl lg:text-sm">{props.userComment.commentText}

                        </p>

                    </CardContent>
                </div>
                <div className="sm:flex sm:flex-col sm:space-y-2 
                lg:flex-row lg:space-y-0">
                    {(myUser && userData && (myUser?._id == userData?._id)) ? <>
                        <div className="flex items-center mr-2">
                            <MdDelete className='flex text-2xl md:text-5xl lg:text-2xl text-red-500 cursor-pointer'
                                onClick={deleteComment} />
                        </div>
                        <div className="flex items-center mr-2">
                            <MdEdit className='flex text-2xl md:text-5xl lg:text-2xl cursor-pointer' />
                        </div>
                    </> : <div></div>
                    }
                    <div className="flex items-center mr-7">
                        <MdFavoriteBorder className='flex text-2xl md:text-5xl lg:text-2xl cursor-pointer' />
                    </div>
                </div>

            </div>
            <div className="w-[75vw] ml-14 md:ml-28
            lg:w-[50vw] lg:ml-[6vw] mb-6">
                <Accordion type="single" collapsible >
                    <AccordionItem value="item-1">
                        <AccordionTrigger className="md:text-xl lg:text-sm p-0 mt-2">REPLY</AccordionTrigger>
                        <div className="px-0 py-0">
                            <AccordionContent className="w-full ">
                                <div className="">
                                    <ReplyCommentForm commentDetails={props?.userComment} userId={userData?._id} />
                                </div>
                            </AccordionContent>
                        </div>
                    </AccordionItem>
                </Accordion>
            </div>
        </Card>

    )
}

export default CommentsSm
