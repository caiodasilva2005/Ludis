import React from "react";
import Image from "next/image";
import { Profile } from "../Types/types";

const PhotoDisplay = ({ profile } : { profile: Profile }) => {
  return (
    <div>
      <div className="flex items-center border-4 rounded shadow-lg w-48 h-52">
        <div className="overflow-hidden rounded w-full h-full">
          { profile.image ? <Image
            alt="Profile pic"
            src={profile.image}
            height="520"
            width="460"
            objectFit="cover"
            className="rounded"
          /> : null }
        </div>
      </div>
    </div>
  );
};

export default PhotoDisplay;
