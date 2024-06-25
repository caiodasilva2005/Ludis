/**
 * This file centralizes frontend routes
 */

const pages = () => "/frontend/src/pages";

/** Page Routes **/
const HOME = `${pages()}/HomePage`;
const LOGIN = `${pages()}/LogInPage`;
const CREATE_ACCOUNT = `${pages()}/CreateAccountPage`;
const VIEW_PROFILE = `${pages()}/ViewProfilePage`;
const CHAT = `${pages()}/ChatPage`;

export const routes = {
  HOME,
  LOGIN,
  CREATE_ACCOUNT,
  VIEW_PROFILE,
  CHAT,
};
