import { Filter } from "@/app/shared/src/types/filters.types";
import { User, UserPersonalInfo } from "@/app/shared/src/types/users.types";
import { isCompatibleAge, matchesFilter } from "./filters";

/**
 * Gets all matches for the current user based on filters
 * @param filter
 * @param currentUser
 * @param users all users
 * @returns all users the match age and filters
 */
export const getAllMatches = (
  filter: Filter,
  currentUser?: User,
  users?: User[]
) => {
  if (!users) return;
  if (!currentUser) return users;
  return users.filter((user: User) => {
    if (user.userId === currentUser.userId) return false;
    if (
      !isCompatibleAge(
        user.personalInfo.dateOfBirth,
        currentUser.personalInfo.dateOfBirth
      )
    )
      return false;
    return matchesFilter(user, filter);
  });
};

/**
 * Checks if user has personal info set
 * @param personalInfo personal info of user
 * @returns true if persoanl info is set
 */
export const hasInfoSet = (personalInfo?: UserPersonalInfo) => {
  if (!personalInfo) return false;
  return personalInfo.firstName &&
    personalInfo.lastName &&
    personalInfo.gender &&
    personalInfo.experienceLevel
    ? true
    : false;
};

/**
 * Stores matching user id in local storage
 * @param user matching user
 */
export const setMatchingUserId = (user: User) => {
  localStorage.setItem("matchingUser", user.userId.toString());
};

/**
 * Retrieves matching user id from local storage
 * @returns matching user id
 */
export const getMatchingUserId = () => {
  const matchingUserId = localStorage.getItem("matchingUser");
  return matchingUserId;
};
