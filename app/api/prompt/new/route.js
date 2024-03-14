import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";
import mongoose from "mongoose";
export const POST = async (request) => {
  try {
    // console.log("Request mesjbdfjsdbfk", await request.json());
    const { userId, prompt, tag } = await request.json();
    await connectToDB();
    const newPrompt = new Prompt({
      creator: userId,
      prompt,
      tag,
    });
    await newPrompt.save();
    console.log("newPrompt", newPrompt);
    return new Response(JSON.stringify(newPrompt), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("This is error", error);
    return new Response(JSON.stringify({ status: 400, error: error.message }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
};
