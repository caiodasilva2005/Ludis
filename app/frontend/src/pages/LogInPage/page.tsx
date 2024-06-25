"use client";
import React from "react";
import { UserAccountInfo } from "@/app/shared/src/types/users.types";
import { useSignUserUp, useLogUserIn } from "../../hooks/users.hooks";
import { routes } from "../../utils/routes";
import AccountInfoForm from "./AccountInfoForm/AccountInfoForm";
import { useRouter } from "next/navigation";
import ProgressIndicator from "../../components/ProgressIndicator";
import { useGoogleClient } from "../../hooks/auth.hooks";

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

  const { data: res, isSuccess } = useGoogleClient(
    "eyJhbGciOiJSUzI1NiIsImtpZCI6IjNkNTgwZjBhZjdhY2U2OThhMGNlZTdmMjMwYmNhNTk0ZGM2ZGJiNTUiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJhenAiOiIxOTk0MTc1MDM3NzUtcnJvNmxwNW83aWkydWtsbXU0c2cyZHIwcTV0bjFhMzMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJhdWQiOiIxOTk0MTc1MDM3NzUtcnJvNmxwNW83aWkydWtsbXU0c2cyZHIwcTV0bjFhMzMuYXBwcy5nb29nbGV1c2VyY29udGVudC5jb20iLCJzdWIiOiIxMTMxNjg4MTg4MDQ2OTUzODA5OTQiLCJlbWFpbCI6ImRhc2lsdmEuY2FpQG5vcnRoZWFzdGVybi5lZHUiLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwibmJmIjoxNzE4OTk0NjgwLCJuYW1lIjoiQ2FpbyBEYVNpbHZhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FDZzhvY0pyZ2FHbVNoaHBpR1UzV1BUR2N6a0lodFR3UmVpTVFLeTVxSlMyXzBBS1NCT1pRblU9czk2LWMiLCJnaXZlbl9uYW1lIjoiQ2FpbyIsImZhbWlseV9uYW1lIjoiRGFTaWx2YSIsImlhdCI6MTcxODk5NDk4MCwiZXhwIjoxNzE4OTk4NTgwLCJqdGkiOiJmYWU0ZjQyYWU2YjljY2Y1YzUyMTA4ZjE0OTU3MzE2NzQyMzc3MGI3In0.VZNDicaO0A51zNQSs06fYR5ZHUKrJyVJ6XAHagh043d3KXHLdDYYnGKuv9v3tuL3EA0det9tBG4oMH9v-jwoluKTHpaPp46eyA8xxlnCc_lBwcXxoklHXyVb4os_D3oLHzM0EH5-cNhjBNvQvVRBuX31Psi3QdO0iwoy-Gu6rXFxcRddL1FmseP5pxsm7vEBAFKnr7Q_9BZTS1zL2AEyJDbHsM0UVjrwpLQq7emFRwWaQLO-bmmelB0-XwqoKOkeS4vYcrrffgVWLlatcuWUu4dhNIPHcAP1IWrfdUB-z_nrCIedQYzW0cdW-Vcd7_Le4veYmIo9VxSLGFQMhsNxag"
  );

  if (
    logUserInIsLoading ||
    signUserUpIsLoading ||
    logUserInSuccess ||
    signUserUpSuccess
  )
    return <ProgressIndicator xpos={50} ypos={50} />;

  if (isSuccess) console.log(res);

  return (
    <AccountInfoForm submitLogInData={onLogIn} submitSignUpData={onSignUp} />
  );
};

export default LogInPage;
