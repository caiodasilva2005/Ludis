import React from "react";
import Image from "next/image";
import { Profile } from "../Types/types";

const PhotoDisplay = ({ profile }) => {
  return (
    <div>
      <div className="flex items-center border-4 rounded shadow-lg w-48 h-52">
        <div className="overflow-hidden rounded w-full h-full">
          <Image
            alt="Profile pic"
            src={profile.image}
            height="520"
            width="460"
            objectFit="cover"
            className="rounded"
          />
        </div>
      </div>
    </div>
  );
};

export default PhotoDisplay;
