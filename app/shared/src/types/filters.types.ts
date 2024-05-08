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
