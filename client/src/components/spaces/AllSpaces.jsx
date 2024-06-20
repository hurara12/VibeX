import React from 'react'
import {
    Card,
} from "@/shadcn-components/ui/card"
import { Button } from '@/shadcn-components/ui/button'
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import {useNavigate} from 'react-router-dom';

function AllSpaces({ imageUrl, spaceName, totalPosts, spaceSlug  }) {

    const navigate=useNavigate();
    const handleViewClick = async () => {
        navigate(`/space-dashboard/${spaceSlug}`);
    };

    return (
        <Card className=' mt-[2vh] ml-[2vh] rounded-3xl w-[45vh] h-[12vh]'>
        <div className='flex items-center'>
            <LazyLoadImage
                src={imageUrl}
                effect="blur"
                className={`w-[12vh] h-[11.7vh] rounded-3xl`}
            />
            <div className="flex flex-col mb-[3.8vh] ml-[1.5vh]">
                <p className="text font-bold">{spaceName}</p>
                <p className="text-xs">{totalPosts} posts</p>
            </div>
            <Button onClick={handleViewClick}  className="rounded-3xl mt-[3vh] font-bold text-sm ml-auto mr-[2vh] border border-black bg-white text-black">View</Button>
        </div>
    </Card>
    
    )
}

export default AllSpaces