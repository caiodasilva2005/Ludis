import {
  User,
  UserPersonalInfo,
  UserWithInfo,
} from "../../../shared/src/types/users.types.ts";
import {
  supabase,
  profileTable,
  imageBucket,
} from "../../../shared/src/utils/supabase.ts";
import {
  userPersonalInfoTransformer,
  userTransformer,
  userWithInfoTransformer,
} from "../transformers/users.transformer.ts";
import { uploadFile } from "../utils/user.utils.ts";

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
    firstName: string,
    lastName: string,
    image: string,
    experienceLevel: string,
    gender: string,
    age: number,
    bio: string
  ): Promise<UserWithInfo> {
    const { data: updatedUser } = await supabase
      .from(profileTable)
      .update({
        firstName: firstName,
        lastName: lastName,
        image: image,
        experienceLevel: experienceLevel,
        gender: gender,
        age: age,
        bio: bio,
      })
      .eq("id", userId)
      .select()
      .single();
    if (!updatedUser) throw new Error(`failed to update User ${userId}`);
    return userWithInfoTransformer(updatedUser);
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
