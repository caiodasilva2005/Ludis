import {
  GoogleUser,
  User,
  UserAccountInfo,
  UserPersonalInfo,
} from "@/app/shared/src/types/users.types";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  addFriend,
  getAllFriends,
  getAllUsers,
  getSingleUser,
  getUserPersonalInfo,
  logGoogleUserIn,
  logUserIn,
  removeFriend,
  setUserPersonalInfo,
  signUserUp,
  uploadImage,
} from "../apis/users.api";
import { useContext } from "react";
import { UserContext } from "../providers/AppContextUser";

/**
 * Custom React Hook to supply the current user
 */
export const useCurrentUser = () => {
  const userId = localStorage.getItem("currentUser");
  const { data: currentUser } = useSingleUser(parseInt(userId!));
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
    ["users", "signup"],
    async (userAccountInfo: UserAccountInfo) => {
      const { data } = await signUserUp(userAccountInfo);
      updateCurrentUser(data);
      return data;
    }
  );
};

/**
 * Custom React Hook to log a user in.
 */
export const useLogUserIn = () => {
  const updateCurrentUser = useSetCurrentUser();
  return useMutation<User, Error, UserAccountInfo>(
    ["users", "login"],
    async (userAccountInfo: UserAccountInfo) => {
      const { data } = await logUserIn(userAccountInfo);
      updateCurrentUser(data);
      return data;
    }
  );
};

export const useGoogleLogIn = () => {
  const updateCurrentUser = useSetCurrentUser();
  return useMutation<User, Error, GoogleUser>(
    ["users", "login"],
    async (googleUserInfo: GoogleUser) => {
      const { data } = await logGoogleUserIn(googleUserInfo);
      updateCurrentUser(data);
      return data;
    }
  );
};

/**
 * Custom React Hook to supply a single user's personal information
 */
export const useUserPersonalInfo = (id: number) => {
  return useQuery<UserPersonalInfo, Error>(
    ["users", id, "personal-info"],
    async () => {
      const { data } = await getUserPersonalInfo(id);
      return data;
    }
  );
};

/**
 * Custom React Hook to supply the current user's personal information
 */
export const useCurrentUserPersonalInfo = () => {
  const currentUser = useCurrentUser();
  if (!currentUser) throw Error(`Current user not found`);
  return useQuery<UserPersonalInfo, Error>(
    ["users", currentUser.userId, "personal-info"],
    async () => {
      const { data } = await getUserPersonalInfo(currentUser.userId);
      return data;
    }
  );
};

/**
 * Custom React Hook to set a single user's personal information
 */
export const useSetUserPersonalInfo = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation<User, Error, UserPersonalInfo>(
    ["users", id, "personal-info"],
    async (personalInfo: UserPersonalInfo) => {
      const { data } = await setUserPersonalInfo(id, personalInfo);
      queryClient.invalidateQueries(["users", id, "personal-info"]);
      return data;
    }
  );
};

/**
 * Custom React Hook to set the current user's personal information
 */
export const useSetCurrentUserPersonalInfo = (id: number) => {
  return useMutation<User, Error, UserPersonalInfo>(
    ["users", id, "personal-info"],
    async (personalInfo: UserPersonalInfo) => {
      const { data } = await setUserPersonalInfo(id, personalInfo);
      return data;
    }
  );
};

/**
 * Custom React Hook to get all of a user's friends
 */
export const useFriends = (id: number) => {
  return useQuery<number[], Error>(["users", id, "friends"], async () => {
    const { data } = await getAllFriends(id);
    return data;
  });
};

/**
 * Custom React Hook to add a friend to a user's list of friends
 */
export const useAddFriend = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation<number[], Error, number>(
    ["users", id, "friends", "add"],
    async (friendId: number) => {
      const { data } = await addFriend(id, friendId);
      queryClient.invalidateQueries(["users", id, "friends"]);
      return data;
    }
  );
};

/**
 * Custom React Hook to remove a friend to a user's list of friends
 */
export const useRemoveFriend = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation<number[], Error, number>(
    ["users", id, "friends", "remove"],
    async (friendId: number) => {
      const { data } = await removeFriend(id, friendId);
      queryClient.invalidateQueries(["users", id, "friends"]);
      return data;
    }
  );
};

/**
 * Custom React Hook to upload an image
 */
export const useUploadImage = () => {
  return useMutation<string, Error, File>(
    ["users", "upload-image"],
    async (imageFile: File) => {
      const { data } = await uploadImage(imageFile);
      return data;
    }
  );
};
