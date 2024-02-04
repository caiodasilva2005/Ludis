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
  const [selectedGender, setSelectedGender] = useState<string>("Male");
  const [selectedExperienceLevel, setSelectedExperienceLevel] =
    useState("Beginner");

  const [filter, setFilter] = useState({
    gender: "Male",
    experienceLevel: "Beginner",
  });

  const [genderButtonState, setGenderButtonState] =
    useState<string>("m-1 w-28 btn");
  const [expLButtonState, setExpLButtonState] =
    useState<string>("m-1 w-28 btn");

  const updateGender = (gender: string) => {
    setSelectedGender(gender);
    setGenderButtonState("m-1 w-28 btn");
  };

  const updateExperienceLevel = (experienceLevel: string) => {
    setSelectedExperienceLevel(experienceLevel);
    setExpLButtonState("m-1 w-28 btn");
  };

  const handleFilter = () => {
    setFilter({
      gender: selectedGender,
      experienceLevel: selectedExperienceLevel,
    });

    setGenderButtonState("m-1 w-28 btn bg-green-600");
    setExpLButtonState("m-1 w-28 btn bg-green-600");
  };

  return (
    <div className="h-screen w-48 bg-gray-800 text-white p-4 flex justify-center">
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
            <summary className={genderButtonState}>{selectedGender}</summary>
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
            <summary className={expLButtonState}>
              {selectedExperienceLevel}
            </summary>
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

        <a role="button" className="btn btn-info" onClick={handleFilter}>
          Run Filter
        </a>
        <div className="divider divider-info py-4" />
      </Stack>
    </div>
  );
};

export default SideBar;
