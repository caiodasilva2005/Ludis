import React from "react";
import ChatButton from "./ChatButton";
import MoreInfoModal from "./MoreInfoModal";

const SideBar = () => {
  // State to manage modal visibility
  return (
    <div className="h-screen w-48 bg-gray-800 text-white p-4">
      <div className="flex-col items-end">
        <ul>
          <li className="py-2">Username: </li>
          <ChatButton />
          <li>
            <div className="divider divider-info" />
          </li>
          <li>
            <h1 className="text-2xl font-bold mb-4">Filters</h1>
          </li>
        </ul>
        <ul className="px-2">
          <details className="dropdown">
            <summary className="m-1 btn w-28">Gender: {}</summary>
            <ul className="p-2 text-black shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <a>Male</a>
              </li>
              <li>
                <a>Female</a>
              </li>
              <li>
                <a>Other</a>
              </li>
            </ul>
          </details>
        </ul>
        <ul className="px-2">
          <details className="dropdown">
            <summary className="m-1 btn w-28">Experience Level: {}</summary>
            <ul className="p-2 text-black shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <a>Beginner</a>
              </li>
              <li>
                <a>Intermediate</a>
              </li>
              <li>
                <a>Advanced</a>
              </li>
              <li>
                <MoreInfoModal></MoreInfoModal>
              </li>
            </ul>
          </details>
        </ul>
        <ul className="px-2">
          <details className="dropdown">
            <summary className="m-1 btn w-28">Age: {}</summary>
            <ul className="p-2 text-black shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <a>Teen</a>
              </li>
              <li>
                <a>Young Adult</a>
              </li>
              <li>
                <a>Adult</a>
              </li>
              <li>
                <a>Elderly</a>
              </li>
            </ul>
          </details>
        </ul>
        <ul>
          <li>
            <div className="divider divider-info" />
          </li>
          <li>
            <h1 className="text-2xl font-bold mb-4">Workout</h1>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default SideBar;
