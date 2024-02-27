import React from "react";
import Image from "next/image";
import { Typography } from "@mui/material";
import { Profile, imageBucket, profileTable } from "../Types/types";
import PhotoDisplay from "./PhotoDisplay";

const ProfileDisplay = (prof: Profile) => {
  return (
    <div className="box-content relative bg-white shadow-lg mt-1 p-4 sm:w-1/2 h-52 rounded-lg">
      <div className="flex justify-start items-center">
        <div className="flex items-center border-4 rounded shadow-lg w-48 h-52">
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
          <button className="btn btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileDisplay;
