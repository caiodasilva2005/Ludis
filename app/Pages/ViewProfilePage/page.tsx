"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabase";
import { Profile, profileTable } from "@/app/Types/types";
import Image from "next/image";

const ViewProfilePage = () => {
  const [profileData, setProfileData] = useState<Profile>();
  const userId = 3;

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
        setProfileData(data);
      } catch (error) {
        console.log("Error fetching profile info:", error);
      }
    };

    fetchProfileInfo();
  }, []);

  return (
    <div>
      <p>Username: {profileData?.username}</p>
      {profileData?.image && (
        <Image
          src={profileData?.image}
          alt="Profile.pic"
          height="520"
          width="480"
          priority={false}
        />
      )}
    </div>
  );
};

export default ViewProfilePage;
