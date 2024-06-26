"use client";
import React from "react";
import { UserPersonalInfo } from "@/app/shared/src/types/users.types";
import {
  useCurrentUser,
  useSetUserPersonalInfo,
  useUserPersonalInfo,
} from "../../hooks/users.hooks";
import { routes } from "../../utils/routes";
import PersonalInfoForm from "./PersonalInfoForm/PersonalInfoForm";
import ProgressIndicator from "../../components/ProgressIndicator";
import { useRouter } from "next/navigation";

const CreateAccountPage = () => {
  const currentUser = useCurrentUser();
  const router = useRouter();
  const { data: personalInfo, isLoading: personalInfoIsLoading } =
    useUserPersonalInfo(currentUser?.userId!);
  const {
    mutateAsync: setUserPersonalInfo,
    isLoading: setUserPersonalInfoIsLoading,
    isSuccess: setUserPersonalInfoSuccess,
  } = useSetUserPersonalInfo(currentUser?.userId!);
  const onSubmit = async (formData: UserPersonalInfo) => {
    const updatedPersonalInfo = await setUserPersonalInfo(formData);
    router.push(routes.HOME);
    return updatedPersonalInfo;
  };

  if (
    personalInfoIsLoading ||
    setUserPersonalInfoIsLoading ||
    setUserPersonalInfoSuccess
  )
    return <ProgressIndicator xpos={50} ypos={50} />;

  return (
    <PersonalInfoForm submitData={onSubmit} defaultValues={personalInfo} />
  );
};

export default CreateAccountPage;
