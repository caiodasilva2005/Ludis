import React from "react";

const SideBar = () => {
  return (
    <div className="h-screen w-48 bg-gray-800 text-white p-4">
      <div className="flex-col items-end">
        <ul>
          <li className="py-2">Username: </li>
          <li className="py-2">
            <a>Chats</a>
          </li>
          <li>
            <div className="divider divider-info" />
          </li>
          <li>
            <h1 className="text-2xl font-bold mb-4">Filters</h1>
          </li>
        </ul>
        <ul className="px-2">
          <details className="dropdown">
            <summary className="m-1 btn">Gender: {}</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
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
            <summary className="m-1 btn">Experience Level: {}</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
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
                <a>Help</a>
              </li>
            </ul>
          </details>
        </ul>
        <ul className="px-2">
          <details className="dropdown">
            <summary className="m-1 btn">Age: {}</summary>
            <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <a>Baby</a>
              </li>
              <li>
                <a>Young man</a>
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
      </div>
    </div>
  );
};

export default SideBar;
