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
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <Card
        sx={{
          width: 0.5,
          height: 0.65,
          borderRadius: "25px",
          textAlign: "center",
          overflowY: "auto",
          padding: "10px",
        }}
      >
        <CardHeader
          titleTypographyProps={{ variant: "h3" }}
          title="Welcome To Ludis!"
          subheaderTypographyProps={{ variant: "subtitle1" }}
          subheader="The place to find your gym partner"
        />
        <CardContent>
          <Stack spacing={5}>
            <Stack spacing={2}>
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
                onChange={(e) => setPassword(e.target.value)}
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
    // <Container
    //   sx={{
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //     height: "100vh",
    //   }}
    // >
    //   <Paper
    //     elevation={24}
    //     sx={{
    //       display: "flex",
    //       flexDirection: "column",
    //       width: 0.5,
    //       height: 700,
    //       borderRadius: "25px",
    //       textAlign: "center",
    //     }}
    //   >
    //     <Typography fontSize={40} sx={{ mt: 10 }}>
    //       Welcome to Ludis!
    //     </Typography>
    //     <Stack spacing={2} sx={{ mt: 8, mx: 5 }}>
    //       <TextField
    //         id="outlined"
    //         label="Username"
    //         defaultValue=""
    //         onChange={(e) => setUsername(e.target.value)}
    //         sx={{
    //           "& .MuiOutlinedInput-root": {
    //             borderRadius: "20px",
    //           },
    //         }}
    //       />
    //       <TextField
    //         id="outlined"
    //         label="Email"
    //         defaultValue=""
    //         onChange={(e) => setEmail(e.target.value)}
    //         sx={{
    //           "& .MuiOutlinedInput-root": {
    //             borderRadius: "20px",
    //           },
    //         }}
    //       />
    //       <TextField
    //         id="outlined"
    //         label="Password"
    //         defaultValue=""
    //         onChange={(e) => setPassword(e.target.value)}
    //         sx={{
    //           "& .MuiOutlinedInput-root": {
    //             borderRadius: "20px",
    //           },
    //         }}
    //       />
    //     </Stack>
    //     <Stack spacing={2} sx={{ mt: 7, mx: 3 }}>
    //       <CustomButton
    //         buttonProps={{
    //           label: "Log In",
    //           onClick: handleLogIn,
    //         }}
    //       />
    //       <CustomButton
    //         buttonProps={{
    //           label: "Sign Up",
    //           onClick: async () => await handleSignUp(),
    //         }}
    //       />
    //     </Stack>
    //   </Paper>
    // </Container>
  );
};

export default LogInPage;
