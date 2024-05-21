import { User, UserPersonalInfo } from "@/app/shared/src/types/users.types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PersonalInfoFormView from "./PersonalInfoFormView";
import { filterValues } from "@/app/shared/src/types/filters.types";
import { hasInfoSet } from "../../../utils/users";

interface ReimbursementRequestFormProps {
  submitData: (formData: UserPersonalInfo) => Promise<User>;
  defaultValues?: UserPersonalInfo;
}

const genders = [filterValues.MALE, filterValues.FEMALE, filterValues.OTHER];
const experienceLevels = [
  filterValues.BEGINNER,
  filterValues.INTERMEDIATE,
  filterValues.ADVANCED,
];

const PersonalInfoForm: React.FC<ReimbursementRequestFormProps> = ({
  submitData,
  defaultValues,
}) => {
  const [firstName, setFirstName] = useState<string>(
    defaultValues?.firstName || ""
  );
  const [lastName, setLastName] = useState<string>(
    defaultValues?.lastName || ""
  );
  const [bio, setBio] = useState<string>(defaultValues?.bio || "");
  const hasPersonalInfo = hasInfoSet(defaultValues);
  const {
    handleSubmit,
    control,
    formState: { errors },
    watch,
    setValue,
  } = useForm<UserPersonalInfo>({
    defaultValues: {
      firstName: defaultValues?.firstName ?? "",
      lastName: defaultValues?.lastName ?? "",
      image: defaultValues?.image,
      gender: defaultValues?.gender ?? "",
      experienceLevel: defaultValues?.experienceLevel ?? "",
      age: defaultValues?.age,
      bio: defaultValues?.bio,
    },
  });

  return (
    <PersonalInfoFormView
      control={control}
      setFirstName={setFirstName}
      setLastName={setLastName}
      setBio={setBio}
      genders={genders}
      experienceLevels={experienceLevels}
      hasPersonalInfoSet={hasPersonalInfo}
      handleSubmit={handleSubmit}
      onSubmit={submitData}
    />
  );
};

export default PersonalInfoForm;
