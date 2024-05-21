import { Filter } from "@/app/shared/src/types/filters.types";
import { User, UserPersonalInfo } from "@/app/shared/src/types/users.types";
import { isCompatibleAge, matchesFilter } from "./filters";

export const getAllMatches = (
  filter: Filter,
  currentUser?: User,
  users?: User[]
) => {
  if (!users) return;
  if (!currentUser) return users;
  return users.filter((user: User) => {
    if (user.userId === currentUser.userId) return false;
    if (!isCompatibleAge(user.personalInfo.age, currentUser.personalInfo.age))
      return false;
    return matchesFilter(user, filter);
  });
};

export const hasInfoSet = (personalInfo?: UserPersonalInfo) => {
  if (!personalInfo) return false;
  return personalInfo.firstName &&
    personalInfo.lastName &&
    personalInfo.gender &&
    personalInfo.experienceLevel
    ? true
    : false;
};

export const setMatchingUser = (user: User) => {
  sessionStorage.setItem("matchingUser", user.userId.toString());
};

export const getMatchingUserId = () => {
  const matchingUserId = sessionStorage.getItem("matchingUser");
  return matchingUserId;
};
