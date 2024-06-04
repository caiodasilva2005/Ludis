import { DateOfBirth } from "./datetime.types";

export interface UserAccountInfo {
  username: string;
  email: string;
  password: string;
}

/*TO-DO: make gender/explvl types*/
export interface UserPersonalInfo {
  firstName: string;
  lastName: string;
  image?: string;
  experienceLevel: string;
  gender: string;
  bio?: string;
  dateOfBirth: DateOfBirth;
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
  bio?: string;
  dateOfBirth: DateOfBirth;
  friendUserIds: number[];
}

export interface User {
  userId: number;
  accountInfo: UserAccountInfo;
  personalInfo: UserPersonalInfo;
  friendUserIds: number[];
}
