import { useState } from "react";
import { UserAccountInfo } from "@/app/shared/src/types/users.types";
import {
  Card,
  CardContent,
  Container,
  Divider,
  FormControl,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Control, Controller, UseFormHandleSubmit } from "react-hook-form";
import CustomButton from "../../../components/CustomButton";
import Image from "next/image";
import { UserAction } from "@/app/shared/src/types/actions.type";
import { CredentialResponse, GoogleLogin } from "@react-oauth/google";

interface AccountInfoFormViewProps {
  control: Control<UserAccountInfo, any>;
  action: UserAction;
  setAction: (action: UserAction) => void;
  onLogIn: (accountInfo: UserAccountInfo) => void;
  onSignUp: (accountInfo: UserAccountInfo) => void;
  handleSubmit: UseFormHandleSubmit<UserAccountInfo>;
  onGoogleLogIn: (googleAccountInfo: CredentialResponse) => void;
}

const AccountInfoFormView: React.FC<AccountInfoFormViewProps> = ({
  control,
  action,
  setAction,
  onLogIn,
  onSignUp,
  handleSubmit,
  onGoogleLogIn,
}) => {
  return (
    <form
      id={"account-info-form"}
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit(action === "log-in" ? onLogIn : onSignUp)(e);
      }}
    >
      <Container
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          padding: "20px",
        }}
      >
        <Card
          sx={{
            borderRadius: "25px",
            textAlign: "center",
            padding: "20px",
            width: "400px",
          }}
        >
          <CardContent>
            <Image
              src="/LudisLogoWithTitle.png"
              alt="image"
              width={300}
              height={250}
            />
            <Stack spacing={3}>
              <Stack spacing={2}>
                <FormControl>
                  <Controller
                    name="email"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        id="outlined-email"
                        label="email"
                        onChange={(e) => {
                          onChange(e.target.value);
                        }}
                        value={value}
                      />
                    )}
                  />
                </FormControl>
                <FormControl>
                  <Controller
                    name="password"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <TextField
                          id="outlined-password"
                          label="password"
                          type="password"
                          onChange={(e) => {
                            onChange(e.target.value);
                          }}
                          value={value}
                        />
                      </>
                    )}
                  />
                </FormControl>
              </Stack>
              <Stack spacing={2}>
                <CustomButton
                  submitForm={true}
                  label="Log In"
                  onClick={() => setAction("log-in")}
                />
                <CustomButton
                  submitForm={true}
                  label="Sign Up"
                  onClick={() => setAction("sign-up")}
                />
              </Stack>
              <Divider>Google Login</Divider>
              <GoogleLogin
                onSuccess={(res) => onGoogleLogIn(res)}
                useOneTap
                auto_select
              />
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </form>
  );
};

export default AccountInfoFormView;
