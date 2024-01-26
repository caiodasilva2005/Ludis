import React from "react";
import Image from "next/image";

const NavBar = () => {
  return (
    <div className="absolute top-0 left-0 navbar bg-slate-600 shadow-lg">
      <div className="ml-2 flex-1">
        <a className="btn btn-ghost text-xl">Ludis</a>
      </div>
      <div className="flex-none gap-2">
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                height="10"
                width="10"
                alt="profile pic"
                src="../../next.svg"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">Profile</a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
