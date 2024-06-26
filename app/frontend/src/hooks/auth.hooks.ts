"use client";
import { GoogleUser, User } from "@/app/shared/src/types/users.types";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import { CredentialResponse, TokenResponse } from "@react-oauth/google";

/**
 * Custom react hook to log in and log out a current user
 * @returns the current user and functions to log a user in
 */
export const useAuth = () => {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);
  const logInCurrentUser = (user?: User) => {
    if (user) {
      setCurrentUser(user);
      localStorage.setItem("currentUser", user.userId.toString());
    }
  };
  return { currentUser, logInCurrentUser };
};
