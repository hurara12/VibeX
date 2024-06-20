import { Button } from '@/shadcn-components/ui/button'
import { Dialog, DialogContent} from '@/shadcn-components/ui/dialog'
import React, { useEffect, useState } from 'react'
import ProfileCatalogueSlider from '../Slider/profileCatalogueSlider'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { AiFillMessage } from 'react-icons/ai';
import { GiBrain } from 'react-icons/gi'
import { useNavigate } from 'react-router-dom'

import { toast } from "@/shadcn-components/ui/use-toast"
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn-components/ui/card"
import CatalogueOptions from './buttons/CatalogueOptions'
import CatalogueLike from './buttons/CatalogueLike'
import getUser_API from '@/apis/generals/getUser_API'
import Cookies from 'js-cookie'


function    ViewCatalogue(props) {
    const [isDialogOpen, setDialogOpen] = useState(true);
    const [isSmallScreen, setIsSmallScreen] = useState(false);
    const [currUser,setCurrUser]=useState(null);
    const navigate = useNavigate();
    
    useEffect(() => {
        async function fetchData() {
          try {
            const fetchedUser = await getUser_API(Cookies.get("jwtToken"));
            setCurrUser(fetchedUser);
          } catch (error) {
            console.error(error);
          }
        }
        fetchData();
    }, []);
    
    useEffect(() => {

        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [])

    useEffect(() => {
        if (isSmallScreen) {
            navigate('/view-catalogue-sm', { state: props.catalogueDetails });
        }
    }, [isSmallScreen, navigate]);

    const formSchema = z.object({
        username: z.string().min(2, {
            message: "Username must be at least 2 characters.",
        }),
    })
    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: '',
        },
    });


    function onSubmit(data) {
        toast({
            title: "You submitted the following values:",
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
        })
    }

    useEffect(() => {
        if (isDialogOpen == false) {
            props.closeCatalog(false);
        }
    }, [isDialogOpen]);

    const handleNavigate=()=>{
        navigate("/view-catalogue-sm", { state: props.catalogueDetails });
    }

    return (
        <div >
            <Dialog open={isDialogOpen} onOpenChange={setDialogOpen}>
                <DialogContent className=" 
            flex flex-col lg:flex-row items-center max-w-[83vw] h-[94vh] pt-[5vh] lg:p-0
            sm:max-w-[425px] 
            md:max-w-[500px] md:h-[520px] 
            lg:max-w-[80vw] lg:h-[90vh] ">

                    <div className="flex flex-row items-center w-full h-[50vh] bg-black
                lg:h-[89.7vh] lg:flex-col lg:justify-center lg:w-1/2  lg:rounded-lg ">
                        <ProfileCatalogueSlider images={props.catalogueDetails.images} />
                    </div>

                    <div className="flex flex-col items-center w-1/2 mt-20  rounded-lg 
                    lg:h-[89.7vh] ">

                        <div className=''>

                            <Card className="w-[38vw]  whitespace-normal break-all mr-4" >
                                <CardHeader className="flex flex-row ">
                                    <CardTitle className="flex flex-row font-lobster-two-bold text-[#059669] ">
                                        <p className="">Memory</p>
                                        <GiBrain className="ml-2 text-2xl mr-[23.5vw]" />
                                        
                                        {(props?.catalogueDetails?.uploadedBy?._id===currUser?._id)?
                                        <div><CatalogueOptions CatalogueId={props?.catalogueDetails._id} userId={currUser?._id}/></div>
                                        :<div></div>}

                                    </CardTitle >

                                </CardHeader>
                                <CardContent className="">
                                    <p className="font-lobster-two-bold text-center font-extrabold text-4xl text-[#022c22]">{props.catalogueDetails.description}...</p>
                                </CardContent>
                                <CardFooter className="flex justify-end items-end">
                                    <p className="font-homemade-apple text-center font-extrabold text-lg text-[#022c22]">{new Date(props?.catalogueDetails?.date).toISOString().split('T')[0]}</p>
                                </CardFooter>

                            </Card>

                            <div className="flex flex-row w-full mt-4 mr-3">
                                <div className="flex justify-end w-1/2">
                                    <CatalogueLike/>
                                </div>
                                <div className="flex justify-start w-1/2">
                                    < AiFillMessage className="text-[6vh] mt-[0.3vh] cursor-pointer" onClick={handleNavigate}/>
                                </div>

                            </div>
                            <div className="flex flex-col items-center mt-2 mr-3">
                                <p className="text-blue-600 text-sm">{`${props?.catalogueDetails?.comments?.length} Comments, ${props?.catalogueDetails?.likes?.length} Likes on This Catalogue`}</p>
                                <Button className="mt-3 w-[20vw]" onClick={handleNavigate}>View Post</Button>
                            </div>

                        </div>

                    </div>

                </DialogContent>
            </Dialog>
        </div>
    )
}

export default ViewCatalogue