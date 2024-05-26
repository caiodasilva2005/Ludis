import { User, UserAccountInfo } from "@/app/shared/src/types/users.types";
import { useForm } from "react-hook-form";
import AccountInfoFormView from "./AccountInfoFormView";
import { useState } from "react";

interface AccountInfoFormProps {
  submitLogInData: (formData: UserAccountInfo) => Promise<User>;
  submitSignUpData: (formData: UserAccountInfo) => Promise<User>;
}

const AccountInfoForm: React.FC<AccountInfoFormProps> = ({
  submitLogInData,
  submitSignUpData,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserAccountInfo>();

  return (
    <AccountInfoFormView
      control={control}
      handleSubmit={handleSubmit}
      onLogIn={submitLogInData}
      onSignUp={submitSignUpData}
    />
  );
};

export default AccountInfoForm;
