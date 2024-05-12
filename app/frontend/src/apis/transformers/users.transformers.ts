import {
  User,
  UserPersonalInfo,
  UserWithInfo,
} from "@/app/shared/src/types/users.types";

/**
 * Transforms a user to ensure deep field transformation of date objects.
 *
 * @param user Incoming user object supplied by the HTTP response.
 * @returns Properly transformed user object.
 */
export const userTransformer = (user: User) => {
  return {
    ...user,
  };
};

/**
 * Transforms a user with info object to ensure deep field transformation of date objects.
 *
 * @param user Incoming user object supplied by the HTTP response.
 * @returns Properly transformed user object.
 */
export const userWithInfoTransformer = (user: UserWithInfo) => {
  return {
    ...user,
  };
};

/**
 * Transforms a user personal info object to ensure deep field transformation of date objects.
 *
 * @param user Incoming user object supplied by the HTTP response.
 * @returns Properly transformed user personal info object.
 */
export const userPersonalInfoTransformer = (personalInfo: UserPersonalInfo) => {
  return {
    ...personalInfo,
  };
};
