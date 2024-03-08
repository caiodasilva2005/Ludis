import React from "react";
import { Box, Stack, Grid, Typography } from "@mui/material";
import Image from "next/image";
import InfoDisplay from "./InfoDisplay";
import CustomButton from "./CustomButton";

const ProfileDisplay = ({ profile }) => {
  const pushInfo = () => {
    console.log("Push:", profile);
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
          <Box
            sx={{
              borderRadius: 2,
              height: 200,
              width: 150,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Image
              src={profile.image ? profile.image : "/next.svg"}
              alt="Profile picture"
              layout="fill"
              objectFit="cover"
            />
          </Box>
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
            <InfoDisplay label="Username" info={profile.username} />
            <InfoDisplay label="Age" info={profile.age} />
            <InfoDisplay label="Gender" info={profile.gender} />
            <InfoDisplay label="Experience" info={profile.experience_level} />
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
          }}
        />
      </Box>
    </Box>
  );
};

export default ProfileDisplay;
