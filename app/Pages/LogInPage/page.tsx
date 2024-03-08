"use client";
import CustomButton from "@/app/components/CustomButton";
import { Box, Stack, Typography, TextField } from "@mui/material";
import { Profile } from "@/app/Types/types";
import { supabase } from "@/app/utils/supabase";
import { profileTable } from "@/app/Types/types";
import React, { useState } from "react";

const LogInPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  async function handleSignUp() {
    const newProf: Profile = {
      username: username,
      password: password,
    };

    const { data, error } = await supabase
      .from(profileTable)
      .insert([newProf])
      .select();

    if (error) {
      console.log(`${error.code}: ${error.message}`);
      return;
    }
    const profileId = data[0].id;
    sessionStorage.setItem("CurrentUser", profileId);
  }

  const handleLogIn = () => {
    console.log("Log In:", username);
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
              page: "/",
            }}
          />
          <CustomButton
            buttonProps={{
              label: "Sign Up",
              onClick: async () => await handleSignUp(),
              page: "/Pages/CreateAccountPage",
            }}
          />
        </Stack>
      </Box>
    </Box>
  );
};

export default LogInPage;
