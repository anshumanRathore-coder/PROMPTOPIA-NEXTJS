"use client";

import Form from "@components/Form";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const page = () => {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);
  const { data: session } = useSession();
  const [post, setPost] = useState({
    prompt: "",
    tag: "",
  });

  const createPost = async (e) => {
    e.preventDefault();
    // console.log("hi");
    try {
      setSubmitting(true);
      const res = await axios.post("api/prompt/new", {
        prompt: post.prompt,
        userId: session?.user.id,
        tag: post.tag,
      });
      // console.log(res);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Form
      type="Create"
      submitting={submitting}
      post={post}
      setPost={setPost}
      createPost={createPost}
    />
  );
};

export default page;
