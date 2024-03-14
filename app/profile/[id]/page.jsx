"use client";
import Profile from "@components/Profile";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
const Page = (params) => {
  const searchParams = useSearchParams();
  const userName = searchParams.get("name");
  const [post, setPost] = useState([]);
  const { data: session } = useSession();
  const router = useRouter();
  useEffect(() => {
    console.log(params.params);
    const fetchPost = async () => {
      try {
        console.log(`api/profile/${params.params.id}`);
        const res = await axios.get(`/api/profile/${params.params.id}`);
        console.log("res", res.data);
        setPost(res.data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };
    if (params.params.id) fetchPost();
  }, []);

  useEffect(() => {
    console.log("hi from useeefect");
    console.log(session?.user.id, params.params.id);
    if (session?.user.id === params.params.id) {
      console.log("hi from useeefect");
      router.push("/profile");
    }
  }, [session?.user.id]);
  return (
    <>
      {post.length > 0 && (
        <Profile
          type={post[0].creator.username}
          desc={`This is ${post[0].creator.username}'s profile where you can see all ${post[0].creator.username}'s posts`}
          post={post}
        />
      )}
    </>
  );
};

export default Page;
