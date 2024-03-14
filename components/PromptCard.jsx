import React, { useState } from "react";
import { data } from "./Feed";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
const PromptCard = ({ post, handleTagClick, handleDelete, handleEdit }) => {
  const path = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const [copyState, setCopyState] = useState("");
  const handleCopy = (prompt, id) => {
    // console.log(prompt, id);
    setCopyState(id);
    navigator.clipboard.writeText(prompt);
    setTimeout(() => {
      setCopyState("");
    }, 3000);
  };
  return (
    <section className="w-full">
      <div className="w-full flex justify-start flex-wrap space-x-3 mb-10 space-y-5">
        {post.map((item) => (
          <div key={item._id} className="prompt_card">
            <div className="flex gap-5 items-center  ">
              <div className="">
                <Image
                  onClick={() => {
                    session?.user.id === item.creator._id
                      ? router.push("/profile")
                      : router.push(`/profile/${item.creator._id}`);
                  }}
                  src={item.creator.image}
                  width={20}
                  height={20}
                  alt="profile_pic"
                  className="rounded-full cursor-pointer"
                />
              </div>
              <div>
                <p
                  onClick={() => {
                    session?.user.id === item.creator._id
                      ? router.push("/profile")
                      : router.push(`/profile/${item.creator._id}`);
                  }}
                  className="desc cursor-pointer"
                >
                  {item.creator.username}
                </p>
                <p
                  onClick={() => {
                    session?.user.id === item.creator._id
                      ? router.push("/profile")
                      : router.push(`/profile/${item.creator._id}`);
                  }}
                  className="text-xs text-gray-500"
                >
                  {item.creator.email}
                </p>
              </div>
              <div className="flex-1 copy_btn">
                <Image
                  src={`${
                    copyState === item._id && copyState
                      ? "/assets/icons/tick.svg"
                      : "/assets/icons/copy.svg"
                  }`}
                  className="cursor-pointer"
                  onClick={() => handleCopy(item.prompt, item._id)}
                  width={20}
                  height={20}
                  alt="icon"
                />
              </div>
            </div>
            <div>
              <p className="text-lg">{item.prompt}</p>
              <p
                className="text-sm text-gray-500 cursor-pointer "
                onClick={() => handleTagClick && handleTagClick()}
              >
                {item.tag}
              </p>
            </div>
            <div>
              {path === "/profile" && session?.user.id === item.creator._id ? (
                <div className="flex gap-5 mt-10">
                  <button
                    onClick={() => handleDelete && handleDelete(item._id)}
                    className="outline_btn hover:bg-red-400"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => handleEdit && handleEdit(item._id)}
                    className="black_btn"
                  >
                    Edit
                  </button>
                </div>
              ) : (
                <></>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PromptCard;
