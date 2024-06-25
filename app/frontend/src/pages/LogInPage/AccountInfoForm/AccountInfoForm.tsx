import { User, UserAccountInfo } from "@/app/shared/src/types/users.types";
import { useForm } from "react-hook-form";
import AccountInfoFormView from "./AccountInfoFormView";
import { useState } from "react";
import { UserAction } from "@/app/shared/src/types/actions.type";
import { CredentialResponse } from "@react-oauth/google";

interface AccountInfoFormProps {
  submitLogInData: (formData: UserAccountInfo) => Promise<User>;
  submitSignUpData: (formData: UserAccountInfo) => Promise<User>;
  submitGoogleLogInData: (
    googleAccountinfo: CredentialResponse
  ) => Promise<User>;
}

const AccountInfoForm: React.FC<AccountInfoFormProps> = ({
  submitLogInData,
  submitSignUpData,
  submitGoogleLogInData,
}) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<UserAccountInfo>();
  const [action, setAction] = useState<UserAction>("log-in");

  return (
    <AccountInfoFormView
      control={control}
      handleSubmit={handleSubmit}
      onLogIn={submitLogInData}
      onSignUp={submitSignUpData}
      action={action}
      setAction={setAction}
      onGoogleLogIn={submitGoogleLogInData}
    />
  );
};

export default AccountInfoForm;
