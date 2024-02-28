import React from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import { Profile, imageBucket, profileTable } from "../Types/types";
import PhotoDisplay from "./PhotoDisplay";
import CustomButton from "./CustomButton";

const ProfileDisplay = (prof: Profile) => {
  return (
    <div className="box-content relative bg-white shadow-lg mt-1 p-4 sm:w-1/2 h-52 rounded-lg">
      <div className="flex border-4 rounded shadow-lg w-48 h-52">
        <PhotoDisplay profile={prof} />
        <div className="flex-col p-4">
          <Typography className="py-2 font-mono text-black">
            Name: {prof.username}
          </Typography>
          <Typography className="py-2 font-mono text-black">
            Gender: {prof.gender}
          </Typography>
          <Typography className="py-2 font-mono text-black">
            Experience: {prof.experience_level}
          </Typography>
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        <CustomButton
          buttonText="View Profile"
          page="../Pages/ViewProfilePage"
          type="info"
        />
      </div>
    </div>
  );
};

export default ProfileDisplay;
