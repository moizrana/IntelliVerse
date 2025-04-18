
"use client";

import {ArrowRight, MessageSquare, ImageIcon, VideoIcon, Music, Code} from "lucide-react";
import {useRouter} from "next/navigation";

import { Card } from "@/components/ui/card";
import {cn} from "@/lib/utils";

const tools = [
  {
    label: "Conversation",
    icon: MessageSquare,
    color: "text-violet-500",
    bgcolor: "bg-violet-500/10",
    href: "/conversation"
  },
  {
    label: "Image Generation",
    icon: ImageIcon,
    color: "text-pink-700",
    bgcolor: "bg-pink-700/10",
    href: "/image"
  },
  {
    label: "Video Generation",
    icon: VideoIcon,
    color: "text-orange-700",
    bgcolor: "bg-orange-700/10",
    href: "/video"
  },
  {
    label: "Code Generation",
    icon: Code,
    color: "text-green-700",
    bgcolor: "bg-green-700/10",
    href: "/code"
  },
  {
    label: "Music Generation",
    icon: Music,
    color: "text-emerald-500",
    bgcolor: "bg-emerald-500/10",
    href: "/music"
  }
];

const DashboardPage = () => {
  const router = useRouter();
  return (
    <div>
      <div className= "mb-8 space-y-4">
        <h2 className = "text-2xl md:text-4xl font-bold text-center">
          Hey! Welcome to your dashboard
        </h2>
        <p className="text-muted-foreground font-light text-sm md-text-lg text-center">
          Explore the tools available to you. Click on any tool to get started.
        </p>
      </div>
      <div className="px-4 md:px-20 lg-px-32 space-y-4">
         {
          tools.map((tool) => (
            <Card
              onClick={() => router.push(tool.href)}
              key={tool.href}
              className= "p-4 border-black/5 flex items-center justify-between hover:shadow-md transition cursor-pointer"
            >
              <div className="flex items-center gap-x-4 w-full">
                <div className={cn("w-12 h-12 flex items-center justify-center rounded-md", tool.bgcolor)}>
                  <tool.icon className={cn("w-8 h-8", tool.color)} />
                </div>
                <div className="font-semibold text-lg flex-1">
                  {tool.label}
                </div>
                <ArrowRight className="h-5 w-5 shrink-0" />
              </div>     
            </Card>
          ))
         }
      </div>
      
    </div>
  )
}

export default DashboardPage;
