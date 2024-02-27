export interface Profile {
  firstName?: File;
  lastName?: string;
  username: string;
  password?: string;
  image?: string;
  experience_level: string;
  gender: string;
  age?: number;
  userId?: number;
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

export const profileTable = "profiles";
export const filterTable = "filters";
export const imageBucket = "avatars";
