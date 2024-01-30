"use client";
import React from "react";
import { useState } from "react";
import ProfileDisplay from "./ProfileDisplay";

const ProfileDisplays = () => {
  const [profiles, setProfiles] = useState([
    {
      id: 1,
      username: "User1",
      experienceLevel: "Beginner",
      image: "../next.svg",
    },
    {
      id: 2,
      username: "User2",
      experienceLevel: "Intermediate",
      image: "../next.svg",
    },
  ]);

  const handleProfileChange = (newProfileData, profileId) => {
    setProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile.id === profileId ? { ...profile, ...newProfileData } : profile
      )
    );
  };

  return (
    <div className="overflow-y-auto h-56 w-screen">
      {profiles.map((profile) => (
        <ProfileDisplay
          key={profile.id}
          username={profile.username}
          experience={profile.experienceLevel}
          image={profile.image}
        />
      ))}
    </div>
  );
};

export default ProfileDisplays;
