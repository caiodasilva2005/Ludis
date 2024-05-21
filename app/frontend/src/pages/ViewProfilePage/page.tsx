"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/app/shared/src/utils/supabase";
import {
  Box,
  Grid,
  Stack,
  Typography,
  Drawer,
  CircularProgress,
} from "@mui/material";
import PhotoDisplay from "@/app/frontend/src/components/PhotoDisplay";
import InfoDisplay from "@/app/frontend/src/components/InfoDisplay";
import NavBar from "@/app/frontend/src/components/NavBar";
import { useCurrentUser, useSingleUser } from "../../hooks/users.hooks";
import { getMatchingUserId } from "../../utils/users";
import ProgressIndicator from "../../components/ProgressIndicator";

const ViewProfilePage = () => {
  const currentUser = useCurrentUser();
  const userId = getMatchingUserId();
  const { data: user, isLoading: userIsLoading } = useSingleUser(
    parseInt(userId!)
  );
  if (userIsLoading) return <ProgressIndicator xpos={50} ypos={50} />;
  return (
    <Box
      sx={{
        bgcolor: "#28282B", //TO-DO: define color palete in separate file
        height: "auto",
        padding: "40px",
        paddingBottom: "100px",
      }}
    >
      <Box>
        <Drawer anchor="top" variant="permanent">
          <NavBar currentUser={currentUser} />
        </Drawer>
      </Box>
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
                info={user?.personalInfo.age}
                fontColor="white"
              />
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ViewProfilePage;
