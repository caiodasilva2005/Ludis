import { DateOfBirth } from "@/app/shared/src/types/datetime.types";
import { Filter, filterValues } from "@/app/shared/src/types/filters.types";
import { User } from "@/app/shared/src/types/users.types";
import { getAge } from "./datetime";

/**
 * Updates the current filter based on user input
 * @param value filter type
 * @param prevFilter
 * @returns updated filter
 */
export const filterChange = (value: string, prevFilter: Filter): Filter => {
  /* Gender Filter */
  if (value === filterValues.MALE) {
    return {
      ...prevFilter,
      gender: { ...prevFilter.gender, filMale: !prevFilter.gender.filMale },
    };
  } else if (value === filterValues.FEMALE) {
    return {
      ...prevFilter,
      gender: { ...prevFilter.gender, filFemale: !prevFilter.gender.filFemale },
    };
  } else if (value === filterValues.OTHER) {
    return {
      ...prevFilter,
      gender: { ...prevFilter.gender, filOther: !prevFilter.gender.filOther },
    };
  }

  /* Experience Filter*/
  if (value === filterValues.BEGINNER) {
    return {
      ...prevFilter,
      experienceLevel: {
        ...prevFilter.experienceLevel,
        filBeginner: !prevFilter.experienceLevel.filBeginner,
      },
    };
  } else if (value === filterValues.INTERMEDIATE) {
    return {
      ...prevFilter,
      experienceLevel: {
        ...prevFilter.experienceLevel,
        filIntermediate: !prevFilter.experienceLevel.filIntermediate,
      },
    };
  } else if (value === filterValues.ADVANCED) {
    return {
      ...prevFilter,
      experienceLevel: {
        ...prevFilter.experienceLevel,
        filAdvanced: !prevFilter.experienceLevel.filAdvanced,
      },
    };
  }
  return prevFilter;
};

export const matchesFilter = (user: User, filter: Filter) => {
  const { gender: genderFilter, experienceLevel: experienceLevelFilter } =
    filter;
  const { gender: userGender, experienceLevel: userExperienceLevel } =
    user.personalInfo;
  const filGender =
    (genderFilter.filMale && userGender === filterValues.MALE) ||
    (genderFilter.filFemale && userGender === filterValues.FEMALE) ||
    (genderFilter.filOther && userGender === filterValues.OTHER);

  const filExperienceLevel =
    (experienceLevelFilter.filBeginner &&
      userExperienceLevel === filterValues.BEGINNER) ||
    (experienceLevelFilter.filIntermediate &&
      userExperienceLevel === filterValues.INTERMEDIATE) ||
    (experienceLevelFilter.filAdvanced &&
      userExperienceLevel === filterValues.ADVANCED);

  const isGenderActive =
    genderFilter.filMale || genderFilter.filFemale || genderFilter.filOther;
  const isExeperienceLevelActive =
    experienceLevelFilter.filBeginner ||
    experienceLevelFilter.filIntermediate ||
    experienceLevelFilter.filAdvanced;

  if (!isExeperienceLevelActive && isGenderActive) {
    return filGender;
  } else if (!isGenderActive && isExeperienceLevelActive) {
    return filExperienceLevel;
  } else if (isGenderActive && isExeperienceLevelActive) {
    return filGender && filExperienceLevel;
  }

  return true;
};

export const isCompatibleAge = (
  currentUserDob: DateOfBirth,
  matchingUserDob: DateOfBirth
) => {
  const currentUserAge = getAge(currentUserDob);
  const matchingUserAge = getAge(matchingUserDob);
  if (currentUserAge >= 18) {
    return matchingUserAge >= 18;
  } else {
    if (matchingUserAge >= 18) {
      return false;
    }
    return (
      matchingUserAge >= currentUserAge - 3 &&
      matchingUserAge <= currentUserAge + 3
    );
  }
};
