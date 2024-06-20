import {
    Card,
    CardContent,
} from "@/shadcn-components/ui/card"
import React, { useEffect, useState } from 'react'
import { LazyLoadImage } from "react-lazy-load-image-component"
import { AiOutlineCloseCircle } from "react-icons/ai"
import ViewCatalogue from "./ViewCatalogue"

function CatalogueCover({ Catalogue }) {
    const [hovered, setHovered] = useState(false);
    const [isDialogOpen, setDialogOpen] = useState(false);
    const handleMouseEnter = () => {
        setHovered(true);
      };
    
      const handleMouseLeave = () => {
        setHovered(false);
      };
    const openCatalogueOptions=()=>{
        setDialogOpen(true);
    }
    const closeCatalogueOptions = (isOpen) => {
        setDialogOpen(isOpen);
    };

    return (
        <Card className=" relative w-[33vw] sm:w-[29vw] md:w-[30vw] lg:w-[18.7vw] h-[18vh] sm:h-[20vh] md:h-[20vh] lg:h-[40vh]  mr-[0.5vw] lg:m-1 sm:mb-1 md:mb-2 cursor-pointer"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={openCatalogueOptions}>
            <CardContent className="p-0">
                {hovered && (
                    <div className="absolute inset-0 bg-black opacity-50 rounded z-10"></div>
                )}
                {hovered && (
                    <div className="absolute inset-0 flex items-center justify-center text-white z-20">
                        <h3>{Catalogue.space}</h3>
                    </div>
                )}
                <LazyLoadImage
                    src={Catalogue.images[0].image_url}
                    effect="blur"
                    className={`object-cover rounded  w-[33vw] sm:w-[29w] md:w-[30vw] lg:w-[19vw] h-[18vh] sm:h-[20vh] md:h-[20vh] lg:h-[40vh]`}
                />
            </CardContent>
            {isDialogOpen &&
                <ViewCatalogue catalogueDetails={Catalogue} stateVar={isDialogOpen} closeCatalog={closeCatalogueOptions}/>
            }
        </Card>

    )
}

export default CatalogueCover