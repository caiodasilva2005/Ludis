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
      </div>
    </div>
  );
};

export default SideBar;
