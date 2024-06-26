/**
 * This file defines all user api calls
 */
import {
  GoogleUser,
  User,
  UserAccountInfo,
  UserPersonalInfo,
} from "@/app/shared/src/types/users.types";
import { apiUrls } from "../utils/urls";
import {
  userPersonalInfoTransformer,
  userTransformer,
} from "./transformers/users.transformers";
import axios from "axios";

/**
 * Fetches all users
 * @returns all users
 */
export const getAllUsers = () => {
  return axios.get<User[]>(apiUrls.users(), {
    transformResponse: (data) => {
      return JSON.parse(data).map(userTransformer);
    },
  });
};

/**
 * Fetch a single user
 * @param id user id of the requested user
 * @returns requested user
 */
export const getSingleUser = (id: number) => {
  return axios.get<User>(apiUrls.usersById(id.toString()), {
    transformResponse: (data) => {
      return userTransformer(JSON.parse(data));
    },
  });
};

/**
 * Signs the user up
 * @param userAccountInfo account info of user signing up
 * @returns the signed up user
 */
export const signUserUp = (userAccountInfo: UserAccountInfo) => {
  return axios.post<User>(
    apiUrls.usersSignUp(),
    {
      email: userAccountInfo.email,
      password: userAccountInfo.password,
    },
    {
      transformResponse: (data) => {
        return userTransformer(JSON.parse(data));
      },
    }
  );
};

/**
 * Logs the user in
 * @param userAccountInfo account info of user logging in
 * @returns the logged in user
 */
export const logUserIn = (userAccountInfo: UserAccountInfo) => {
  return axios.post<User>(
    apiUrls.usersLogIn(),
    {
      email: userAccountInfo.email,
      password: userAccountInfo.password,
    },
    {
      transformResponse: (data) => {
        return userTransformer(JSON.parse(data));
      },
    }
  );
};

export const logGoogleUserIn = (googleUser: GoogleUser) => {
  return axios.post<User>(
    apiUrls.usersGoogleLogIn(),
    {
      email: googleUser.email,
      firstName: googleUser.given_name,
      lastName: googleUser.family_name,
      image: googleUser.picture,
    },
    {
      transformResponse: (data) => {
        return userTransformer(JSON.parse(data));
      },
    }
  );
};

/**
 * Fetches the personal info of a user
 * @param userId user id of the user whose info is requested
 * @returns the personal info of the user
 */
export const getUserPersonalInfo = (userId: number) => {
  return axios.get<UserPersonalInfo>(
    apiUrls.usersPersonalInfo(userId.toString()),
    {
      transformResponse: (data) => {
        return userPersonalInfoTransformer(JSON.parse(data));
      },
    }
  );
};

/**
 * Sets the personal info of a user
 * @param userId the user id of the user getting info set
 * @param personalInfo personal info that will be set for user
 * @returns user with personal info set
 */
export const setUserPersonalInfo = (
  userId: number,
  personalInfo: UserPersonalInfo
) => {
  return axios.post<User>(
    apiUrls.usersPersonalInfo(userId.toString()),
    {
      displayName: personalInfo.displayName,
      firstName: personalInfo.firstName,
      lastName: personalInfo.lastName,
      image: personalInfo.image,
      experienceLevel: personalInfo.experienceLevel,
      gender: personalInfo.gender,
      dateOfBirth: JSON.stringify(personalInfo.dateOfBirth),
      bio: personalInfo.bio,
    },
    {
      transformResponse: (data) => {
        return userTransformer(JSON.parse(data));
      },
    }
  );
};

/**
 * Uploads an image to the database storage bucket
 * @param imageFile
 * @returns public url for image
 */
export const uploadImage = (imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  return axios.post<string>(apiUrls.uploadImage(), formData, {
    transformResponse: (data) => {
      return JSON.parse(data);
    },
  });
};
