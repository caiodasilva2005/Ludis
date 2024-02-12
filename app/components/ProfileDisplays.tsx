"use client";
import React from "react";
import { useState } from "react";
import ProfileDisplay from "./ProfileDisplay";
import { Filter, Profile, profileTable } from "../Types/types";
import { supabase } from "../utils/supabase";

interface ProfileDisplaysProps {
  profiles: Profile[];
  filter: Filter;
}

const ProfileDisplays = (props: ProfileDisplaysProps) => {
  return (
    <div className="overflow-y-auto h-56 w-screen">
      {props.profiles
        .filter((profile) => profile.gender === "male")
        .map((profile) => (
          <ProfileDisplay
            key={profile.id}
            id={profile.id}
            username={profile.username}
            experience_level={profile.experience_level}
            gender={profile.gender}
          />
        ))}
    </div>
  );
};

export default ProfileDisplays;
