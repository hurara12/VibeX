import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn-components/ui/card"
import { TabsContent } from '@/shadcn-components/ui/tabs'
import React, { useEffect, useState } from 'react'
import CatalogueCover from './CatalogueCover'
import getCatalogue_API from '@/apis/catalogue/getCatalogue_API'
import Cookies from 'js-cookie'
import ViewCatalogue from './ViewCatalogue'
import getUser_API from "@/apis/generals/getUser_API"

function  Catalogue({profileId}) {
  const [catalogues,setCatalogue]=useState(null);
  const [selectedCatalogue,setSelectedCatalogue]=useState(null);
  const [userDetails,setUserDetails]=useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchUser = await getUser_API(Cookies.get("jwtToken"));
        setUserDetails(fetchUser);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);


  useEffect(()=>{
      const getCatalogue =async ()=>{
          const savedCatalogue=await getCatalogue_API(Cookies.get("jwtToken"),profileId);
          setCatalogue(savedCatalogue);
      }
      getCatalogue();
  },[userDetails]);

  return (
    <div>
    {selectedCatalogue?<ViewCatalogue/>:
    <TabsContent value="catalogue">
    <Card>
      <CardHeader>
        <CardTitle>Catalogue</CardTitle>
        <CardDescription>
          Save Your University Memories in Catalogues.
        </CardDescription>
      </CardHeader>
      <div className="grid w-full grid-cols-3">
      {catalogues? catalogues.map((catalogue,index)=>(
      <CatalogueCover  key={catalogue._id} Catalogue={catalogue} Index={index}/>)):<div></div>
      }
      </div>
    </Card>
  </TabsContent>
  }
  </div>
  )
}

export default Catalogue;