import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    console.log("Parmsn", params);
    console.log("hi from get");
    await connectToDB();
    const posts = await Prompt.find({ creator: params.id }).populate("creator");
    console.log("posts", posts);
    return new Response(JSON.stringify(posts), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to fetch", { status: 400 });
  }
};
