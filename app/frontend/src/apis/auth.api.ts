import axios from "axios";
import { apiUrls } from "../utils/urls";

export const getGoogleClient = (access_token: string) => {
  return axios.get(apiUrls.googleUserInfo(access_token), {
    headers: {
      Authorization: `Bearer ${access_token}`,
      Accept: "application/json",
    },
    transformResponse: (data) => {
      return data;
    },
  });
};
