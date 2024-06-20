import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/shadcn-components/ui/alert-dialog"

import { FaTrash } from "react-icons/fa"
import { Button } from "@/shadcn-components/ui/button"
import deleteCatalogue_API from "@/apis/catalogue/deleteCatalogue_API"
import Cookies from "js-cookie"
import CircularProgress from '@mui/material/CircularProgress';
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const CatalogueManageOptions = (props) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const DeleteCatalogue = async () => {
        setLoading(true);
        try {
            await deleteCatalogue_API(Cookies.get("jwtToken"), props.CatalogueId);            
            setTimeout(() => {
                setLoading(false);
            }, 2000);
            navigate(`/profile/${props?.userId}`)
            setTimeout(()=>{
                window.location.reload();
            },2000)
            

        } catch (error) {
            console.error('Error deleting catalogue:', error);
        }
    }

    return (

        <AlertDialog>
            <AlertDialogTrigger>
                <Button  className="w-[20vw] m-2 rounded-full text-sm mt-[1px] flex justify-right">
                    <FaTrash className="text-base mr-3 ml-3" />
                    <p className="">Delete</p>
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    {loading ? (
                        <CircularProgress />
                    ) : (
                        <Button className="mt-2 bg-red-500" onClick={DeleteCatalogue}>Delete</Button>
                    )}
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>

    )
}


export default CatalogueManageOptions;