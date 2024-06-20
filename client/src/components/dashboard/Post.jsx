import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn-components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/shadcn-components/ui/carousel"
import { Badge } from "@/shadcn-components/ui/badge"

import PostedDetails from './PostedDetails';
import getAllCatalogue_API from '@/apis/catalogue/getAllCatalogue_API';
import getSpace_API from '@/apis/spaces/getOneSpace_API';
import Cookies from 'js-cookie';

function post({ isSpace }) {
  const [catalogues, setCatalogues] = useState([]);

  useEffect(() => {
    const fetchData = async () => {

      if (isSpace) {
        const spaceCatalogueData = await getSpace_API(Cookies.get("jwtToken"), isSpace);
        setCatalogues(spaceCatalogueData.catalogues);

      } else {
        const catalogueData = await getAllCatalogue_API(Cookies.get("jwtToken"));
        setCatalogues(catalogueData);
      }

    }
    fetchData();
  }, [])

  return (
    catalogues && catalogues.length > 0 ? (
      catalogues.reverse().map((catalogue, index) => (
        <div key={index}>
          <Card className="w-[45vw] mt-[5vh]">
            <Badge className="ml-[1vw] mt-[1vw] h-[4vh]">{catalogue?.space}</Badge>
            <CardTitle className="font-lobster-two-bold text-center font-extrabold text-4xl text-[#05756c] mt-4">
              {catalogue?.title}
            </CardTitle>
            <CardDescription className="font-lobster-two-bold text-center font-extrabold text-xl text-[#05756c] mt-2 mb-2">
              {new Date(catalogue?.date).toISOString().split('T')[0]}
            </CardDescription>
            <div className="flex justify-center w-[40vw]">
              <Carousel className="w-[45vw] ml-[5vw]">
                <CarouselContent>
                  {catalogue.images.map((image, index) => (
                    <CarouselItem key={index}><img src={image.image_url} alt="Slider" className="h-[50vh] w-full image object-cover rounded-xl" /></CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            </div>
            <CardFooter>
              <PostedDetails userData={catalogue?.uploadedBy} catalogueDetail={catalogue} />
            </CardFooter>
          </Card>
        </div>
      ))
    ) : (
      <div>No Content</div>
    )
  )
}

export default post