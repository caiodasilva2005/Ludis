"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabase";
import { Profile, profileTable } from "@/app/Types/types";
import Image from "next/image";

const ViewProfilePage = () => {
  const [profileData, setProfileData] = useState<Profile>();
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

    fetchProfileInfo();
  }, []);

  return (
    <div className="h-screen w-full grid grid-cols-3 gap-0 flex-auto">
      <div className="m-3 h-full">
        <div className="m-10 max-h-60 flex-auto place-content-center content-center">
          {profileData?.image && (
            <Image className="rounded-full"
              src={profileData?.image}
              //src="https://www.google.com/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png"
              alt="Profile.pic"
              height="300"
              width="350"
              priority={false}
            />
          )}
        </div>
        <div className="flex justify-center items-center text-center m-5">
          <h1 className="text-4xl font-mono">{profileData?.username}</h1>
        </div>
        <div className="bg-black h-3/5 m-5">
            <h1>FEET</h1>
        </div>
      </div>
      <div className="grid grid-cols-3 w-full h-full bg-black col-span-2 flex-auto">
        <div className="top-0 left-0 h-2/6 col-span-3">
              <h1>Summary</h1>
        </div>
        <div className="h-3/5">
          <h1>Friends</h1>
        </div>
        <div className="h-3/5 col-span-2">
          <h1>Posts</h1>
        </div>
      </div>
    </div>
  );
};

export default ViewProfilePage;
