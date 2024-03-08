"use client";
import { Box, Grid, Stack, TextField, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import CustomButton from "@/app/components/CustomButton";
import { Profile } from "@/app/Types/types";
import UploadFileButton from "@/app/components/UploadFileButton";
import { imageBucket } from "@/app/Types/types";
import { supabase } from "@/app/utils/supabase";
import { profileTable } from "@/app/Types/types";
import { v4 as uuidv4 } from "uuid";

const CreateAccountPage = () => {
  const [userId, setUserId] = useState<number>(-1);
  const [profileInfo, setProfileInfo] = useState<Profile>({});

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("CurrentUser");
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
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
        setProfileInfo(data);
      }
    };
    fetchProfile();
  }, [userId]);

  const [dob, setDob] = useState({
    day: "",
    month: "",
    year: "",
  });

  const genderOptions = ["Male", "Female", "Other"];
  const experienceOptions = ["Beginner", "Intermediate", "Advanced"];

  function getDays(): string[] {
    let dayList: string[] = [];
    for (let i = 1; i <= 31; i++) {
      if (i < 10) dayList.push("0" + i);
      else dayList.push("" + i);
    }
    return dayList;
  }

  function getMonths(): string[] {
    let monthList: string[] = [];
    for (let i = 12; i >= 1; i--) {
      if (i < 10) monthList.push("0" + i);
      else monthList.push("" + i);
    }
    return monthList;
  }

  function getYears(): string[] {
    let today = new Date();
    const yyyy = today.getFullYear();

    let yearsList: string[] = [];
    for (let i = 0; i < 50; i++) {
      yearsList.push("" + (yyyy - i));
    }
    return yearsList;
  }

  function getAge(): number {
    let today = new Date();
    if (
      today.getDay() - parseInt(dob.day) >= 0 &&
      today.getMonth() - parseInt(dob.month) >= 0
    ) {
      return today.getFullYear() - parseInt(dob.year);
    }
    return today.getFullYear() - parseInt(dob.year) - 1;
  }

  useEffect(() => {
    setProfileInfo({
      ...profileInfo,
      age: getAge(),
    });
  }, [dob]); /* Update Age On Load*/

  function getImgURL(filename: string) {
    const { data } = supabase.storage
      .from(imageBucket)
      .getPublicUrl(`${filename}`);
    return data.publicUrl;
  }

  async function handleImgFile(imgFile: File) {
    const filename = `${uuidv4()}-${imgFile.name}`;
    console.log("Filename:", filename);
    const { error } = await supabase.storage
      .from(imageBucket)
      .upload(filename, imgFile);
    if (error) {
      console.log(`${error.name}`);
      return;
    }
    const imgUrl = getImgURL(filename);
    setProfileInfo({
      ...profileInfo,
      image: imgUrl,
    });
  }

  async function Submit() {
    const { error } = await supabase
      .from(profileTable)
      .update(profileInfo)
      .eq("id", userId);
    if (error) {
      console.log(`${error.code}: ${error.message}`);
      return;
    }
  }

  const handleSubmit = async () => {
    await Submit();
    window.location.href = "/";
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
        <Grid container>
          <Grid item xs={6}>
            <Stack spacing={4} alignItems="center">
              <Box
                sx={{
                  borderRadius: 2,
                  height: 200,
                  width: 300,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={profileInfo.image ? profileInfo.image! : "/next.svg"}
                  alt="Profile picture"
                  layout="fill"
                  objectFit="cover"
                />
              </Box>
              <UploadFileButton
                onImgFile={(e) => handleImgFile(e.target.files?.[0])}
              />
              <TextField
                id="outlined-bio"
                label="Bio"
                multiline
                rows={2}
                defaultValue={profileInfo.bio ? profileInfo.bio : " "}
                onChange={(e) =>
                  setProfileInfo({
                    ...profileInfo,
                    bio: e.target.value,
                  })
                }
              />
            </Stack>
          </Grid>
          <Grid item xs={6}>
            <Stack spacing={2}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <TextField
                  id="outlined-firstname"
                  label="First Name"
                  defaultValue={
                    profileInfo.first_name ? profileInfo.first_name : " "
                  }
                  sx={{
                    width: 300,
                  }}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      first_name: e.target.value,
                    })
                  }
                />
                <TextField
                  id="outlined-lastname"
                  label="Last Name"
                  defaultValue={
                    profileInfo.last_name ? profileInfo.last_name : " "
                  }
                  sx={{
                    width: 300,
                  }}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      last_name: e.target.value,
                    })
                  }
                />
              </Box>
              <TextField
                id="outlined-select-gender"
                defaultValue={profileInfo.gender ? profileInfo.gender : " "}
                select
                label="Gender"
                onChange={(e) =>
                  setProfileInfo({
                    ...profileInfo,
                    gender: e.target.value,
                  })
                }
              >
                {genderOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                id="outlined-select-experience"
                select
                defaultValue={
                  profileInfo.experience_level
                    ? profileInfo.experience_level
                    : " "
                }
                label="Experience"
                onChange={(e) =>
                  setProfileInfo({
                    ...profileInfo,
                    experience_level: e.target.value,
                  })
                }
              >
                {experienceOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <TextField
                  id="outlined-select-months"
                  select
                  label="mm"
                  sx={{
                    width: 200,
                  }}
                  onChange={(e) =>
                    setDob({
                      ...dob,
                      month: e.target.value,
                    })
                  }
                >
                  {getMonths().map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-select-days"
                  select
                  label="dd"
                  sx={{
                    width: 200,
                  }}
                  onChange={(e) =>
                    setDob({
                      ...dob,
                      day: e.target.value,
                    })
                  }
                >
                  {getDays().map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  id="outlined-select-years"
                  select
                  label="yyyy"
                  sx={{
                    width: 200,
                  }}
                  onChange={(e) =>
                    setDob({
                      ...dob,
                      year: e.target.value,
                    })
                  }
                >
                  {getYears().map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <CustomButton
          buttonProps={{
            label: "Submit",
            onClick: async () => await handleSubmit(),
          }}
        />
      </Box>
    </Box>
  );
};

export default CreateAccountPage;
