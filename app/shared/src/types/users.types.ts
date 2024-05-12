export interface UserAccountInfo {
  username: string;
  email: string;
  password: string;
}

export interface UserPersonalInfo {
  firstName: string;
  lastName: string;
  image?: string;
  experienceLevel: string;
  gender: string;
  age: number;
  bio?: string;
}

export interface DatabaseUser {
  id: number;
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  image?: string;
  experienceLevel: string;
  gender: string;
  age: number;
  bio?: string;
}

export interface User {
  userId: number;
  accountInfo: UserAccountInfo;
}

export interface UserWithInfo extends User {
  personalInfo: UserPersonalInfo;
}
