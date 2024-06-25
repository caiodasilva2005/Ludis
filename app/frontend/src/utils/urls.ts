/**
 * This file centralizes URLs used to query the API.
 */

const API_URL: string = "http://localhost:3001"; // TO-DO: update env variable

/*** Auth Endpoints ***/
const googleUserInfo = (access_token: string) =>
  `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${access_token}`;

/*** User Endpoints ***/
const users = () => `${API_URL}/users`;
const usersById = (id: string) => `${users()}/${id}`;
const usersSignUp = () => `${users()}/signup`;
const usersLogIn = () => `${users()}/login`;
const usersPersonalInfo = (id: string) => `${usersById(id)}/personal-info`;
const uploadImage = () => `${users()}/upload-image`;

export const apiUrls = {
  googleUserInfo,

  users,
  usersById,
  usersSignUp,
  usersLogIn,
  usersPersonalInfo,
  uploadImage,
};
