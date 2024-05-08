"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/app/shared/src/utils/supabase";
import {
  Profile,
  profileTable,
  Post,
  postTable,
} from "@/app/shared/src/types/users.types";
import { Box, Grid, Stack, Typography, Drawer } from "@mui/material";
import PhotoDisplay from "@/app/frontend/src/components/PhotoDisplay";
import InfoDisplay from "@/app/frontend/src/components/InfoDisplay";
import NavBar from "@/app/frontend/src/components/NavBar";

const ViewProfilePage = () => {
  const [userId, setUserId] = useState<number>(-1);
  const [currentUser, setCurrentUser] = useState<Profile>();
  const [profileData, setProfileData] = useState<Profile>();
  const [profileId, setProfileId] = useState<number>(-1);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("CurrentUser");
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }

    const storedProfileId = sessionStorage.getItem("ProfileToView");
    if (storedProfileId) {
      setProfileId(Number(storedProfileId));
      console.log("Here");
    }
    console.log("In profile view: ", storedProfileId);
    console.log(profileId);

    const fetchProfileInfo = async () => {
      console.log("working");
      try {
        const { data, error } = await supabase
          .from(profileTable)
          .select()
          .eq("id", storedProfileId);
        if (error) {
          throw error;
        }
        setProfileData(data[0]);
      } catch (error) {
        console.log("Error fetching profile info:", error);
      }
    };

    fetchProfileInfo();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId !== -1) {
        const { data, error } = await supabase
          .from(profileTable)
          .select()
          .eq("id", userId)
          .single();

        if (error) {
          console.log(`${error.code}: ${error.message}`);
          return;
        }
        setCurrentUser(data);
      }
    };

    fetchProfile();
  }, [userId]);

  return (
    <Box
      sx={{
        bgcolor: "#28282B",
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
            <PhotoDisplay height={400} width={500} img={profileData?.image} />
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
              {profileData?.first_name + " " + profileData?.last_name}
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
                {profileData?.bio}
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
                info={profileData?.gender}
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
                info={profileData?.experience_level}
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
                info={profileData?.age}
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
                label="Preferred Workout Time"
                info={`${profileData?.workout_from}-${profileData?.workout_to}`}
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
                label="Current Split"
                info={profileData?.split}
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
                label="SBD (lbs)"
                info={`${profileData?.squat}/${profileData?.bench}/${profileData?.deadlift}`}
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
