"use client"

import {Card, CardHeader, CardTitle, CardContent} from "@/components/ui/card";

const Testimonials = [
    {
       name: "Ahmad",
       avatar: "A",
       title: "Software Engineer",
       description: "This is very helpful application I've used!"
    },
    {
        name: "John",
        avatar: "J",
        title: "Marketing Manager",
        description: "Good application for managing tasks and projects."
     },
     {
        name: "Ahmad",
        avatar: "A",
        title: "Software Engineer",
        description: "This is very helpful application I've used!"
     },
     {
        name: "Ahmad",
        avatar: "A",
        title: "Software Engineer",
        description: "This is very helpful application I've used!"
     }
]
export const LandingContent = () => {
    return(
        <div className="px-10 pb-20">
            <h2 className="text-4xl font-extrabold text-white text-center mb-10">
              Testimonials
            </h2>   
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Testimonials.map((item) => (
                    <Card key={item.description} className="bg-[#192339] text-white border-none">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-x-2">
                                <div>
                                    <p className="text-lg">
                                        {item.name}
                                    </p>
                                    <p className="text-zinc-400 text-sm">
                                        {item.title}
                                    </p>
                                </div>
                            </CardTitle>
                            <CardContent className="pt-4 px-0">
                                {item.description}
                            </CardContent>
                        </CardHeader>
                    </Card>
                ))} 
            </div>        
        </div>
    )
}