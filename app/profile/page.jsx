"use client";
import Form from "@components/Form";
import Profile from "@components/Profile";
import axios from "axios";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
const page = () => {
  const [post, setPost] = useState([]);
  const [update, setUpdate] = useState({
    prompt: "",
    tag: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [edit, setEdit] = useState(false);
  const [userId, setUserId] = useState("");
  const handleDelete = async (id) => {
    const res = await axios.delete(`api/prompt/${id}`);
    console.log(res);
    setPost(res.data);
  };
  const handleEdit = async (id) => {
    const res = await axios.get(`api/prompt/${id}`);
    console.log(res);
    setUserId(id);
    setUpdate({
      ...update,
      prompt: res.data.prompt,
      tag: res.data.tag,
    });
    setEdit(true);
    console.log("hi");
  };

  const createPost = async () => {
    try {
      const res = await axios.patch(`api/prompt/${userId}`, {
        prompt: update.prompt,
        tag: update.tag,
      });
      console.log("hi from createPost");
      console.log("res", res);
      setPost(res.data);
      // setEdit(false);
    } catch (error) {
      console.log("hi from createPost");
      console.log("Error", error);
    }
  };
  const { data: session } = useSession();

  useEffect(() => {
    const fetchPost = async () => {
      const res = await axios.get(`api/profile/${session?.user.id}/post`);
      setPost(res.data);
    };
    if (session?.user) fetchPost();
  }, [session?.user]);

  if (edit) {
    return (
      <>
        {update.prompt && update.tag && (
          <Form
            type="Edit"
            post={update}
            setUpdate={setUpdate}
            submitting={submitting}
            createPost={createPost}
          />
        )}
      </>
    );
  } else {
    return (
      <Profile
        type="My"
        desc="This is your personal profile where you can see all your post and also have access to delete and update of your posts"
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        post={post}
      />
    );
  }
};

export default page;
