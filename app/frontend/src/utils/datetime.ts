import { DateOfBirth } from "@/app/shared/src/types/datetime.types";

/**
 * returns the age based on a date of birth
 * @param dateOfBirth
 * @returns age that corresponds to the current day
 */
export const getAge = (dateOfBirth?: DateOfBirth) => {
  if (!dateOfBirth) return 0;
  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.year;
  const monthDiff = today.getMonth() - dateOfBirth.month;
  const dayDiff = today.getDay() - dateOfBirth.day;
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age;
};

/**
 * Gets months for Date Of Birth dropdown
 * @returns list of numbers from 1-12 representing all months
 */
export const getMonths = () => {
  let monthList: number[] = [];
  for (let i = 1; i <= 12; i++) {
    monthList.push(i);
  }
  return monthList;
};

/**
 * Gets days for Date Of Birth dropdown
 * @returns list of numbers from 1-31 representing all days
 */
export const getDays = () => {
  let dayList: number[] = [];
  for (let i = 1; i <= 31; i++) {
    dayList.push(i);
  }
  return dayList;
};

/**
 * Gets years for Date Of Birth dropdown
 * @returns list of years from the current year to 50 years in the past
 */
export const getYears = () => {
  const today = new Date();
  const currentYear = today.getFullYear();
  let yearList: number[] = [];
  for (let i = currentYear; i >= currentYear - 50; i--) {
    yearList.push(i);
  }
  return yearList;
};
