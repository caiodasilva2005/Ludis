import { User, UserAccountInfo } from "@/app/shared/src/types/users.types";
import { apiUrls } from "../utils/urls";
import { userTransformer } from "./transformers/users.transformers";
import axios from "axios";

export const getAllUsers = () => {
  return axios.get<User[]>(apiUrls.users(), {
    transformResponse: (data) => JSON.parse(data).map(userTransformer),
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
        console.log(data);
        return userTransformer(JSON.parse(data));
      },
    }
  );
};
