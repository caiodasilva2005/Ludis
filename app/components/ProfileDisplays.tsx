import React from "react";
import ProfileDisplay from "./ProfileDisplay";
import { Filter, Profile } from "../Types/types";
import { Box, Stack, Container, Grid } from "@mui/material";

interface ProfileDisplaysProps {
  currentUser: Profile | undefined;
  profiles: Profile[];
  filter: Filter;
}

const ProfileDisplays = (props: ProfileDisplaysProps) => {
  const FilterProfiles = () => {
    if (!props.currentUser) {
      return;
    }

    const { gender, experience_level } = props.filter;

    return props.profiles.filter((profile) => {
      if (profile.id === props.currentUser!.id) {
        return false;
      }

      if (props.currentUser!.age! >= 18 && profile.age! < 18) {
        return false;
      }

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
    <Container sx={{ overflowY: "auto" }}>
      <Grid container spacing={3}>
        {filteredProfiles &&
          filteredProfiles.map((profile) => (
            <Grid item xs={12} md={6} lg={4}>
              <ProfileDisplay key={profile.username} profile={profile} />
            </Grid>
          ))}
      </Grid>
    </Container>
  );
};

export default ProfileDisplays;
