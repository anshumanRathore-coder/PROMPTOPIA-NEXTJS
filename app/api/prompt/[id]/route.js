import Prompt from "@models/Prompt";
import { connectToDB } from "@utils/database";

export const GET = async (request, { params }) => {
  try {
    await connectToDB();
    const res = await Prompt.findById(params.id).populate("creator");
    return new Response(JSON.stringify(res), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete", { status: 400 });
  }
};

export const DELETE = async (request, { params }) => {
  try {
    // console.log("Parmsn", params);
    console.log("hi from delete");
    await connectToDB();
    const resDelete = await Prompt.findByIdAndDelete({
      _id: params.id,
    });
    // console.log("resDelete", resDelete);
    const resGet = await Prompt.find({
      creator: resDelete.creator._id,
    }).populate("creator");
    // console.log("res", resGet);
    return new Response(JSON.stringify(resGet), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to delete", { status: 400 });
  }
};

export const PATCH = async (request, { params }) => {
  try {
    // console.log("Parmsn", params);
    console.log("hi from edit");
    const { prompt, tag } = await request.json();
    await connectToDB();
    const resUpdate = await Prompt.findByIdAndUpdate(
      params.id,
      {
        prompt,
        tag,
      },
      {
        new: true,
      }
    ).populate("creator");
    const resGet = await Prompt.find({
      creator: resUpdate.creator._id,
    }).populate("creator");
    console.log("res", resUpdate);
    return new Response(JSON.stringify(resGet), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Failed to edit", { status: 400 });
  }
};
