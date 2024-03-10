"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabase";
import { Profile, profileTable, Post, postTable } from "@/app/Types/types";
import Image from "next/image";

const ViewProfilePage = () => {
  const [profileData, setProfileData] = useState<Profile>();
  const[postData, setPostData] = useState<Post>();
  const [profileId, setProfileId] = useState<number>(-1);
  const userId = 230;

  useEffect(() => {
    const fetchProfileInfo = async () => {
      console.log("working");
      try {
        const { data, error } = await supabase
          .from(profileTable)
          .select()
          .eq("id", userId);
        if (error) {
          throw error;
        }
        setProfileData(data[0]);
      } catch (error) {
        console.log("Error fetching profile info:", error);
      }
    };

    const fetchPostInfo = async () => {
      console.log("working");
      try {
        const { data, error} = await supabase
          .from(postTable)
          .select()
          .eq("postId", userId);
        if (error) {
          throw error;
        }
        setPostData(data[0]);
      } catch (error) {
        console.log("Error fetching post info:", error); 
      }
    };

    const storedProfileId = sessionStorage.getItem("ProfileToView");
    if (storedProfileId) {
      setProfileId(Number(storedProfileId));
      console.log("Here");
    }
    console.log("In profile view: ", storedProfileId);
    console.log(profileId);

    fetchProfileInfo();
    fetchPostInfo();
  }, []);

  return (
    <div className="h-screen w-full grid grid-cols-3 gap-0 flex-auto">
      <div className="m-3 h-full">
        <div className="m-16 max-h-44 flex-auto place-content-center content-center">
          {profileData?.image && (
            <Image className="rounded-full"
              src={profileData?.image}
              alt="Profile.pic"
              height="300"
              width="350"
              priority={false}
            />
          )}
        </div>
        <div className="flex justify-center items-center text-center m-9">
          <h1 className="text-4xl font-mono font-bold text-white">{profileData?.username}</h1>
        </div>
        <div className="grid grid-row-4 grid-col-3 gap-5">
          <div className="bg-indigo-800 rounded-full">
            <h1 className="p-4 font-mono col-span-1 text-white">Gender: {profileData?.gender}</h1>
          </div>
          <div className="bg-indigo-800 rounded-full">
            <h1 className="p-4 font-mono text-white">Experience: {profileData?.experience_level}</h1>
          </div>
          <div className="bg-indigo-800 rounded-full">
            <h1 className="p-4 font-mono text-white">Age: {profileData?.age}</h1>
          </div>
          <div className="bg-indigo-800 rounded-full">
            <h1 className="p-4 font-mono text-white">Location: {profileData?.location}</h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-10 w-full bg-indigo-800 col-span-2 flex-auto rounded-lg max-h-full">
        <div className="top-0 left-0 h-2/3 col-span-3 row-span-4">
          <h1 className="p-4 font-mono text-2xl font-bold text-indigo-400">About</h1>
          <p className="p-6 font-mono overflow-y-auto max-h-80 m-0 text-white">{profileData?.bio}</p>
        </div>
        <div className="h-full col-span-1 row-span-6">
          <h1 className="p-4 font-mono text-2xl font-bold text-indigo-400">Friends</h1>
          <div className="grid grid-row-10 row-span-1 grid-col-1 col-span-1 overflow-y-auto max-h-96">
            <h1 className="p-6 font-mono text-white">Friend 1</h1>
            <h1 className="p-6 font-mono text-white">Friend 2</h1>
            <h1 className="p-6 font-mono text-white">Friend 3</h1>
            <h1 className="p-6 font-mono text-white">Friend 4</h1>
            <h1 className="p-6 font-mono text-white">Friend 5</h1>
            <h1 className="p-6 font-mono text-white">Friend 6</h1>
            <h1 className="p-6 font-mono text-white">Friend 5</h1>
            <h1 className="p-6 font-mono text-white">Friend 6</h1>
          </div>
        </div>
        <div className="col-span-2 row-span-6">
          <h1 className="p-4 font-mono text-2xl font-bold text-indigo-400">Posts</h1>
          <div className="grid grid-row-5 col-span-2 overflow-y-auto max-h-96">
            <h1 className="p-6 font-mono text-white">{postData?.content}</h1>
            <h1 className="p-6 font-mono text-white">Post 2</h1>
            <h1 className="p-6 font-mono text-white">Post 3</h1>
            <h1 className="p-6 font-mono text-white">Post 4</h1>
            <h1 className="p-6 font-mono text-white">Post 5</h1>
            <h1 className="p-6 font-mono text-white">Post 6</h1>
          </div>
         </div>
      </div>
    </div>
  );
};
// SIDENOTE: Could also add searchbar filter to filter upon location rather than a selection-based one

export default ViewProfilePage;
