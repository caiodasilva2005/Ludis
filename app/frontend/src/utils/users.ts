import { Filter } from "@/app/shared/src/types/filters.types";
import { User } from "@/app/shared/src/types/users.types";
import { isCompatibleAge, matchesFilter } from "./filters";

export const getAllMatches = (
  currentUser: User,
  filter: Filter,
  users: User[]
) => {
  return users.filter((user: User) => {
    if (user.userId === currentUser.userId) return false;
    if (!isCompatibleAge(user.personalInfo.age, currentUser.personalInfo.age))
      return false;
    return matchesFilter(user, filter);
  });
};
