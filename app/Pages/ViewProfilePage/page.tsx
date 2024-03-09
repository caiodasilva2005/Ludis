"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabase";
import { Profile, profileTable } from "@/app/Types/types";
import Image from "next/image";

const ViewProfilePage = () => {
  const [profileData, setProfileData] = useState<Profile>();
  const userId = 231;

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

    fetchProfileInfo();
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
          <h1 className="text-4xl font-mono">{profileData?.username}</h1>
        </div>
        <div className="grid col-span-1 bg-black h-3/5 max-w-full m-5 rounded-lg">
          <div>
            <h1 className="p-4 font-mono">Gender: {profileData?.gender}</h1>
          </div>
          <div>
            <h1 className="p-4 font-mono">Experience: {profileData?.experience_level}</h1>
          </div>
          <div>
            <h1 className="p-4 font-mono">Location: Boston</h1>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 grid-rows-10 w-full bg-black col-span-2 flex-auto rounded-lg max-h-full">
        <div className="top-0 left-0 h-2/3 col-span-3 row-span-4">
          <h1 className="p-4 font-mono text-2xl font-bold">About</h1>
          <p className="p-6 font-mono overflow-y-scroll max-h-80 m-0">{profileData?.bio}</p>
        </div>
        <div className="h-full col-span-1 row-span-6">
          <h1 className="p-4 font-mono text-2xl font-bold">Friends</h1>
          <div className="grid grid-row-10 row-span-1 grid-col-1 col-span-1 overflow-y-scroll max-h-96">
            <h1 className="p-6 font-mono">Friend 1</h1>
            <h1 className="p-6 font-mono">Friend 2</h1>
            <h1 className="p-6 font-mono">Friend 3</h1>
            <h1 className="p-6 font-mono">Friend 4</h1>
            <h1 className="p-6 font-mono">Friend 5</h1>
            <h1 className="p-6 font-mono">Friend 6</h1>
            <h1 className="p-6 font-mono">Friend 5</h1>
            <h1 className="p-6 font-mono">Friend 6</h1>
          </div>
        </div>
        <div className="col-span-2 row-span-6">
          <h1 className="p-4 font-mono text-2xl font-bold">Posts</h1>
          <div className="grid grid-row-5 col-span-2 overflow-y-scroll max-h-96">
            <h1 className="p-6 font-mono">Post 1</h1>
            <h1 className="p-6 font-mono">Post 2</h1>
            <h1 className="p-6 font-mono">Post 3</h1>
            <h1 className="p-6 font-mono">Post 4</h1>
            <h1 className="p-6 font-mono">Post 5</h1>
            <h1 className="p-6 font-mono">Post 5</h1>
            <h1 className="p-6 font-mono">Post 5</h1>
            <h1 className="p-6 font-mono">Post 5</h1>
            <h1 className="p-6 font-mono">Post 5</h1>
            <h1 className="p-6 font-mono">Post 5</h1>
          </div>
         </div>
      </div>
    </div>
  );
};
// Replace Boston with {profileData?.location}
// ^^^ requires the addition of location column in the database
// SIDENOTE: Could also add searchbar filter to filter upon location rather than a selection-based one

export default ViewProfilePage;
