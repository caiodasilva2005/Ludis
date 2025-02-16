import {
  imageBucket,
  profileTable,
  supabase,
} from "../../../shared/src/utils/supabase.ts";
import { DatabaseUser, User } from "../../../shared/src/types/users.types.ts";
import { userTransformer } from "../transformers/users.transformer.ts";
import { v4 as uuidv4 } from "uuid";

/**
 * gets the current user
 * @return current user object
 */
export const getCurrentUser = async (): Promise<User> => {
  const userId = localStorage.getItem("currentUser");
  if (!userId) throw Error(`Current user id not found`);
  const { data: currentUser } = await supabase
    .from(profileTable)
    .select()
    .eq("id", userId)
    .single();
  if (!currentUser) throw new Error(`Failed to find User ${userId}`);
  return userTransformer(currentUser);
};

/**
 * creates a unique file name for uploaded file
 * @param filename
 * @returns unique filename
 */
export const makeUniqueFilename = (filename: string): string => {
  const uniqueFilename = `${uuidv4()}-${filename}`;
  return uniqueFilename;
};

/**
 * uploads file to database
 * @param imageFile
 * @returns path of uploaded file
 */
export const uploadFile = async (
  imageFile: Express.Multer.File
): Promise<string> => {
  const filename = makeUniqueFilename(imageFile.originalname);
  const { data } = await supabase.storage
    .from(imageBucket)
    .upload(filename, imageFile.buffer);
  if (!data) throw Error(`Failed to upload ${imageFile.originalname}`);
  return data.path;
};

/**
 * Returns a user based on their username
 * @param username
 * @returns user object with username
 */
export const getUserByUsername = async (username: string): Promise<User> => {
  const { data: user } = await supabase
    .from(profileTable)
    .select()
    .eq("username", username)
    .single();
  if (!user) throw Error(`Cannot find ${username}`);
  return userTransformer(user);
};

export const getUserByEmail = async (
  email: string
): Promise<User | undefined> => {
  const { data: user } = await supabase
    .from(profileTable)
    .select()
    .eq("email", email)
    .single();
  if (!user) return;
  return userTransformer(user);
};
