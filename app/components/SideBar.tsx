"use client";
import React from "react";
import { Stack } from "@mui/material";
import CustomButton from "./CustomButton";
import { useState, useEffect } from "react";
import { GenderFilter, ExperienceLevelFilter, Filter } from "../Types/types";

const SideBar = ({ onFetchProfiles, onFilterChange }) => {
  const [selectedGender, setSelectedGender] = useState<GenderFilter>({
    filMale: false,
    filFemale: false,
    filOther: false,
  });

  const [selectedExperienceLevel, setSelectedExperienceLevel] =
    useState<ExperienceLevelFilter>({
      filBeginner: false,
      filIntermediate: false,
      filAdvanced: false,
    });

  const [filter, setFilter] = useState<Filter>({
    gender: selectedGender,
    experience_level: selectedExperienceLevel,
  });

  const [genderButtonState, setGenderButtonState] =
    useState<string>("m-1 w-28 btn");
  const [expLButtonState, setExpLButtonState] =
    useState<string>("m-1 w-28 btn");

  const updateGender = (gender: GenderFilter) => {
    setSelectedGender(gender);
    setGenderButtonState("m-1 w-28 btn");
  };

  const updateExperienceLevel = (experienceLevel: ExperienceLevelFilter) => {
    setSelectedExperienceLevel(experienceLevel);
    setExpLButtonState("m-1 w-28 btn");
  };

  const handleFilter = () => {
    setFilter({
      gender: selectedGender,
      experience_level: selectedExperienceLevel,
    });

    setSelectedGender({
      filMale: false,
      filFemale: false,
      filOther: false,
    });

    setSelectedExperienceLevel({
      filBeginner: false,
      filIntermediate: false,
      filAdvanced: false,
    });

    setGenderButtonState("m-1 w-28 btn btn-success");
    setExpLButtonState("m-1 w-28 btn btn-success");

    onFetchProfiles();
  };

  useEffect(() => {
    onFilterChange(filter);
  }, [filter, onFilterChange]);

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
            <summary className={genderButtonState}>Gender</summary>
            <ul className="p-2 text-black shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <a
                  className={`text-black ${
                    selectedGender.filMale ? "bg-green-600" : "bg-white"
                  }`}
                  onClick={() =>
                    updateGender({
                      filMale: !selectedGender.filMale,
                      filFemale: selectedGender.filFemale,
                      filOther: selectedGender.filOther,
                    })
                  }
                >
                  Male
                </a>
              </li>
              <li>
                <a
                  className={`text-black ${
                    selectedGender.filFemale ? "bg-green-600" : "bg-white"
                  }`}
                  onClick={() =>
                    updateGender({
                      filMale: selectedGender.filMale,
                      filFemale: !selectedGender.filFemale,
                      filOther: selectedGender.filOther,
                    })
                  }
                >
                  Female
                </a>
              </li>
              <li>
                <a
                  className={`text-black ${
                    selectedGender.filOther ? "bg-green-600" : "bg-white"
                  }`}
                  onClick={() =>
                    updateGender({
                      filMale: selectedGender.filMale,
                      filFemale: selectedGender.filFemale,
                      filOther: !selectedGender.filOther,
                    })
                  }
                >
                  Other
                </a>
              </li>
            </ul>
          </details>
        </ul>
        <ul className="px-2">
          <details className="dropdown">
            <summary className={expLButtonState}>Experience Level:</summary>
            <ul className="p-2 text-black shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-52">
              <li>
                <a
                  className={`text-black ${
                    selectedExperienceLevel.filBeginner
                      ? "bg-green-600"
                      : "bg-white"
                  }`}
                  onClick={() =>
                    updateExperienceLevel({
                      filBeginner: !selectedExperienceLevel.filBeginner,
                      filIntermediate: selectedExperienceLevel.filIntermediate,
                      filAdvanced: selectedExperienceLevel.filAdvanced,
                    })
                  }
                >
                  Beginner
                </a>
              </li>
              <li>
                <a
                  className={`text-black ${
                    selectedExperienceLevel.filIntermediate
                      ? "bg-green-600"
                      : "bg-white"
                  }`}
                  onClick={() =>
                    updateExperienceLevel({
                      filBeginner: selectedExperienceLevel.filBeginner,
                      filIntermediate: !selectedExperienceLevel.filIntermediate,
                      filAdvanced: selectedExperienceLevel.filAdvanced,
                    })
                  }
                >
                  Intermediate
                </a>
              </li>
              <li>
                <a
                  className={`text-black ${
                    selectedExperienceLevel.filAdvanced
                      ? "bg-green-600"
                      : "bg-white"
                  }`}
                  onClick={() =>
                    updateExperienceLevel({
                      filBeginner: selectedExperienceLevel.filBeginner,
                      filIntermediate: selectedExperienceLevel.filIntermediate,
                      filAdvanced: !selectedExperienceLevel.filAdvanced,
                    })
                  }
                >
                  Advanced
                </a>
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
