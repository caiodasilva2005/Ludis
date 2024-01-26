import React from "react";
import Image from "next/image";

const ProfileDisplay = () => {
  return (
    <div className="box-content relative bg-white shadow-lg mt-1 p-4 sm:w-1/2 h-52 rounded-lg">
      <div className="flex justify-start items-center">
        <div className="border-4 rounded shadow-lg w-48 h-52">
          <Image
            alt="Profile pic"
            src="../../next.svg"
            width="960"
            height="520"
          />
        </div>
        <div className="flex-col p-4">
          <p className="py-2 font-mono">Username:{}</p>
          <p className="py-2 font-mono">Experience:{}</p>
          <p className="py-2 font-mono">Locations:{}</p>
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
  );
};

export default ProfileDisplay;
