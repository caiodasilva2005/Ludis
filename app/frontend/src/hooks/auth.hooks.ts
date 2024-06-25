"use client";
import { User } from "@/app/shared/src/types/users.types";
import { useState } from "react";
import { useQuery } from "react-query";
import { getGoogleClient } from "../apis/auth.api";

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

export const useGoogleClient = (access_token: string) => {
  return useQuery(["auth"], async () => {
    const { data } = await getGoogleClient(access_token);
    console.log("GOOGLE:", data);
    return data;
  });
};
