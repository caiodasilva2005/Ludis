"use client";
import React from "react";
import { UserAccountInfo } from "@/app/shared/src/types/users.types";
import { useSignUserUp, useLogUserIn } from "../../hooks/users.hooks";
import { routes } from "../../utils/routes";
import AccountInfoForm from "./AccountInfoForm";
import { useRouter } from "next/navigation";
import ProgressIndicator from "../../components/ProgressIndicator";

const LogInPage = () => {
  const {
    mutateAsync: logUserIn,
    isLoading: logUserInIsLoading,
    isSuccess: logUserInSuccess,
  } = useLogUserIn();
  const {
    mutateAsync: signUserUp,
    isLoading: signUserUpIsLoading,
    isSuccess: signUserUpSuccess,
  } = useSignUserUp();
  const router = useRouter();
  const onLogIn = async (formData: UserAccountInfo) => {
    const updatedPersonalInfo = await logUserIn(formData);
    router.push(routes.HOME);
    return updatedPersonalInfo;
  };
  const onSignUp = async (formData: UserAccountInfo) => {
    const updatedPersonalInfo = await signUserUp(formData);
    router.push(routes.CREATE_ACCOUNT);
    return updatedPersonalInfo;
  };

  if (
    logUserInIsLoading ||
    signUserUpIsLoading ||
    logUserInSuccess ||
    signUserUpSuccess
  )
    return <ProgressIndicator xpos={50} ypos={50} />;

  return (
    <AccountInfoForm submitLogInData={onLogIn} submitSignUpData={onSignUp} />
  );
};

export default LogInPage;
