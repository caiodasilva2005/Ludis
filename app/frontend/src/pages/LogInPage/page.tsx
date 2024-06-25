"use client";
import React from "react";
import {
  GoogleUser,
  UserAccountInfo,
} from "@/app/shared/src/types/users.types";
import {
  useSignUserUp,
  useLogUserIn,
  useGoogleLogIn,
} from "../../hooks/users.hooks";
import { routes } from "../../utils/routes";
import AccountInfoForm from "./AccountInfoForm/AccountInfoForm";
import { useRouter } from "next/navigation";
import ProgressIndicator from "../../components/ProgressIndicator";
import { CredentialResponse } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { hasInfoSet } from "../../utils/users";

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
  const {
    mutateAsync: logGoogleUserIn,
    isLoading: logGoogleUserInIsLoading,
    isSuccess: logGoogleUserInSuccess,
  } = useGoogleLogIn();

  const router = useRouter();
  const onLogIn = async (formData: UserAccountInfo) => {
    const user = await logUserIn(formData);
    router.push(routes.HOME);
    return user;
  };
  const onSignUp = async (formData: UserAccountInfo) => {
    const user = await signUserUp(formData);
    router.push(routes.CREATE_ACCOUNT);
    return user;
  };
  const onGoogleLogIn = async (googleAccountData: CredentialResponse) => {
    const googleUser = jwtDecode(googleAccountData.credential!) as GoogleUser;
    const user = await logGoogleUserIn(googleUser);
    if (hasInfoSet(user.personalInfo)) {
      router.push(routes.HOME);
    } else {
      router.push(routes.CREATE_ACCOUNT);
    }
    return user;
  };

  if (
    logUserInIsLoading ||
    signUserUpIsLoading ||
    logUserInSuccess ||
    signUserUpSuccess ||
    logGoogleUserInIsLoading ||
    logGoogleUserInSuccess
  )
    return <ProgressIndicator xpos={50} ypos={50} />;

  return (
    <AccountInfoForm
      submitLogInData={onLogIn}
      submitSignUpData={onSignUp}
      submitGoogleLogInData={onGoogleLogIn}
    />
  );
};

export default LogInPage;
