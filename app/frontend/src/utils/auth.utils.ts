/**
 * Logs the user out
 */
export const logUserOut = () => {
  localStorage.setItem("currentUser", "");
};
