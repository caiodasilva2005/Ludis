import {
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

export const getAllUsers = () => {
  return axios.get<User[]>(apiUrls.users(), {
    transformResponse: (data) => {
      return JSON.parse(data).map(userTransformer);
    },
  });
};

export const getSingleUser = (id: number) => {
  return axios.get<User>(apiUrls.usersById(id.toString()), {
    transformResponse: (data) => {
      return userTransformer(JSON.parse(data));
    },
  });
};

export const signUserUp = (userAccountInfo: UserAccountInfo) => {
  return axios.post<User>(
    apiUrls.usersSignUp(),
    {
      username: userAccountInfo.username,
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

export const logUserIn = (userAccountInfo: UserAccountInfo) => {
  return axios.post<User>(
    apiUrls.usersLogIn(),
    {
      username: userAccountInfo.username,
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

export const setUserPersonalInfo = (
  userId: number,
  personalInfo: UserPersonalInfo
) => {
  return axios.post<User>(
    apiUrls.usersPersonalInfo(userId.toString()),
    {
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

export const uploadImage = (imageFile: File) => {
  const formData = new FormData();
  formData.append("image", imageFile);
  return axios.post<string>(apiUrls.uploadImage(), formData, {
    transformResponse: (data) => {
      console.log(data);
      return JSON.parse(data);
    },
  });
};
