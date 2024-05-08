import { User } from "@/app/shared/src/types/users.types";

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
