import { googleLogout } from "@react-oauth/google";

/**
 * Logs the user out
 */
export const logUserOut = () => {
  localStorage.setItem("currentUser", "");
  googleLogout();
};
