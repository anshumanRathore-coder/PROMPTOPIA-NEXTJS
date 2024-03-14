"use client";
import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";
import { useSession } from "next-auth/react";
import axios from "axios";
const Profile = ({ type, desc, handleEdit, handleDelete, post }) => {
  return (
    <section className="flex flex-col gap-5 flex-start w-full">
      <h1 className="head_text blue_gradient">{type} Profile</h1>
      <p className="desc">{desc}</p>
      {handleDelete && handleEdit && (
        <PromptCard
          post={post}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
      {!handleDelete && !handleEdit && (
        <PromptCard
          post={post}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      )}
    </section>
  );
};

export default Profile;
