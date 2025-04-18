"use client";
import {Montserrat} from "next/font/google";
import Link from "next/link";
import Image from "next/image";
import {useAuth} from "@clerk/nextjs";

import {cn} from "@/lib/utils";
import {Button} from "@/components/ui/button";

const font = Montserrat({
    subsets: ["latin"],
    weight: "600",
});

export const LandingNavbar = () => {
    const {isSignedIn} = useAuth();
    return (
        <nav className = "p-4 bg-transparent flex items-center justify-between">
            <Link href = "/" className="flex items-center">
                <div className = "relative h-12 w-12 mr-1">
                    <Image
                        src = "/logo.png"
                        alt = "Logo"
                        fill
                    />
                </div>
                <h1 className={cn("text-2xl font-bold text-white", font.className)}>
                    IntelliVerse
                </h1>
            </Link>
            <div className="flex items-center gap-x-2">
                <Link href={isSignedIn ? "/dashboard" : "/sign-up"}>
                    <Button variant="outline" className="rounded-full">
                        Get Started
                    </Button>
                </Link>
            </div>
        </nav>
    )
}