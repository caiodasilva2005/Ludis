"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabase";
import { Profile, profileTable } from "@/app/Types/types";
import Image from "next/image";

const ViewProfilePage = () => {
  const [profileData, setProfileData] = useState<Profile>();
  const userId = 225;

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
    <div className="h-screen w-screen">
      <div className="w-1/5 m-5">
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
      <div className="w-1/5 justify-center items-center text-center m-5">
        <h1 className="text-4xl">{profileData?.username}</h1>
      </div>
      <div className="bg-black w-1/5 h-4/6 m-5">
          <h1>FEET</h1>
      </div>
    </div>
  );
};

export default ViewProfilePage;
