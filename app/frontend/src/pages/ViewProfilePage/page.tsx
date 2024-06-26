"use client";
import React, { useState } from "react";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Drawer,
  Button,
  IconButton,
} from "@mui/material";
import PhotoDisplay from "@/app/frontend/src/components/PhotoDisplay";
import InfoDisplay from "@/app/frontend/src/components/InfoDisplay";
import NavBar from "@/app/frontend/src/components/NavBar";
import { useCurrentUser, useSingleUser } from "../../hooks/users.hooks";
import { getMatchingUserId } from "../../utils/users";
import ProgressIndicator from "../../components/ProgressIndicator";
import { getAge } from "../../utils/datetime";
import ChatIcon from "@mui/icons-material/Chat";
import Link from "next/link";
import { routes } from "../../utils/routes";
import { setMatchingUserId } from "../../utils/users";
import HomeButton from "../../components/HomeButton";

const ViewProfilePage = () => {
  const userId = getMatchingUserId();
  const { data: user, isLoading: userIsLoading } = useSingleUser(
    parseInt(userId!)
  );

  if (userIsLoading || !user) return <ProgressIndicator xpos={50} ypos={50} />;
  return (
    <Box
      sx={{
        bgcolor: "#28282B", //TO-DO: define color palete in separate file
        height: "auto",
        padding: "40px",
        paddingBottom: "100px",
      }}
    >
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} sx={{ mt: 10 }}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center", // Align the content in the center
            }}
          >
            <PhotoDisplay
              height={400}
              width={500}
              img={user?.personalInfo.image}
            />
          </Box>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <Typography
              variant="body1"
              sx={{
                fontWeight: "bold",
                fontSize: 32,
                color: "white",
                marginTop: 2,
              }}
            >
              {`${user?.personalInfo.firstName} ${user?.personalInfo.lastName}`}
            </Typography>
            <Link href={routes.CHAT}>
              <IconButton
                onClick={() => {
                  setMatchingUserId(user);
                }}
              >
                <ChatIcon sx={{ color: "white" }} />
              </IconButton>
            </Link>
          </Box>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              padding: 4,
              borderRadius: 4,
            }}
          >
            <Box
              sx={{
                padding: 4,
                backgroundImage: "linear-gradient(70deg, #911fad, #841b9e)",
                borderRadius: 2,
              }}
            >
              <Typography
                sx={{
                  fontSize: 16,
                  color: "white",
                }}
              >
                {user?.personalInfo.bio}
              </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6} sx={{ mt: { xs: 0, md: 10 } }}>
          <Stack spacing={2} marginRight={2}>
            <Box
              sx={{
                padding: 2,
                backgroundImage: "linear-gradient(70deg, #911fad, #841b9e)",
                borderRadius: 4,
              }}
            >
              <InfoDisplay
                label="Gender"
                info={user?.personalInfo.gender}
                fontColor="white"
              />
            </Box>
            <Box
              sx={{
                padding: 2,
                backgroundImage: "linear-gradient(70deg, #911fad, #841b9e)",
                borderRadius: 4,
              }}
            >
              <InfoDisplay
                label="Experience Level"
                info={user?.personalInfo.experienceLevel}
                fontColor="white"
              />
            </Box>
            <Box
              sx={{
                padding: 2,
                backgroundImage: "linear-gradient(70deg, #911fad, #841b9e)",
                borderRadius: 4,
              }}
            >
              <InfoDisplay
                label="Age"
                info={`${getAge(user?.personalInfo.dateOfBirth)}`}
                fontColor="white"
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
      <HomeButton />
    </Box>
  );
};

export default ViewProfilePage;
