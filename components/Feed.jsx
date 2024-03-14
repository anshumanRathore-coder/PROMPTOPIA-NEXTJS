"use client";

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import axios from "axios";
const Feed = () => {
  const [post, setpost] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const handleTagClick = () => {};
  const filterPost = post.filter((item) => {
    const value = searchValue.toLowerCase();
    return (
      item.prompt.toLowerCase().includes(value) ||
      item.tag.toLowerCase().includes(value) ||
      item.creator.username.toLowerCase().includes(value) ||
      item.creator.email.toLowerCase().includes(value)
    );
  });
  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get("api/prompt");
        setpost(res.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPost();
  }, []);
  return (
    <section className="">
      <div className="my-10 max-w-[30rem] mx-auto">
        <form>
          <input
            placeholder="Search..."
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            className="search_input "
          />
        </form>
      </div>
      {post && <PromptCard post={filterPost} handleTagClick={handleTagClick} />}
    </section>
  );
};

export default Feed;
