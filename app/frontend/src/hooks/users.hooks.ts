import { User, UserAccountInfo } from "@/app/shared/src/types/users.types";
import { useQuery, useMutation } from "react-query";
import { getAllUsers, getSingleUser, signUserUp } from "../apis/users.api";
import { useContext } from "react";
import { UserContext } from "../providers/AppContextUser";

/**
 * Custom React Hook to supply the current user
 */
export const useCurrentUser = () => {
  const { currentUser } = useContext(UserContext);
  return currentUser;
};

/**
 * Custom React Hook to set the current user
 */
export const useSetCurrentUser = () => {
  const { setCurrentUser } = useContext(UserContext);
  const updateCurrentUser = (currentUser?: User) => {
    if (!currentUser) throw Error(`There is no current user`);
    setCurrentUser(currentUser);
  };
  return updateCurrentUser;
};

/**
 * Custom React Hook to supply all users.
 */
export const useAllUsers = () => {
  return useQuery<User[], Error>(["users"], async () => {
    const { data } = await getAllUsers();
    return data;
  });
};

/**
 * Custom React Hook to supply a single user.
 *
 * @param id User ID of the requested user.
 */
export const useSingleUser = (id: number) => {
  return useQuery<User, Error>(["users", id], async () => {
    const { data } = await getSingleUser(id);
    return data;
  });
};

/**
 * Custom React Hook to sign a user up.
 */
export const useSignUserUp = () => {
  const updateCurrentUser = useSetCurrentUser();
  return useMutation<User, Error, UserAccountInfo>(
    ["users", "login"],
    async (userAccountInfo: UserAccountInfo) => {
      const { data } = await signUserUp(userAccountInfo);
      updateCurrentUser(data);
      return data;
    }
  );
};
