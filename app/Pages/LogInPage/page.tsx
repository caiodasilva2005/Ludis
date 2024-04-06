"use client";
import CustomButton from "@/app/components/CustomButton";
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
import { Profile } from "@/app/Types/types";
import { supabase } from "@/app/utils/supabase";
import { profileTable } from "@/app/Types/types";
import React, { useState } from "react";
import PhotoDisplay from "@/app/components/PhotoDisplay";
import Image from "next/image";

const LogInPage = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameErrortext, setUsernameErrorText] = useState<string>("");
  const [emailErrorText, setEmailErrorText] = useState<string>("");
  const [passwordErrorText, setPasswordErrorText] = useState<string>("");

  async function SignUp() {
    const userRes = validateUsername(username);
    const emailRes = validateEmail(email);
    const passwordRes = validatePassword(password);

    if (!userRes || !emailRes || !passwordRes) {
      return false;
    }

    const newProf: Profile = {
      username: username,
      password: password,
      email: email,
    };

    const { data, error } = await supabase
      .from(profileTable)
      .insert([newProf])
      .select();

    if (error) {
      console.log(`${error.code}: ${error.message}`);
      setUsernameErrorText("Invalid Username");
      setEmailErrorText("Invalid Email");
      setPasswordErrorText("Invalid Password");
      return false;
    }
    sessionStorage.setItem("CurrentUser", data[0].id);
    return true;
  }

  const handleSignUp = async () => {
    const res = await SignUp();
    if (res) {
      window.location.href = "/Pages/CreateAccountPage"; //switch to next page after sign up
      sessionStorage.setItem("FromSignUp", "true");
      return;
    }
  };

  async function LogIn() {
    const userRes = validateUsername(username);
    const emailRes = validateEmail(email);
    const passwordRes = validatePassword(password);

    if (!userRes || !emailRes || !passwordRes) {
      return false;
    }

    const { data, error } = await supabase
      .from(profileTable)
      .select()
      .eq("username", username);
    if (error) {
      console.log(`${error.code}: ${error.message}`);
      setUsernameErrorText("Invalid Username");
      return false;
    }
    if (data[0] && password === data[0].password && email === data[0].email) {
      sessionStorage.setItem("CurrentUser", data[0].id);
      console.log(data[0]);
      return true;
    }
    return false;
  }

  const handleLogIn = async () => {
    const res = await LogIn();
    if (res === true) {
      window.location.href = "/";
      return;
    }
    console.log("invalid");
  };

  function validateUsername(username: string) {
    if (username.length == 0) {
      setUsernameErrorText("Username is required");
      return false;
    }

    if (username.split(" ").length > 1) {
      setUsernameErrorText("Username cannot have spaces");
      return false;
    }

    return true;
  }

  function validateEmail(email: string) {
    if (email.length === 0) {
      setEmailErrorText("Email is required");
      return false;
    }

    if (email.split(" ").length > 1) {
      setEmailErrorText("Email cannot have spaces");
      return false;
    }

    if (!email.includes("@")) {
      setEmailErrorText("Invalid Email");
      return false;
    }

    if (email.substring(email.length - 4, email.length) !== ".com") {
      setEmailErrorText("Invalid Email");
      return false;
    }

    return true;
  }

  function validatePassword(password: string) {
    if (password.length == 0) {
      setPasswordErrorText("Password is required");
      return false;
    }

    if (password.split(" ").length > 1) {
      setPasswordErrorText("Password cannot have spaces");
      return false;
    }

    if (password.length < 6) {
      setPasswordErrorText("Password must be at least 6 characters long.");
      return false;
    }

    return true;
  }

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
              <CustomButton
                buttonProps={{
                  label: "Log In",
                  onClick: handleLogIn,
                }}
              />
              <CustomButton
                buttonProps={{
                  label: "Sign Up",
                  onClick: async () => await handleSignUp(),
                }}
              />
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LogInPage;
