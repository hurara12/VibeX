import React, { useEffect, useRef, useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/shadcn-components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/shadcn-components/ui/select"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage,
} from '@/shadcn-components/ui/form';
import { Input } from "@/shadcn-components/ui/input"
import { Label } from "@/shadcn-components/ui/label"
import { Button } from '@/shadcn-components/ui/button'
import { MdAddToPhotos } from "react-icons/md";

import { Card, CardContent } from "@/shadcn-components/ui/card"
import { GoPencil } from 'react-icons/go';
import { BiArrowBack } from 'react-icons/bi';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/shadcn-components/ui/carousel"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import addCatalogue_API from '@/apis/catalogue/addCatalogue_API';
import Cookies from 'js-cookie';
import base64Converter from '@/lib/base64Converter/base64Converter';
import { useNavigate } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import getUser_API from '@/apis/generals/getUser_API';



export function Catalogue() {
    const navigate = useNavigate();
    const [writePostWarning, setWritePostWarning] = useState(false);
    const [phase, setPhase] = useState(true);
    const [api, setApi] = useState(null);
    const [loading, setLoading] = useState(false);
    const [lastIndex, setLastIndex] = useState(0);
    const [selectedImages, setSelectedImages] = useState([]);
    const [userData, setUser] = useState(null);

    const formSchema = z.object({
        title: z.string().min(10, "Atleast 10 Chars").max(30, 'At Most 30 Chars.'),
        description: z.string().min(30, "Atleast 30 Chars").max(150, 'At Most 150 Chars.'),
        space: z.string().refine(value => ['alumini', 'student', 'event', 'lost and found', 'society', 'peertutoring', 'visitor', 'studentaffairs', 'fyppartner', 'company', 'careerservice'].includes(value), {
            message: 'Select Space.',
        }),
    });
    const phaseHandler = (state) => {
        setPhase(state);
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
        if (api) {
            api.reInit();
            api.scrollTo(lastIndex, { speed: 10 });
        }
    }, [selectedImages, api, phase])

    const handleFileChange = (event) => {
        const files = event.target.files;
        const fileListArray = Array.from(files);
        const updatedImages = [...selectedImages, ...fileListArray];
        event.target.value = null;
        setLastIndex(lastIndex + 1);
        setSelectedImages(updatedImages);
    };
    const handleButtonClick = (indexToRemove) => {

        const updatedImages = selectedImages.filter((_, index) => index !== indexToRemove);
        if (indexToRemove === 0) {
            setLastIndex(0);
        }
        else if (indexToRemove > 0) {
            setLastIndex(indexToRemove - 1);
        }
        setSelectedImages(updatedImages);
    };
    const handleWritePost = () => {
        if (selectedImages.length === 0) {
            setWritePostWarning(true);
            return
        }
        setPhase(false);
        setWritePostWarning(false);
    }
    const handleBackToUpload = () => {
        setPhase(true);
    };

    const form = useForm({
        resolver: zodResolver(formSchema),
        defaultValues: {
            description: '',
            space: '',
            title: '',
        },
    });

    const onSubmit = async (data) => {
        const base64Images = await Promise.all(selectedImages.map(file => base64Converter(file)));
        const catalogue = {
            description: data.description,
            title: data.title,
            space: data.space,
            images: base64Images
        }

        setLoading(true);
        try {
            await addCatalogue_API(Cookies.get("jwtToken"), catalogue);
            setTimeout(() => {
                setLoading(false);
            }, 3000);

            setTimeout(() => {
                navigate(`/profile/${userData?._id}`)
                window.location.reload();
            }, 4000);

        } catch (error) {
            console.error('Error deleting catalogue:', error);
        }


    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className="flex flex-row justify-between  lg:w-32">
                    <a><MdAddToPhotos className="text-3xl md:text-4xl text-black mt-3 md:mt-4" /></a>
                    <p className="text-base  mt-3 hidden lg:block">Create</p>
                </div>
            </DialogTrigger>
            {phase ?
                // Here we have the First Part Of Catalogue
                <DialogContent className="max-w-[300px] sm:max-w-[425px] md:max-w-[500px] lg:max-w-[600px] h-[450px] md:h-[520px] lg:h-[540px] overflow-y-auto  
                	">
                    <DialogHeader>

                        <DialogTitle className="md:text-lg">New Event Catalogue</DialogTitle>
                        <DialogDescription className="md:text-base">
                            Share Your Memories With Friends
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col justify-center">
                        <div className="flex flex-col items-center ">
                            <Label htmlFor="name" className="md:text-base">
                                Upload Your Memories
                            </Label>
                            {writePostWarning ? <p className="text-sm text-red-500">Upload Atleast One Picture</p> : <br />}
                            <Input
                                id="picture"
                                type="file"
                                multiple
                                className="w-40 md:w-3/6  mb-2"
                                onChange={handleFileChange}
                            />


                        </div>
                        <div className="flex flex-col items-center">
                            <Carousel className="w-44 md:w-3/6 md:ml-30" key={selectedImages.length} setApi={setApi}>
                                <CarouselContent>
                                    {selectedImages && selectedImages.length !== 0 ?
                                        selectedImages.map((file, index) => (
                                            <CarouselItem key={index}>
                                                <div className="p-1">
                                                    <Card >
                                                        <CardContent className="relative flex aspect-square items-center justify-center p-6">
                                                            <button
                                                                onClick={() => handleButtonClick(index)}  // Replace handleButtonClick with your actual function
                                                                className="absolute top-0 right-0 mt-1 ml-1 bg-black rounded-full text-white"
                                                            >
                                                                {/* Add your button icon or text here */}
                                                                <AiOutlineCloseCircle className="text-2xl" />
                                                            </button>

                                                            {/* Image */}
                                                            <img
                                                                src={URL.createObjectURL(file)}
                                                                alt={`Selected ${index + 1}`}
                                                                className="h-full w-full rounded object-cover"
                                                            />
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        ))
                                        : Array.from({ length: 5 }).map((_, index) => (
                                            <CarouselItem key={index}>
                                                <div className="p-1">
                                                    <Card>
                                                        <CardContent className="flex aspect-square items-center justify-center p-6">
                                                            <span className="text-4xl font-semibold">{index + 1}</span>
                                                        </CardContent>
                                                    </Card>
                                                </div>
                                            </CarouselItem>
                                        ))}

                                </CarouselContent>
                                <CarouselPrevious />
                                <CarouselNext />
                            </Carousel>
                        </div>


                        {/* Carosel */}
                    </div>

                    <div className="flex flex-row justify-center">
                        <DialogFooter >
                            <Button type="submit" className="bg-zinc-950 text-white " onClick={handleWritePost}>
                                <GoPencil className=" mr-2 mt-1 text-sm" />Write Post</Button>

                        </DialogFooter>
                    </div>

                </DialogContent>
                //here begins the second part of the catalogue
                :
                // The Second Catalogue Part Begins below
                <DialogContent className="flex flex-col items-center max-w-[300px] h-[550px] overflow-auto
                 sm:max-w-[425px] 
                 md:max-w-[500px] md:h-[520px]
                 lg:max-w-[600px] lg:h-[540px] ">
                    <DialogHeader>
                        <div style={{ position: 'fixed', top: '0', left: '0', padding: '10px' }}>
                            <BiArrowBack className="cursor-pointer mt-2" onClick={handleBackToUpload} />
                        </div>
                        <DialogTitle>Almost There....</DialogTitle>
                        <DialogDescription>
                            Select Cover,Description and Category
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col items-center justify-around">
                        <Carousel
                            opts={{
                                align: "start",
                            }}
                            className="w-40 md:w-3/6 md:ml-30"
                        >
                            <CarouselContent>

                                {selectedImages && selectedImages.length !== 0 ?
                                    selectedImages.map((file, index) => (
                                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex aspect-square items-center justify-center p-2">
                                                        <img
                                                            src={URL.createObjectURL(file)}
                                                            alt={`Selected ${index + 1}`}
                                                            className="h-full w-full rounded object-cover"
                                                        />
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))

                                    :
                                    // If there we're no images.
                                    Array.from({ length: 5 }).map((_, index) => (
                                        <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                            <div className="p-1">
                                                <Card>
                                                    <CardContent className="flex aspect-square items-center justify-center p-6">
                                                        <span className="text-3xl font-semibold">{index + 1}</span>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </CarouselItem>
                                    ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                        </Carousel>
                        <div className="flex flex-col items-center justify-between ">
                            <Form {...form} >
                                <form onSubmit={form.handleSubmit(onSubmit)} className="w-60 ">
                                    <FormField
                                        control={form.control}
                                        name="title"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel>Title</FormLabel>
                                                <Input {...field} placeholder="Enter Post Title" />
                                                {form.formState.errors.title ? (
                                                    <FormMessage />
                                                ) : (
                                                    <div className="text-sm mt-4"></div>
                                                )}
                                            </FormItem>
                                        )}
                                    />
                                    {/* Description Input Field */}
                                    <FormField
                                        control={form.control}
                                        name="description"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel>Description</FormLabel>
                                                <Input {...field} placeholder="Enter your description" />
                                                {form.formState.errors.description ? (
                                                    <FormMessage />
                                                ) : (
                                                    <div className="text-sm mt-4"></div>
                                                )}
                                            </FormItem>
                                        )}
                                    />

                                    {/* Space Select Field */}
                                    <FormField
                                        control={form.control}
                                        name="space"
                                        render={({ field }) => (
                                            <FormItem >
                                                <FormLabel>Space</FormLabel>
                                                <Select onValueChange={field.onChange} defaultValue={field.value}>
                                                    <FormControl>
                                                        <SelectTrigger>
                                                            <SelectValue placeholder="Select a space" />
                                                        </SelectTrigger>
                                                    </FormControl>
                                                    <SelectContent>

                                                        <SelectItem value="alumini">Alumini</SelectItem>
                                                        <SelectItem value="student">Student</SelectItem>
                                                        <SelectItem value="event">Event</SelectItem>
                                                        <SelectItem value="lost-and-found">Lost and Found</SelectItem>
                                                        <SelectItem value="society">Society</SelectItem>
                                                        <SelectItem value="careerservice">Career Service</SelectItem>
                                                        <SelectItem value="company">Company</SelectItem>
                                                        <SelectItem value="fyppartner">FYP partner</SelectItem>
                                                        <SelectItem value="studentaffairs">Student Affairs</SelectItem>
                                                        <SelectItem value="visitor">Visitor</SelectItem>
                                                        <SelectItem value="peertutoring">PeerTutoring</SelectItem>


                                                    </SelectContent>
                                                </Select>
                                                {form.formState.errors.space ? (
                                                    <FormMessage />
                                                ) : (
                                                    <div className="text-sm">Catalogue is Shared in Space</div>
                                                )}
                                            </FormItem>
                                        )}
                                    />
                                    {/* Submit Button */}
                                    <DialogFooter>
                                        {loading ? (
                                            <CircularProgress />
                                        ) : (
                                            <Button className="mt-3" type="submit" >Submit Post</Button>
                                        )}
                                    </DialogFooter>
                                </form>
                            </Form>
                        </div>

                    </div>


                </DialogContent>
            }
        </Dialog>
    )
}


export default Catalogue;