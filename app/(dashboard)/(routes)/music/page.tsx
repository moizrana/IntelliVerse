"use client";

import axios from "axios";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {Heading} from "@/components/heading";
import {useForm} from "react-hook-form";
import {Music} from "lucide-react";
import {Form, FormControl, FormField, FormItem} from "@/components/ui/form";

import {formSchema} from "./constants";
//import {cn} from "@/lib/utils";

import {Input} from "@/components/ui/input";
import {useRouter} from "next/navigation";
import {useState} from "react";
import {Button} from "@/components/ui/button";
import {Empty} from "@/components/empty";
import {Loader} from "@/components/loader";

// type ChatCompletionRequestMessage = {
//     role: "user" | "assistant";
//     content: string;
//   };


const MusicPage = () => {
    const router = useRouter();
    const [music, setMusic] = useState<string>();

    const form = useForm<z.infer<typeof formSchema>> ({
        resolver: zodResolver(formSchema),
        defaultValues: {
            prompt: "" 
        }
    });
    
    const isLoading = form.formState.isSubmitting;
    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            setMusic(undefined);

            const response = await axios.post("/api/music", values);

            setMusic(response.data.audio);
            form.reset()

        }
        catch (error) {
            // TODO: Open Pro Model
            console.log(error)
        }
        finally {
            router.refresh();
        }
    }

    return(
        <div>
            <Heading 
                title="Music Generation"
                description="Turn your prompt into music."
                icon={Music}
                iconcolor="text-emerald-500"
                bgcolor="bg-emerald-500/10"
            />
            <div className="px-4 lg:px-8">
                <div>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="
                               rounded-lg
                               border
                               w-full
                               p-4
                               px-3
                               md:px-6
                               focus-within:shadow-sm
                               grid
                               grid-cols-12
                               gap-2
                            "
                        >
                            <FormField
                                name="prompt"
                                render={({field}) => (
                                    <FormItem className="col-span-12 lg-col-span-10">
                                        <FormControl className = "m-0 p-0">
                                            <Input 
                                                className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                                                disabled={isLoading}
                                                placeholder="Type your message here..."
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button className="col-span-12 lg-col-span-2 w-full" disabled={isLoading}>
                                Generate
                            </Button>
                        </form>
                    </Form>
                </div>
                <div className="space-y-4 mt-4">
                    {isLoading && (
                        <div className="p-8 rounded-lg w-full flex items-center justify-center bg-muted">
                            <Loader />
                        </div>
                    )}
                    {!music && !isLoading && (
                        <Empty label="No music generated."/>
                    )}
                   {music &&(
                        <audio controls className="w-full mt-8">
                            <source src={music} />
                        </audio>
                   )}
                </div>
            </div>
        </div>
    );
}
export default MusicPage; 
