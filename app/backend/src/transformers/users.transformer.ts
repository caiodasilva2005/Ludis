import {
  DatabaseUser,
  User,
  UserPersonalInfo,
  UserWithInfo,
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
      username: user.username,
      email: user.email,
      password: user.password,
    },
  };
};

/**
 * Transforms a user with info object to ensure deep field transformation of date objects.
 *
 * @param user Incoming user object supplied by the HTTP response.
 * @returns Properly transformed user object.
 */
export const userWithInfoTransformer = (user: DatabaseUser): UserWithInfo => {
  return {
    userId: user.id,
    accountInfo: {
      username: user.username,
      email: user.email,
      password: user.password,
    },
    personalInfo: {
      firstName: user.firstName,
      lastName: user.lastName,
      image: user.image,
      experienceLevel: user.experienceLevel,
      gender: user.gender,
      age: user.age,
      bio: user.bio,
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
    firstName: user.firstName,
    lastName: user.lastName,
    image: user.image,
    experienceLevel: user.experienceLevel,
    gender: user.gender,
    age: user.age,
    bio: user.bio,
  };
};
