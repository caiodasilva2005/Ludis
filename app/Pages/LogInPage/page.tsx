"use client";
import CustomButton from "@/app/components/CustomButton";
import {
  Box,
  Stack,
  Typography,
  TextField,
  Container,
  Paper,
} from "@mui/material";
import { Profile } from "@/app/Types/types";
import { supabase } from "@/app/utils/supabase";
import { profileTable } from "@/app/Types/types";
import React, { useState } from "react";

const LogInPage = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorText, setErrorText] = useState<string>("");

  async function SignUp() {
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
      return;
    }
    sessionStorage.setItem("CurrentUser", data[0].id);
  }

  const handleSignUp = async () => {
    if (password.length < 6) {
      setErrorText("Password must be at least 6 characters long.");
      return; // Return without attempting navigation
    }
    await SignUp();
    window.location.href = "/Pages/CreateAccountPage"; //switch to next page after sign up
  };

  async function LogIn() {
    const { data, error } = await supabase
      .from(profileTable)
      .select()
      .eq("username", username);
    if (error) {
      console.log(`${error.code}: ${error.message}`);
      return false;
    }
    if (password === data[0].password && email === data[0].email) {
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

  return (
    <Container
      sx={{
        my: 10,
        width: { xs: 200, sm: 250, md: 500, lg: 600 },
        height: "75vh",
      }}
    >
      <Paper
        elevation={24}
        sx={{
          display: "flex",
          flexDirection: "column",
          width: 1,
          height: 1,
          borderRadius: "25px",
          textAlign: "center",
        }}
      >
        <Typography fontSize={40} sx={{ mt: 10 }}>
          Welcome to Ludis!
        </Typography>
        <Stack spacing={2} sx={{ mt: 8, mx: 5 }}>
          <TextField
            id="outlined"
            label="Username"
            defaultValue=""
            onChange={(e) => setUsername(e.target.value)}
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
            onChange={(e) => setEmail(e.target.value)}
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
            error={errorText !== ""}
            helperText={errorText}
            onChange={(e) => {
              const passwordValue = e.target.value;
              setPassword(passwordValue);
              if (passwordValue.length > 0 && passwordValue.length < 6) {
                setErrorText("Password must be at least 6 characters long.");
              } else {
                setErrorText(""); // Clear error when user types
              }
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: "20px",
              },
            }}
          />
        </Stack>
        <Stack spacing={2} sx={{ mt: 7, mx: 3 }}>
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
      </Paper>
    </Container>
  );
};

export default LogInPage;
