// ReplyCommentForm.js

import React, { useEffect, useState } from 'react';

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormField, FormItem, FormControl, FormMessage, FormLabel } from '@/shadcn-components/ui/form'; // Import necessary components
import { Input } from '@/shadcn-components/ui/input'
import { Button } from '@/shadcn-components/ui/button'
import { FaHeart } from 'react-icons/fa'
import { toast } from '@/shadcn-components/ui/use-toast';
import { Textarea } from "@/shadcn-components/ui/textarea"
import { MdFavorite, MdFavoriteBorder } from 'react-icons/md';
import Cookies from 'js-cookie';
import { CatalogueCommentReplyAdd_API, CatalogueCommentReplyGet_API } from '@/apis/catalogue/CatalogueComments_API';
import ReplySm from './ReplySm';
import getUser_API from '@/apis/generals/getUser_API';


const FormSchema = z.object({
  replyComment: z.string().min(2, {
    message: "replyComment must be at least 2 characters.",
  }),
})

const ReplyCommentForm = ({ commentDetails, userId }) => {
  const [replies,setReplies]=useState([]);
  const [replySwitch,setReplySwitch]=useState(false);
  const [userData,setUser]=useState(null);
  const handleReplySwitch=(val)=>{
    setReplySwitch(val);
  }
  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedUser = await getUser_API(Cookies.get("jwtToken"));
        setUser(fetchedUser);
      } catch (error) {
        console.error(error);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    //API Takes commentDetails._id, get Request is sent to server
    //server takes the id, loads the comment, and the from replies populate
    //all the replies.
    //CatalogueCommentReplyGet_API : PARS (jwtToken,CommentId)
    async function fetchData(){
      const replies= await CatalogueCommentReplyGet_API(Cookies.get("jwtToken"),commentDetails?._id);
      setReplies(replies.replies)
    }
    fetchData()
  }, [replySwitch])

  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      replyComment: "",
    },
  })
  async function onSubmit(data) {
    toast({
      title: 'You submitted the following values:',
      description: <p>{data.replyComment}</p>,
    });
    //Call Reply Here jwtToken,reply,commentId,userId)
    console.log("---------------$$-");
    console.log(userData._id);
    console.log("---------------$$-");
    const response = await CatalogueCommentReplyAdd_API(Cookies.get("jwtToken"), data?.replyComment, commentDetails?._id, userData?._id);
    form.setValue('replyComment', '');
    const replyState=!replySwitch;
    setReplySwitch(replyState);
    
  }
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-1 w-[75vw] flex flex-col items-center
    lg:w-[60vw] lg:items-stretch lg:ml-5 lg:mt-0">

          <FormField
            control={form.control}
            name="replyComment"
            render={({ field }) => (
              <FormItem className="">

                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none w-[70vw] md:text-xl
                  lg:w-[45vw] lg:text-sm"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" className="mt-3 w-[70vw] 
      md:text-lg md:h-[5vh]
      lg:w-[45vw] lg:h-[6vh] lg:text-sm">Submit</Button>

        </form>
      </Form>

      {Array.isArray(replies) &&
              replies.map((reply, index) => (
                <ReplySm key={index} replyData={reply} repSwitch={replySwitch} repSwitchHandle={handleReplySwitch} myUser={userData}/>
              ))
      }
      
    </div>

  )
}

export default ReplyCommentForm;
