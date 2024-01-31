"use client";
import React from "react";
import MoreInfoModal from "./MoreInfoModal";
import { Stack } from "@mui/material";
import CustomButton from "./CustomButton";
import { useState, useEffect } from "react";

type Filter = {
  gender: string;
  experienceLevel: string;
};

const SideBar = () => {
  const [selectedGender, setSelectedGender] = useState<string>("");
  const [selectedExperienceLevel, setSelectedExperienceLevel] = useState("");

  const [filter, setFilter] = useState({
    gender: "",
    experienceLevel: "",
  });

  const updateGender = (gender: string) => {
    setSelectedGender(gender);
  };

  const updateExperienceLevel = (experienceLevel: string) => {
    setSelectedExperienceLevel(experienceLevel);
  };

  const handleFilter = () => {
    setFilter({
      gender: selectedGender,
      experienceLevel: selectedExperienceLevel,
    });
  };

  useEffect(() => {
    console.log(filter.gender);
    console.log(filter.experienceLevel);
  });

  return (
    <div className="h-screen w-48 bg-gray-800 text-white p-4 flex justify-center items-center">
      <Stack className="mt-4" spacing={1}>
        <div className="font-bold flex justify-center">Username</div>
        <div className="divider divider-info" />

        <Stack className="flex justify-center py-2" spacing={1}>
          <CustomButton type="info" page="/users/ChatPage" buttonText="Chats" />
          <CustomButton
            type="info"
            page="/users/ChatPage"
            buttonText="Friends"
          />
        </Stack>

        <div className="divider divider-info" />

        <h1 className="text-2xl font-bold mb-4">Filters</h1>

        <ul className="px-2">
          <details className="dropdown">
            <summary className="m-1 btn w-28">Gender:</summary>
            <ul className="p-2 text-black shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <a onClick={() => updateGender("Male")}>Male</a>
              </li>
              <li>
                <a onClick={() => updateGender("Female")}>Female</a>
              </li>
              <li>
                <a onClick={() => updateGender("Other")}>Other</a>
              </li>
            </ul>
          </details>
        </ul>
        <ul className="px-2">
          <details className="dropdown">
            <summary className="m-1 btn w-28">Experience Level:</summary>
            <ul className="p-2 text-black shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <a onClick={() => updateExperienceLevel("Beginner")}>
                  Beginner
                </a>
              </li>
              <li>
                <a onClick={() => updateExperienceLevel("Intermediate")}>
                  Intermediate
                </a>
              </li>
              <li>
                <a onClick={() => updateExperienceLevel("Advanced")}>
                  Advanced
                </a>
              </li>
              <li>
                <MoreInfoModal />
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
        <a role="button" className="btn btn-info" onClick={handleFilter}>
          Run Filter
        </a>
        <div className="divider divider-info py-4" />
      </Stack>
    </div>
  );
};

export default SideBar;
