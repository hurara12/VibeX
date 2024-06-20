// FormPostSingle.js

import React, { useEffect, useState } from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/shadcn-components/ui/form'; // Import necessary components
import { Button } from '@/shadcn-components/ui/button'
import { toast } from '@/shadcn-components/ui/use-toast';
import { Textarea } from "@/shadcn-components/ui/textarea"
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import Cookies from 'js-cookie';
import { likeCatalogue_API } from '@/apis/catalogue/LikeCatalogue_API';
import getUser_API from '@/apis/generals/getUser_API';
import getCatalogue_API from '@/apis/catalogue/getCatalogue_API';
import getOneCatalogue_API from '@/apis/catalogue/getOneCatalogue_API';
import { CatalogueCommentAdd_API ,CatalogueCommentGet_API} from '@/apis/catalogue/CatalogueComments_API';


const FormSchema = z.object({
  comment: z.string().min(2, {
    message: "comment must be at least 2 characters.",
  }),
})

const FormPostSingle = (props) => {
  const [userData, setUserData] = useState(null);
  const [catalogueData, setCatalogueData] = useState(null);
  const [like, setLike] = useState(false);
  const [commentText, setCommentText] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedUser = await getUser_API(Cookies.get("jwtToken"));
        const catalogue = await getOneCatalogue_API(Cookies.get("jwtToken"), props?.postData?._id);

        setUserData(fetchedUser);
        setCatalogueData(catalogue);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    const userLiked = catalogueData?.likes.includes(userData._id);
    setLike(userLiked)
  }, [catalogueData])

  const likeClick = async () => {
    try {
      await likeCatalogue_API(Cookies.get("jwtToken"), props.postData._id, userData._id);
      const catalogue = await getOneCatalogue_API(Cookies.get("jwtToken"), props?.postData?._id);
      setCatalogueData(catalogue);
    }
    catch (error) {
      console.log(error);
    }
  }

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      comment: "",
    },
  })
  function onSubmit(data) {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const submitComment = async (event) => {
    event.preventDefault();
    await CatalogueCommentAdd_API(Cookies.get("jwtToken"), props.postData._id, commentText, userData._id)
    const truthVal=!props.switchVal;
    props.stateHandler(truthVal);
    setCommentText("")
    
  }
  const handleCommentChange = (event) => {
    setCommentText(event.target.value);
  };

  return (

    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}
        className="mt-4 w-full flex flex-col items-center  
     ">
        <div className="flex flex-row justify-start w-full lg:w-[60vw]">

          {like ?
            <MdFavorite onClick={likeClick} className='cursor-pointer text-4xl md:text-5xl ml-10  lg:text-3xl lg:m-0 text-red-500' />
            :
            <MdFavoriteBorder onClick={likeClick} className='cursor-pointer text-4xl md:text-5xl ml-10  lg:text-3xl lg:m-0 text-red-500' />
          }
          <p className="
      text-base mt-[1vh] font-bold 
      md:text-xl md:mt-[1.4vh]
      lg:text-xs lg:mt-[2vh] ml-[0.5vw]">
            Liked By {catalogueData?.likes.length} People,
          </p>

        </div>
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="mt-2">
              <FormLabel>Comment</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Write Your Comment About Post"
                  className="resize-none w-[80vw] 
                  md:text-xl
                  lg:w-[60vw] lg:text-base"
                  {...field}
                  onChange={handleCommentChange}
                  value={commentText}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-3 w-[80vw] 
      md:h-[5vh] md:text-lg
      lg:w-[60vw] lg:h-[7vh]" onClick={submitComment} >Submit</Button>

      </form>
    </Form>
  );
};

export default FormPostSingle;
