import { User } from "../../../shared/src/types/users.types.ts";
import { supabase, profileTable } from "../../../shared/src/utils/supabase.ts";
import { userTransformer } from "../transformers/users.transformer.ts";
import { setCurrentUser } from "../utils/user.utils.ts";

export default class UserService {
  /**
   * Gets all of the users from the database
   * @returns a list of all the users
   */
  static async getAllUsers(): Promise<User[]> {
    const { data: users } = await supabase.from(profileTable).select();
    if (users == undefined) throw new Error("Failed to receive users.");
    return users.map(userTransformer);
  }

  /**
   * Gets a single user based on their id
   * @param userId id of user to find
   * @returns user with corresponding id
   */
  static async getSingleUser(userId: number): Promise<User> {
    const { data: user } = await supabase
      .from(profileTable)
      .select()
      .eq("id", userId)
      .single();
    if (!user) throw new Error(`Failed to find User ${userId}`);
    return userTransformer(user);
  }

  /**
   * Signs up the user and places them in the database
   * @param username
   * @param email
   * @param password
   * @returns
   */
  static async signUserUp(
    username: string,
    email: string,
    password: string
  ): Promise<User> {
    const { data: user } = await supabase
      .from(profileTable)
      .insert({ username: username, email: email, password: password })
      .select()
      .single();
    if (!user) throw new Error("Failed to sign up user.");
    return userTransformer(user);
  }
}
