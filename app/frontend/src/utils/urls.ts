/**
 * This file centralizes URLs used to query the API.
 */

const API_URL: string = "http://localhost:3001"; // TO-DO: update env variable

/*** User Endpoints ***/
const users = () => `${API_URL}/users`;
const usersById = (id: string) => `${users()}/${id}`;
const usersSignUp = () => `${users()}/signup`;
const usersPersonalInfo = (id: string) => `${usersById(id)}/personal-info`;
const uploadImage = () => `${users()}/upload-image`;

export const apiUrls = {
  users,
  usersById,
  usersSignUp,
  usersPersonalInfo,
  uploadImage,
};
