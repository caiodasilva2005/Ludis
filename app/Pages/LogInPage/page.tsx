"use client";
import CustomButton from "@/app/components/CustomButton";
import { Box, Stack, Typography, TextField } from "@mui/material";
import { Profile } from "@/app/Types/types";
import { supabase } from "@/app/utils/supabase";
import { profileTable } from "@/app/Types/types";
import React, { useState } from "react";

const LogInPage = () => {
  const [username, setUsername] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

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
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
        height: "100vh",
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          width: "80vw",
          height: "80vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-evenly",
          padding: 4,
          borderRadius: 4,
          boxShadow: 4,
        }}
      >
        <Typography
          variant="h1"
          sx={{
            fontWeight: "bold",
          }}
        >
          LOG IN
        </Typography>
        <Stack spacing={2}>
          <TextField
            id="outlined"
            label="Username"
            defaultValue=""
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            id="outlined"
            label="Email"
            defaultValue=""
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id="outlined"
            label="Password"
            defaultValue=""
            onChange={(e) => setPassword(e.target.value)}
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
      </Box>
    </Box>
  );
};

export default LogInPage;
