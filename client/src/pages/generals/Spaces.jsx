
import React, { useEffect, useState } from 'react'
import VibeLayout from '@/components/shared/VibeLayout';


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/shadcn-components/ui/card"
import SpaceSearch from '@/components/spaces/TopSpaces';
import spaceArr from '@/components/spaces/SpaceArr';
import AllSpaces from '@/components/spaces/AllSpaces';
import getAllSpaces_API from '@/apis/spaces/getAllSpaces_API';
import Cookies from 'js-cookie';



const FormSchema = z.object({
    space: z.string().min(2, {
        message: "Spaces must be at least 2 characters.",
    }),
})


function Spaces() {
    return (
        <VibeLayout elementBody={myTemp} />
    )
}

function myTemp() {

    const [spacesData, setspacesData] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const Data = await getAllSpaces_API(Cookies.get("jwtToken"));
            const sortedData = Data.sort((a, b) => a._id.localeCompare(b._id));
            setspacesData(sortedData);

        }
        fetchData();
    }, [])

    console.log(spacesData);

    const form = useForm({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            space: "",
        },
    })

    return (
        <div className='mb-[2vh] ml-[4vh]'>
            <Card className="mt-[5vh] w-[110vh]">
                <CardHeader>
                    <CardTitle className="ml-[-1vh]">Top Spaces</CardTitle>
                </CardHeader>

                <CardContent className="flex flex-wrap overflow-x-auto ml-[-14.2vh]">
                    {spacesData
                        .sort((a, b) => b.totalCatalogues - a.totalCatalogues) 
                        .slice(0, 3) 
                        .map((space, index) => {
                            const matchedSpace = spaceArr.find(item => item.spaceSlug === space._id);
                            const imageUrl = matchedSpace ? matchedSpace.imageUrl : "";
                            return (
                                <div key={index} className={`${index > 0 ? 'ml-[-14vh]' : ''}`}>
                                    <SpaceSearch
                                        imageUrl={imageUrl}
                                        spaceName={space._id}
                                        totalPosts={space.totalCatalogues}
                                        spaceSlug={space._id}
                                    />
                                </div>
                            );
                        })}
                </CardContent>



            </Card>

            <p className='text-xl font-bold mt-[3vh] ml-[2vh]'>All Spaces</p>
            <div className="flex flex-wrap overflow-x-auto ml-[8.2vh]">
                {spacesData
                    .sort((a, b) => a._id.localeCompare(b._id)) 
                    .map((space, index) => {
                        const matchedSpace = spaceArr.find(item => item.spaceSlug === space._id);
                        const imageUrl = matchedSpace ? matchedSpace.imageUrl : ""; 
                        return (
                            <div key={index}>
                                <AllSpaces
                                    imageUrl={imageUrl}
                                    spaceName={space._id}
                                    totalPosts={space.totalCatalogues}
                                    spaceSlug={space._id}
                                />
                            </div>
                        );
                    })}
            </div>





        </div>
    )
}

export default Spaces