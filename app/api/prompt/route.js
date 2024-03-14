import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";

export const GET = async () => {
  try {
    await connectToDB();
    const data = await Prompt.find({}).populate("creator");
    console.log("hi");
    console.log("data", data[0]);
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Respose("Failed to fetch prompts", { status: 500 });
  }
};
