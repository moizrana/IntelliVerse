import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

const TOGETHER_API_KEY = process.env.AI_API_KEY;
const TOGETHER_API_URL = "https://api.together.xyz/v1/images/generations";

export async function POST(req: Request) {
    try {
        const authData = await auth(); // Await the auth() function
        const userId = authData?.userId; // Extract userId safely

        const body = await req.json();
        const { prompt, amount = 1, resolution= "512x512" } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!TOGETHER_API_KEY) {
            return new NextResponse("Together.ai API Key not configured", { status: 500 });
        }
        if (!prompt) {
            return new NextResponse("Prompt is required", { status: 400 });
        }
        if (!amount) {
            return new NextResponse("Amount is required", { status: 400 });
        }
        if (!resolution) {
            return new NextResponse("Resolution is required", { status: 400 });
        }

        const [width, height] = resolution.split("x").map(Number);

        const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

        const images = [];

        for (let i = 0; i < parseInt(amount, 10); i++) {
        const response = await axios.post(
            TOGETHER_API_URL,
            {
            model: "black-forest-labs/FLUX.1-dev",
            prompt,
            width,
            height
            },
            {
            headers: {
                Authorization: `Bearer ${TOGETHER_API_KEY}`,
                "Content-Type": "application/json"
            }
            }
        );

        images.push(response.data.data[0]); // Assuming each call returns one image
        await delay(1000); // 1 second delay between requests to avoid 429
        }

        return NextResponse.json(images);
        
    } catch (error) {
        console.error("[IMAGE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
