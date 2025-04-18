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
            prompt_b: prompt
        };
        
        const response = await replicate.run("riffusion/riffusion:8cf61ea6c56afd61d8f5b9ffd14d7c216c0a93844ce2d82ac1c9ecc9c7f24e05", { input });

        return NextResponse.json(response);
    } catch (error) {
        console.error("[MUSIC_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}

