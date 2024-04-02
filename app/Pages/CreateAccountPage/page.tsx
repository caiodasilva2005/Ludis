"use client";
import { Box, Grid, Stack, TextField, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomButton from "@/app/components/CustomButton";
import { Profile } from "@/app/Types/types";
import UploadFileButton from "@/app/components/UploadFileButton";
import { imageBucket } from "@/app/Types/types";
import { supabase } from "@/app/utils/supabase";
import { profileTable } from "@/app/Types/types";
import { v4 as uuidv4 } from "uuid";
import PhotoDisplay from "@/app/components/PhotoDisplay";
import HomeButton from "@/app/components/HomeButton";
import { profile } from "console";

const CreateAccountPage = () => {
  const [userId, setUserId] = useState<number>(-1);
  const [profileInfo, setProfileInfo] = useState<Profile>({});
  const [nameError, setNameError] = useState<String>("");
  const [genderError, setGenderError] = useState<String>("");
  const [explevelError, setExplevelError] = useState<String>("");
  const [ageError, setAgeError] = useState<String>("");

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("CurrentUser");
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
    console.log(storedUserId);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId !== -1) {
        const { data, error } = await supabase
          .from(profileTable)
          .select()
          .eq("id", userId);
        if (error) {
          console.log(`${error.code}: ${error.message}`);
          return;
        }
        setProfileInfo(data[0]);
        console.log("Data:", data[0]);
      }
    };
    fetchProfile();
  }, [userId]);

  const [dob, setDob] = useState({
    day: "",
    month: "",
    year: "",
  });

  function validateAge() {
    if (profileInfo.age === -1) {
      setAgeError("Enter DOB");
      return false;
    }
    return true;
  }

  function validateName() {
    if (!profileInfo.first_name || !profileInfo.last_name) {
      setNameError("Enter Name");
      return false;
    }
    return true;
  }

  function validateGender() {
    if (!profileInfo.gender) {
      setGenderError("Enter Gender");
      return false;
    }
    return true;
  }

  function validateExperienceLevel() {
    if (!profileInfo.experience_level) {
      setExplevelError("Enter Experience Level");
      return false;
    }
    return true;
  }

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
    if (!dob.day || !dob.month || !dob.year) {
      return -1;
    }

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
    const ageRes = validateAge();
    const nameRes = validateName();
    const genderRes = validateGender();
    const experienceRes = validateExperienceLevel();

    if (!ageRes || !nameRes || !genderRes || !experienceRes) {
      console.log("Dob:", ageRes);
      console.log("Gender:", genderRes);
      console.log("Name:", nameRes);
      console.log("Exp:", experienceRes);
      return false;
    }

    const { error } = await supabase
      .from(profileTable)
      .update(profileInfo)
      .eq("id", userId);
    if (error) {
      console.log(`${error.code}: ${error.message}`);
      return false;
    }
    return true;
  }

  const handleSubmit = async () => {
    const res = await Submit();
    if (res) {
      window.location.href = "/";
    }
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
      {sessionStorage.getItem("FromSignUp") === "false" && <HomeButton />}
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
              <PhotoDisplay
                height={200}
                width={300}
                img={profileInfo ? profileInfo.image : "/next.svg"}
              />
              <UploadFileButton
                onImgFile={(e) => handleImgFile(e.target.files?.[0])}
              />
              <TextField
                id="outlined-bio"
                label={profileInfo ? "" : "Bio"}
                multiline
                rows={2}
                defaultValue={profileInfo ? profileInfo.bio : " "}
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
                  required
                  error={nameError !== ""}
                  helperText={nameError}
                  id="outlined-firstname"
                  label={profileInfo ? "" : "First Name"}
                  defaultValue={profileInfo ? profileInfo.first_name : " "}
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
                  required
                  error={nameError !== ""}
                  helperText={nameError}
                  id="outlined-lastname"
                  label={profileInfo ? "" : "Last Name"}
                  defaultValue={profileInfo ? profileInfo.last_name : " "}
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
                required
                error={genderError !== ""}
                helperText={genderError}
                id="outlined-select-gender"
                defaultValue={profileInfo ? profileInfo.gender : " "}
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
                required
                error={explevelError !== ""}
                helperText={explevelError}
                id="outlined-select-experience"
                select
                defaultValue={profileInfo ? profileInfo.experience_level : " "}
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
                  required
                  error={ageError !== ""}
                  helperText={ageError}
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
                  required
                  error={ageError !== ""}
                  helperText={ageError}
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
                  required
                  error={ageError !== ""}
                  helperText={ageError}
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-evenly",
                }}
              >
                <TextField
                  id="outlined-split"
                  label="Split"
                  defaultValue={profileInfo.split ? profileInfo.split : " "}
                  sx={{
                    width: 300,
                  }}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      split: e.target.value,
                    })
                  }
                />
                <TextField
                  id="outlined-squat"
                  label="Squat Weight"
                  defaultValue={profileInfo.squat ? profileInfo.squat : " "}
                  sx={{
                    width: 300,
                  }}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      squat: parseInt(e.target.value),
                    })
                  }
                />
                <TextField
                  id="outlined-bench"
                  label="Bench Weight"
                  defaultValue={profileInfo.bench ? profileInfo.bench : " "}
                  sx={{
                    width: 300,
                  }}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      bench: parseInt(e.target.value),
                    })
                  }
                />
                <TextField
                  id="outlined-deadlift"
                  label="Deadlift Weight"
                  defaultValue={
                    profileInfo.deadlift ? profileInfo.deadlift : " "
                  }
                  sx={{
                    width: 300,
                  }}
                  onChange={(e) =>
                    setProfileInfo({
                      ...profileInfo,
                      deadlift: parseInt(e.target.value),
                    })
                  }
                />
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
