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
  experienceLevel: ExperienceLevelFilter;
}

export enum filterValues {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",

  BEGINNER = "Beginner",
  INTERMEDIATE = "Intermediate",
  ADVANCED = "Advanced",
}
