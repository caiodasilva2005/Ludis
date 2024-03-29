"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabase";
import { Profile, profileTable, Post, postTable } from "@/app/Types/types";
import { Box, Grid, Stack, Typography } from "@mui/material";
import PhotoDisplay from "@/app/components/PhotoDisplay";
import InfoDisplay from "@/app/components/InfoDisplay";
import CustomButton from "@/app/components/CustomButton";


const ViewProfilePage = () => {
  const [profileData, setProfileData] = useState<Profile>();
  const [postData, setPostData] = useState<Post>();
  const [profileId, setProfileId] = useState<number>(-1);

  //For display purposes, to remove later
  const posts = ["Post1", "Post2", "Post3"];
  const friends = ["Friend1", "Friend2", "Friend3"];

  useEffect(() => {
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

    const fetchPostInfo = async () => {
      console.log("working");
      try {
        const { data, error } = await supabase
          .from(postTable)
          .select()
          .eq("postId", storedProfileId);
        if (error) {
          throw error;
        }
        setPostData(data[0]);
      } catch (error) {
        console.log("Error fetching post info:", error);
      }
    };

    fetchProfileInfo();
    fetchPostInfo();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={5} marginTop={2}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start", // Align to the top left
          }}
        >
          <CustomButton
            buttonProps={{
              label: "Home",
              page: "/",
              alignItems: "flex-start",
            }}
          />
        </Box> 
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center", // Align the content in the center
            }}
            >
            <PhotoDisplay 
              height={275} 
              width={275} 
              img={profileData?.image} 
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
            {profileData?.username}
            </Typography>
          </Box>
          <Stack spacing={2} marginLeft={2}>
            <Box
            sx={{
              padding: 2,
              bgcolor: "#5016b9",
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
              bgcolor: "#5016b9",
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
              bgcolor: "#5016b9",
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
              bgcolor: "#5016b9",
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
              bgcolor: "#5016b9",
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
              bgcolor: "#5016b9",
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
          <Grid item xs={7}>
          <Box
            sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 4,
            bgcolor: "indigo",
            borderRadius: 4,
            height: "100vh",
            }}
          >
            <Typography
            sx={{
              fontSize: 32,
              fontWeight: "bold",
              color: "white",
            }}
            >
            About
            </Typography>
            <Box
            sx={{
              padding: 4,
              bgcolor: "white",
              borderRadius: 2,
              height: "25vh",
            }}
            >
            <Typography
              sx={{
              fontSize: 16,
              }}
            >
              {profileData?.bio}
            </Typography>
            </Box>
            <Grid container spacing={1}>
            <Grid item xs={6}>
              <Box
              sx={{
                padding: 2,
                bgcolor: "white",
                borderRadius: 2,
                height: "50vh",
              }}
              >
              <Typography
                sx={{
                fontWeight: "bold",
                fontSize: 20,
                color: "black",
                }}
              >
                Friends
              </Typography>
              {friends.map((friend) => (
                <Typography
                key={friend}
                sx={{
                  fontWeight: "bold",
                  fontSize: 16,
                }}
                >
                {friend}
                </Typography>
              ))}
              </Box>
            </Grid>
            <Grid item xs={6}>
              <Box
              sx={{
                padding: 2,
                bgcolor: "white",
                borderRadius: 2,
                height: "50vh",
              }}
              >
              <Typography
                sx={{
                fontWeight: "bold",
                fontSize: 20,
                color: "black",
                }}
              >
                Posts
              </Typography>
              {posts.map((post) => (
                <Typography
                key={post}
                sx={{
                  fontWeight: "bold",
                  fontSize: 16,
                }}
                >
                {post}
                </Typography>
              ))}
              </Box>
            </Grid>
            </Grid>
          </Box>
          </Grid>
        </Grid>
        );
};

export default ViewProfilePage;