export interface Profile {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  first_name?: string;
  last_name?: string;
  image?: string;
  experience_level?: string;
  gender?: string;
  age?: number;
  bio?: string;
  location?: string;
}

export interface GenderFilter {
  filMale: boolean;
  filFemale: boolean;
  filOther: boolean;
}

export interface ExperienceLevelFilter {
  filBeginner: boolean;
  filIntermediate: boolean;
  filAdvanced: boolean;
}

export interface Filter {
  gender: GenderFilter;
  experience_level: ExperienceLevelFilter;
}

export interface Post {
  content?: string;
  created_at?: Date;
}

export const profileTable = "profiles";
export const filterTable = "filters";
export const imageBucket = "avatars";
export const postTable = "posts";
