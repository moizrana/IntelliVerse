import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import axios from "axios";

const TOGETHER_API_KEY = process.env.AI_API_KEY;
const TOGETHER_API_URL = "https://api.together.xyz/v1/chat/completions";

type ChatCompletionRequestMessage = {
    role: "system" | "assistant";
    content: string;
  };

const instructionMessage: ChatCompletionRequestMessage = {
    role: "system",
    content: "You are a code generator. You must answer only in markdown code snippets. Use code comments to explain your code"
};

export async function POST(req: Request) {
    try {
        const authData = await auth(); // Await the auth() function
        const userId = authData?.userId; // Extract userId safely

        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!TOGETHER_API_KEY) {
            return new NextResponse("Together.ai API Key not configured", { status: 500 });
        }
        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        const response = await axios.post(
            TOGETHER_API_URL,
            {
                model: "meta-llama/Llama-3.3-70B-Instruct-Turbo", // Change model if needed
                messages: [ instructionMessage, ...messages]
            },
            {
                headers: {
                    Authorization: `Bearer ${TOGETHER_API_KEY}`,
                    "Content-Type": "application/json",
                },
            }
        );

        return NextResponse.json(response.data.choices[0].message);
    } catch (error) {
        console.error("[CODE_ERROR]", error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}


// import { NextResponse } from "next/server";
// import { useAuth } from "@clerk/nextjs";
// import { OpenAIApi, Configuration } from "openai";
// const configuration = new Configuration({
//     apikey: process.env.AI_API_KEY,
// })

// const openai = new OpenAIApi(configuration);

// export async function POST(
//     req: Request
// ) {
//     try{
//         const {userId} = useAuth();
//         const body = await req.json();
//         const {messages} = body;

//         if(!userId){
//             return new NextResponse("Unauthorized", {status: 401});
//         }
//         if(!configuration.apikey) {
//             return new NextResponse("OpenAI API Key not configured", {status: 500});
//         }
//         if(!messages){
//             return new NextResponse("Messages are required", {status: 400});
//         }

//         const response = await open.createChatCompletion({
//             model: "gpt-3.5-turbo",
//             messages
//         })
//         return NextResponse.json(response.data.choices[0].message);

//     } catch(error){
//         console.log("[CONVERSATION_ERROR]", error);
//         return new NextResponse("Internal Error", {status: 500});
//     }
// }