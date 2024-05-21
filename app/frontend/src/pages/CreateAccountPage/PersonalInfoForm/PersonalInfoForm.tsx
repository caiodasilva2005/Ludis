import { User, UserPersonalInfo } from "@/app/shared/src/types/users.types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import PersonalInfoFormView from "./PersonalInfoFormView";
import { filterValues } from "@/app/shared/src/types/filters.types";
import { hasInfoSet } from "../../../utils/users";
import { useUploadImage } from "../../../hooks/users.hooks";

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
  const { mutateAsync: uploadImage, isLoading: uploadImageIsLoading } =
    useUploadImage();
  const [bio, setBio] = useState<string>(defaultValues?.bio || "");
  const [image, setImage] = useState<string>(defaultValues?.image || "");
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
      bio: defaultValues?.bio,
      dateOfBirth: defaultValues?.dateOfBirth,
    },
  });

  return (
    <PersonalInfoFormView
      control={control}
      setLastName={setLastName}
      setBio={setBio}
      setImage={setImage}
      onImageFile={uploadImage}
      uploadImageIsLoading={uploadImageIsLoading}
      genders={genders}
      experienceLevels={experienceLevels}
      hasPersonalInfoSet={hasPersonalInfo}
      handleSubmit={handleSubmit}
      onSubmit={submitData}
    />
  );
};

export default PersonalInfoForm;
