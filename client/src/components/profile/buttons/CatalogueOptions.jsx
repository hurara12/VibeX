import React from 'react'
import { Button } from "@/shadcn-components/ui/button"
import { RiMore2Fill } from 'react-icons/ri';
import { FaEdit } from 'react-icons/fa'; // for FontAwesome icons
import CatalogueManageOptions from "../CatalogueManageOptions"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTrigger,
  } from "@/shadcn-components/ui/dialog"

function CatalogueOptions(props) {
  return (
    <Dialog>
  <DialogTrigger><RiMore2Fill className='' /></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogDescription className="flex flex-col items-center">

        <Button className="w-[20vw] m-2 rounded-full text-sm mt-[1px] flex justify-right">
            <FaEdit className="text-lg mr-3"/>
            Edit
        </Button>
        <CatalogueManageOptions CatalogueId={props.CatalogueId} userId={props?.userId}/>
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default CatalogueOptions