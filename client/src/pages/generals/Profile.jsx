import checkProfile_API from "@/apis/generals/checkProfile_API"
import Account from "@/components/profile/Accout"
import Activity from "@/components/profile/Activity"
import Catalogue from "@/components/profile/Catalogue"
import VibeLayout from "@/components/shared/VibeLayout"
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/shadcn-components/ui/tabs"
import Cookies from "js-cookie"
import { useEffect, useState } from "react"
import { BiWindows } from "react-icons/bi"
import { useNavigate, useParams } from "react-router-dom"

export function Profile() {

  function myTemp() {
    let { userId } = useParams();
    const [userFlag, setUserFlag] = useState(false);
    const [myUserId, setMyUserId] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
      const fetchData = async () => {
        const profileStatus = await checkProfile_API(Cookies.get("jwtToken"), userId);

        if (!profileStatus) {
          navigate("/pop")
        }
        setUserFlag(profileStatus);
      }
      fetchData();
    }, [])


    return (
      <Tabs defaultValue="catalogue" className="w-screen sm:w-[90vw] lg:w-[58vw] mt-4">
        <TabsList className="grid w-full grid-cols-3 ">
          <TabsTrigger value="catalogue">Catalogue</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
        </TabsList>
        <Catalogue profileId={userId} />
        <Activity />
        <Account />

      </Tabs>
    )
  }
  return (
    <VibeLayout elementBody={myTemp} />
  )
}

export default Profile;