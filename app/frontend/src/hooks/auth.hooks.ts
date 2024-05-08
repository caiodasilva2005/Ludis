"use client";
import { User } from "@/app/shared/src/types/users.types";
import { useState } from "react";

/**
 * Custom react hook to log in and log out a current user
 * @returns the current user and functions to log a user in
 */
const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const logInCurrentUser = (user?: User) => {
    setCurrentUser(user);
  };
  return { currentUser, logInCurrentUser };
};

export default useAuth;
