"use client";
import CustomButton from "@/app/frontend/src/components/CustomButton";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Container,
  Card,
  CardHeader,
  CardContent,
} from "@mui/material";
import React, { useState } from "react";
import Image from "next/image";
import { UserAccountInfo } from "@/app/shared/src/types/users.types";
import {
  useSignUserUp,
  useCurrentUser,
  useSingleUser,
  useLogUserIn,
} from "../../hooks/users.hooks";
import { routes } from "../../utils/routes";
import Link from "next/link";
import AccountInfoForm from "./AccountInfoForm";

const LogInPage = () => {
  const { mutateAsync: logUserIn } = useLogUserIn();
  const { mutateAsync: signUserUp } = useSignUserUp();
  const onLogIn = async (formData: UserAccountInfo) => {
    console.log(formData);
    const updatedPersonalInfo = await logUserIn(formData);
    return updatedPersonalInfo;
  };
  const onSignUp = async (formData: UserAccountInfo) => {
    console.log(formData);
    const updatedPersonalInfo = await signUserUp(formData);
    return updatedPersonalInfo;
  };

  return (
    <AccountInfoForm submitLogInData={onLogIn} submitSignUpData={onSignUp} />
  );

  /*
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameErrortext, setUsernameErrorText] = useState<string>("");
  const [emailErrorText, setEmailErrorText] = useState<string>("");
  const [passwordErrorText, setPasswordErrorText] = useState<string>("");

  const onSignUp = async () => {
    const userAccountInfo: UserAccountInfo = {
      username: username,
      email: email,
      password: password,
    };

    await signUserUp(userAccountInfo);
  };

  const onLogIn = async () => {
    const userAccountInfo: UserAccountInfo = {
      username: username,
      email: email,
      password: password,
    };

    await logUserIn(userAccountInfo);
  };

  return (
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
          <Stack spacing={5}>
            <Stack spacing={2}>
              <TextField
                id="outlined"
                label="Username"
                defaultValue=""
                error={usernameErrortext !== ""}
                helperText={usernameErrortext}
                onChange={(e) => {
                  setUsername(e.target.value);
                  setUsernameErrorText("");
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                  },
                }}
              />
              <TextField
                id="outlined"
                label="Email"
                defaultValue=""
                error={emailErrorText !== ""}
                helperText={emailErrorText}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailErrorText("");
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                  },
                }}
              />
              <TextField
                id="outlined"
                label="Password"
                defaultValue=""
                type="password"
                error={passwordErrorText !== ""}
                helperText={passwordErrorText}
                onChange={(e) => {
                  const passwordValue = e.target.value;
                  setPassword(passwordValue);
                  setPasswordErrorText("");
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "20px",
                  },
                }}
              />
            </Stack>
            <Stack spacing={2}>
              <Link href={routes.HOME}>
                <CustomButton
                  buttonProps={{
                    label: "Log In",
                    onClick: onLogIn,
                  }}
                />
              </Link>
              <Link href={routes.CREATE_ACCOUNT}>
                <CustomButton
                  buttonProps={{
                    label: "Sign Up",
                    onClick: onSignUp,
                  }}
                />
              </Link>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
  */
};

export default LogInPage;
