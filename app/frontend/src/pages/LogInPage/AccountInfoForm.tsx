import { User, UserAccountInfo } from "@/app/shared/src/types/users.types";
import { useForm } from "react-hook-form";
import AccountInfoFormView from "./AccountInfoFormView";
import { useState } from "react";

interface AccountInfoFormProps {
  submitLogInData: (formData: UserAccountInfo) => Promise<User | undefined>;
  submitSignUpData: (formData: UserAccountInfo) => Promise<User | undefined>;
}

const AccountInfoForm: React.FC<AccountInfoFormProps> = ({
  submitLogInData,
  submitSignUpData,
}) => {
  const [onSubmit, setOnSubmit] =
    useState<(formData: UserAccountInfo) => Promise<User | undefined>>();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserAccountInfo>();

  return (
    <AccountInfoFormView
      control={control}
      handleSubmit={handleSubmit}
      onSubmit={onSubmit}
      onLogIn={submitLogInData}
      onSignUp={submitSignUpData}
      setOnSumbit={setOnSubmit}
    />
  );
};

export default AccountInfoForm;
