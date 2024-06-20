import VibeLayout from "@/components/shared/VibeLayout";

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/shadcn-components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shadcn-components/ui/form"
import { Input } from "@/shadcn-components/ui/input"
import { toast } from "@/shadcn-components/ui/use-toast"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn-components/ui/card"
import UserSearch from "@/components/search/UserSearch";
import getAllUsers_API from "@/apis/generals/getAllUsers_API";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import searchUser_API from "@/apis/search/searchUser_API";


const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
})




export function Search() {
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const users = await getAllUsers_API(Cookies.get("jwtToken"));
      setAllUsers(users);
    }
    fetchData();
  }, [])

  function myTemp() {
    const form = useForm({
      resolver: zodResolver(FormSchema),
      defaultValues: {
        username: "",
      },
    })

    async function onSubmit(data) {
      
      //Here I will make a call to server to send get the similar users
      //setAllUsers will be set to new users
      const myUsers=await searchUser_API(Cookies.get("jwtToken"),data.username);
      if(myUsers){
        console.log(myUsers);
        setAllUsers(myUsers);
        toast({
          title: "Found",
          description:`You Searched For ${data.username}`,
        })
      }
      else{
        toast({
          title: "No Matching Result Found",
          description:`You Searched For ${data.username}`,
        })
        console.log("-------------");

      }
    }
    return (
      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex ">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input placeholder="Search User" {...field} className="mt-[6vh] 
                 sm:w-[70vw] 
                 md:md:text-lg
                 lg:w-[40vw] lg:text-base"
                    />
                  </FormControl>
                  {form.formState.errors.username ? (
                    <FormMessage>{form.formState.errors.username.message}</FormMessage>
                  ) : (
                    <div className="p-[2vh]"></div>
                  )}
                </FormItem>
              )}
            />
            <Button type="submit" className="mt-[6vh] ml-[4vw] 
        sm:w-[15vw] 

        lg:w-[8vw] lg:text-sm lg:ml-[2vw]">find</Button>
          </form>
        </Form>
        <Card className="mt-[5vh]">
          <CardHeader>
            <CardTitle>Students</CardTitle>
            <CardDescription>Find Your Friends</CardDescription>
          </CardHeader>
          <CardContent>
            {allUsers && allUsers.length > 0 ? (
              allUsers.map((user, index) => (
                <UserSearch userData={user} key={index}/>
              ))
            ) : (
              <div></div>
            )}

          </CardContent>
          <CardFooter>

          </CardFooter>
        </Card>

      </div>
    )
  }
  return (
    <VibeLayout elementBody={myTemp} />
  )
}

export default Search;