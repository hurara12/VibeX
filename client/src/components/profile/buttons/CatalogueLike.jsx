import React from 'react'
import { Button } from "@/shadcn-components/ui/button"
import { RiMore2Fill } from 'react-icons/ri';
import { FaEdit, FaTrash } from 'react-icons/fa'; // for FontAwesome icons
import { MdEdit, MdDelete, MdFavoriteBorder } from 'react-icons/md'; 

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/shadcn-components/ui/dialog"
function CatalogueOptions() {
  return (
    <Dialog>
  <DialogTrigger><MdFavoriteBorder className="text-4xl text-slate-800 mr-2 ml-2" /></DialogTrigger>
  <DialogContent>
    <DialogHeader>
      <DialogDescription className="flex flex-col items-center">
        
      </DialogDescription>
    </DialogHeader>
  </DialogContent>
</Dialog>
  )
}

export default CatalogueOptions