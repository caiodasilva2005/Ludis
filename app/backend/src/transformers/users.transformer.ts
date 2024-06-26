import {
  DatabaseUser,
  User,
  UserPersonalInfo,
} from "../../../shared/src/types/users.types";

/**
 * Transforms a user to ensure deep field transformation of date objects.
 *
 * @param user Incoming user object supplied by the HTTP response.
 * @returns Properly transformed user object.
 */
export const userTransformer = (user: DatabaseUser): User => {
  return {
    userId: user.id,
    accountInfo: {
      email: user.email,
      password: user.password,
    },
    personalInfo: {
      displayName: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      experienceLevel: user.experienceLevel,
      gender: user.gender,
      bio: user.bio,
      dateOfBirth: user.dateOfBirth,
    },
  };
};

/**
 * Transforms a user personal info object to ensure deep field transformation of date objects.
 *
 * @param user Incoming user object supplied by the HTTP response.
 * @returns Properly transformed user personal info object.
 */
export const userPersonalInfoTransformer = (
  user: DatabaseUser
): UserPersonalInfo => {
  return {
    displayName: user.username,
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
    experienceLevel: user.experienceLevel,
    gender: user.gender,
    bio: user.bio,
    dateOfBirth: user.dateOfBirth,
  };
};
