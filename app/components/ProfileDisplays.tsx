import React from "react";
import ProfileDisplay from "./ProfileDisplay";
import { Filter, Profile } from "../Types/types";

interface ProfileDisplaysProps {
  profiles: Profile[];
  filter: Filter;
}

const ProfileDisplays = (props: ProfileDisplaysProps) => {
  const FilterProfiles = () => {
    const { gender, experience_level } = props.filter;

    return props.profiles.filter((profile) => {
      const genderFilter =
        (gender.filMale && profile.gender === "male") ||
        (gender.filFemale && profile.gender === "female") ||
        (gender.filOther && profile.gender === "other");

      const experienceLevelFilter =
        (experience_level.filBeginner &&
          profile.experience_level === "beginner") ||
        (experience_level.filIntermediate &&
          profile.experience_level === "intermediate") ||
        (experience_level.filAdvanced &&
          profile.experience_level === "advanced");

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
      } else {
        return true;
      }
    });
  };

  const filteredProfiles = FilterProfiles();

  return (
    <div className="overflow-y-auto h-screen w-screen">
      {filteredProfiles.map((profile) => (
        <ProfileDisplay
          key={profile.username}
          username={profile.username}
          experience_level={profile.experience_level}
          gender={profile.gender}
        />
      ))}
    </div>
  );
};

export default ProfileDisplays;
