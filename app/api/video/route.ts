import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import Replicate from "replicate";

const replicate = new Replicate({
    auth: process.env.REPLICATE_API_KEY
})

export async function POST(req: Request) {
    try {
        const authData = await auth(); // Await the auth() function
        const userId = authData?.userId; // Extract userId safely

        const body = await req.json();
        const { prompt } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        
        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }

        const input = {
            prompt: prompt,
            // start_image: "https://replicate.delivery/pbxt/MNRKHnYUu5HjNqEerj2kxWRmUD3xWGaZ0gJmhqVbkra2jCbD/underwater.jpeg"
        };
        
        const response = await replicate.run("kwaivgi/kling-v1.6-standard", { input });

        return NextResponse.json(response);
    } catch (error) {
        console.error("[VIDEO_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

