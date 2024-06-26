/**
 * This file centralizes all user services
 */
import { DateOfBirth } from "@/app/shared/src/types/datetime.types.ts";
import {
  User,
  UserPersonalInfo,
} from "../../../shared/src/types/users.types.ts";
import {
  supabase,
  profileTable,
  imageBucket,
} from "../../../shared/src/utils/supabase.ts";
import {
  userPersonalInfoTransformer,
  userTransformer,
} from "../transformers/users.transformer.ts";
import {
  getUserByEmail,
  getUserByUsername,
  uploadFile,
} from "../utils/user.utils.ts";

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
   * @returns user that signed up
   */
  static async signUserUp(email: string, password: string): Promise<User> {
    const { data: user } = await supabase
      .from(profileTable)
      .insert({ email: email, password: password })
      .select()
      .single();
    if (!user) throw new Error("Failed to sign up user.");
    return userTransformer(user);
  }

  /**
   * Log in the user
   * @param username
   * @param email
   * @param password
   * @returns that logged in
   */
  static async logUserIn(email: string, password: string): Promise<User> {
    const user = await getUserByEmail(email);
    if (!user) throw Error(`This email (${email}) is not registered`);
    if (password !== user.accountInfo.password) throw Error("Invalid password");
    return user;
  }

  static async logGoogleUserIn(
    email: string,
    firstName: string,
    lastName: string,
    image: string
  ): Promise<User> {
    const user = await getUserByEmail(email);
    if (user) return user;
    const { data: newUser } = await supabase
      .from(profileTable)
      .insert({
        email: email,
        firstName: firstName,
        lastName: lastName,
        image: image,
      })
      .select()
      .single();
    return userTransformer(newUser);
  }

  /**
   * Supplies personal info of user
   * @param userId id of user to get personal info
   * @returns personal info of user
   */
  static async getUserPersonalInfo(userId: number): Promise<UserPersonalInfo> {
    const { data: user } = await supabase
      .from(profileTable)
      .select()
      .eq("id", userId)
      .single();
    console.log("USER:", user);
    if (!user) throw new Error(`User ${userId} does not exist in the database`);
    return userPersonalInfoTransformer(user);
  }

  /**
   * Updates user persoanl info
   * @param userId
   * @param firstName
   * @param lastName
   * @param image
   * @param experienceLevel
   * @param gender
   * @param age
   * @param bio
   * @returns user with updated personal info
   */
  static async setUserPersonalInfo(
    userId: string,
    displayName: string,
    firstName: string,
    lastName: string,
    image: string,
    experienceLevel: string,
    gender: string,
    dateOfBirth: DateOfBirth,
    bio: string
  ): Promise<User> {
    const { data: updatedUser } = await supabase
      .from(profileTable)
      .update({
        username: displayName,
        firstName: firstName,
        lastName: lastName,
        image: image,
        experienceLevel: experienceLevel,
        gender: gender,
        dateOfBirth: dateOfBirth,
        bio: bio,
      })
      .eq("id", userId)
      .select()
      .single();
    if (!updatedUser) throw new Error(`failed to update User ${userId}`);
    return userTransformer(updatedUser);
  }

  /**
   * uploads an image to database
   * @param imageFile
   * @returns public url to image
   */
  static async uploadImage(imageFile: Express.Multer.File): Promise<string> {
    const filename = await uploadFile(imageFile);
    if (!filename) throw Error(`Failed to upload ${imageFile.filename}`);
    const { data } = supabase.storage.from(imageBucket).getPublicUrl(filename);
    return data.publicUrl;
  }
}
