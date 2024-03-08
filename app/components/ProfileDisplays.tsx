import React from "react";
import ProfileDisplay from "./ProfileDisplay";
import { Filter, Profile } from "../Types/types";
import { Box, Stack } from "@mui/material";

interface ProfileDisplaysProps {
  profiles: Profile[];
  filter: Filter;
}

const ProfileDisplays = (props: ProfileDisplaysProps) => {
  const FilterProfiles = () => {
    const { gender, experience_level } = props.filter;

    return props.profiles.filter((profile) => {
      const genderFilter =
        (gender.filMale && profile.gender === "Male") ||
        (gender.filFemale && profile.gender === "Female") ||
        (gender.filOther && profile.gender === "Other");

      const experienceLevelFilter =
        (experience_level.filBeginner &&
          profile.experience_level === "Beginner") ||
        (experience_level.filIntermediate &&
          profile.experience_level === "Intermediate") ||
        (experience_level.filAdvanced &&
          profile.experience_level === "Advanced");

      const isGenderActive =
        gender.filMale || gender.filFemale || gender.filOther;
      const isExeperienceLevelActive =
        experience_level.filBeginner ||
        experience_level.filIntermediate ||
        experience_level.filAdvanced;

      if (!isExeperienceLevelActive && isGenderActive) {
        return genderFilter;
      } else if (!isGenderActive && isExeperienceLevelActive) {
        return experienceLevelFilter;
      } else if (isGenderActive && isExeperienceLevelActive) {
        return genderFilter && experienceLevelFilter;
      }

      return true;
    });
  };

  const filteredProfiles = FilterProfiles();

  return (
    <Box
      sx={{
        overflowY: "auto",
        height: "100vh",
      }}
    >
      <Stack spacing={2}>
        {filteredProfiles.map((profile) => (
          <ProfileDisplay key={profile.username} profile={profile} />
        ))}
      </Stack>
    </Box>
  );
};

export default ProfileDisplays;
