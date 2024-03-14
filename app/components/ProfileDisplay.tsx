import React from "react";
import { Box, Stack, Grid, Typography } from "@mui/material";
import Image from "next/image";
import InfoDisplay from "./InfoDisplay";
import CustomButton from "./CustomButton";
import PhotoDisplay from "./PhotoDisplay";

const ProfileDisplay = ({ profile }) => {
  const pushInfo = () => {
    sessionStorage.setItem("ProfileToView", profile.id);
    console.log("Push:", profile.id);
  };

  const handleChat = () => {
    console.log("handle Chat");
  };

  return (
    <Box
      sx={{
        display: "flex",
        padding: 4,
        width: "50vw",
        height: "50vh",
        bgcolor: "white",
        borderRadius: 4,
        boxShadow: 4,
      }}
    >
      <Grid container spacing={4} alignItems="center">
        <Grid item xs={5}>
          <PhotoDisplay height={200} width={150} img={profile.image} />
        </Grid>
        <Grid item xs={4}>
          <Typography
            sx={{
              color: "black",
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            {profile.first_name} {profile.last_name}
          </Typography>
          <Stack spacing={2} justifyContent="center">
            <InfoDisplay
              label="Username"
              info={profile.username}
              fontColor="black"
            />
            <InfoDisplay label="Age" info={profile.age} fontColor="black" />
            <InfoDisplay
              label="Gender"
              info={profile.gender}
              fontColor="black"
            />
            <InfoDisplay
              label="Experience"
              info={profile.experience_level}
              fontColor="black"
            />
          </Stack>
        </Grid>
      </Grid>
      <Box
        sx={{
          width: 100,
          height: 100,
        }}
      >
        <CustomButton
          buttonProps={{
            label: "View Profile",
            onClick: pushInfo,
            page: "/Pages/ViewProfilePage",
          }}
        />
        <CustomButton
          buttonProps={{
            label: "Chat",
            onClick: handleChat,
            page: "/users/ChatPage",
          }}
        />
      </Box>
    </Box>
  );
};

export default ProfileDisplay;
