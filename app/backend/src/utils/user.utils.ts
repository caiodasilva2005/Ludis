import { User } from "../../../shared/src/types/users.types.ts";
import { profileTable, supabase } from "../../../shared/src/utils/supabase.ts";
import { userTransformer } from "../transformers/users.transformer.ts";


/**
 * sets the current user id in session storage to variable 'CurrentUser'
 * @param user
 */
export const setCurrentUser = (user: User): void => {
  const userId = user.userId;
  localStorage.setItem("CurrentUser", userId.toString());
};
