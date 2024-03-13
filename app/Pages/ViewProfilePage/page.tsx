"use client";
import React from "react";
import { useState, useEffect } from "react";
import { supabase } from "@/app/utils/supabase";
import { Profile, profileTable, Post, postTable } from "@/app/Types/types";
import { Box, Grid, Stack, Typography } from "@mui/material";
import Image from "next/image";

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
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={5}>
          <div>
            <div className="m-14 max-h-44 flex-auto place-content-center content-center">
              {profileData?.image && (
                <Image
                  className="rounded-full"
                  src={profileData?.image}
                  alt="Profile.pic"
                  height="300"
                  width="350"
                  priority={false}
                />
              )}
            </div>
            <Stack spacing={1}>
              <div className="flex justify-center items-center text-center m-9">
                <h1 className="text-4xl font-mono font-bold text-white">
                  {profileData?.username}
                </h1>
              </div>
              <div className="grid grid-row-4 grid-col-3 gap-5">
                <div className="bg-indigo-800 rounded-full">
                  <h1 className="p-4 font-mono col-span-1 text-white">
                    Gender: {profileData?.gender}
                  </h1>
                </div>
                <div className="bg-indigo-800 rounded-full">
                  <h1 className="p-4 font-mono text-white">
                    Experience: {profileData?.experience_level}
                  </h1>
                </div>
                <div className="bg-indigo-800 rounded-full">
                  <h1 className="p-4 font-mono text-white">
                    Age: {profileData?.age}
                  </h1>
                </div>
                <div className="bg-indigo-800 rounded-full">
                  <h1 className="p-4 font-mono text-white">
                    Location: {profileData?.location}
                  </h1>
                </div>
              </div>
            </Stack>
          </div>
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
                  fontSize: 12,
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
    </Box>
  );
};
// SIDENOTE: Could also add searchbar filter to filter upon location rather than a selection-based one

export default ViewProfilePage;
