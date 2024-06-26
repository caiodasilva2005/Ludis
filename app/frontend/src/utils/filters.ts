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

/**
 * Checks if the current filter for the field is selected
 * @param value filter value
 * @param filter current active filter
 * @returns true if field is selected on current filter
 */
export const isFilterSelected = (value: string, filter: Filter) => {
  /* Gender Filter */
  if (value === filterValues.MALE) {
    return filter.gender.filMale;
  } else if (value === filterValues.FEMALE) {
    return filter.gender.filFemale;
  } else if (value === filterValues.OTHER) {
    return filter.gender.filOther;
  }

  /* Experience Filter*/
  if (value === filterValues.BEGINNER) {
    return filter.experienceLevel.filBeginner;
  } else if (value === filterValues.INTERMEDIATE) {
    return filter.experienceLevel.filIntermediate;
  } else if (value === filterValues.ADVANCED) {
    return filter.experienceLevel.filAdvanced;
  }
  return false;
};

/**
 * Checks if user matches the current filter
 * @param currentUser
 * @param matchingUser
 * @param filter
 * @returns true if the user matches the current filter
 */
export const matchesFilter = (
  currentUser: User,
  matchingUser: User,
  filter: Filter
) => {
  const { gender: genderFilter, experienceLevel: experienceLevelFilter } =
    filter;
  const { gender: userGender, experienceLevel: userExperienceLevel } =
    matchingUser.personalInfo;
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

  let activeFilters = true;

  if (!isExeperienceLevelActive && isGenderActive) {
    activeFilters = filGender;
  } else if (!isGenderActive && isExeperienceLevelActive) {
    activeFilters = filExperienceLevel;
  } else if (isGenderActive && isExeperienceLevelActive) {
    activeFilters = filGender && filExperienceLevel;
  }
  if (filter.onlyFriends) {
    if (!currentUser.friendUserIds) return false;
    activeFilters =
      activeFilters && currentUser.friendUserIds.includes(matchingUser.userId);
  }

  return activeFilters;
};

/**
 * Checks if ages are compatible for two matching users
 * @param currentUserDob date of birth of current user
 * @param matchingUserDob date of birth of matching user
 * @returns true if their ages are appropriate for matching
 */
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
