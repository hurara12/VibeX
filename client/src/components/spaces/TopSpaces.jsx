import React from 'react'
import {
    Card,
} from "@/shadcn-components/ui/card"
import { Button } from '@/shadcn-components/ui/button'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useNavigate } from 'react-router-dom';


function SpaceSearch({ imageUrl, spaceName, totalPosts, spaceSlug }) {
   
    const navigate = useNavigate();

    const handleViewClick = async () => {
        navigate(`/space-dashboard/${spaceSlug}`);
    };

    return (
        <Card className="rounded-3xl w-[32vh] h-[36vh] mt-[1vh] ml-[16vh] ">
            <>
                <LazyLoadImage
                    src={imageUrl}
                    effect="blur"
                    className={`w-[32vh] h-[20vh] rounded-3xl`}
                />
                <p className="text mt-[1vh] ml-[1vw] font-bold">{spaceName}</p>
                <p className="text-xs  ml-[1.8vh] ">{totalPosts} posts</p>
                <div>
                    <Button onClick={handleViewClick} className="rounded-3xl font-bold text-sm w-[26vh] mt-[1.8vh] ml-[2.8vh] border border-black bg-white text-black">View</Button>
                </div>
            </>
        </Card>
    )
}


export default SpaceSearch