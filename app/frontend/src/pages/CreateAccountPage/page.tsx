"use client";
import { Box, Grid, Stack, TextField, MenuItem } from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomButton from "@/app/frontend/src/components/CustomButton";
import { User } from "@/app/shared/src/types/users.types";
import UploadFileButton from "@/app/frontend/src/components/UploadFileButton";
import { imageBucket } from "@/app/shared/src/utils/supabase";
import { supabase } from "@/app/shared/src/utils/supabase";
import { profileTable } from "@/app/shared/src/utils/supabase";
import { v4 as uuidv4 } from "uuid";
import PhotoDisplay from "@/app/frontend/src/components/PhotoDisplay";
import HomeButton from "@/app/frontend/src/components/HomeButton";
import { useCurrentUser } from "../../hooks/users.hooks";

const CreateAccountPage = () => {
  const currentUser = useCurrentUser();
  const [nameError, setNameError] = useState<String>("");
  const [genderError, setGenderError] = useState<String>("");
  const [explevelError, setExplevelError] = useState<String>("");
  const [ageError, setAgeError] = useState<String>("");

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
    return true;
  }

  function validateGender() {
    return true;
  }

  function validateExperienceLevel() {
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
    for (let i = 1; i <= 12; i++) {
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
    return true;
  }

  const handleSubmit = async () => {
    console.log(currentUser);
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
              <PhotoDisplay height={200} width={300} img={"/next.svg"} />
              <UploadFileButton
                onImgFile={(e) => handleImgFile(e.target.files?.[0])}
              />
              <TextField
                id="outlined-bio"
                label={"Bio"}
                multiline
                rows={2}
                defaultValue={" "}
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
                  label={"First Name"}
                  defaultValue={" "}
                  sx={{
                    width: 300,
                  }}
                />
                <TextField
                  required
                  error={nameError !== ""}
                  helperText={nameError}
                  id="outlined-lastname"
                  label={"Last Name"}
                  defaultValue={" "}
                  sx={{
                    width: 300,
                  }}
                />
              </Box>
              <TextField
                required
                error={genderError !== ""}
                helperText={genderError}
                id="outlined-select-gender"
                defaultValue={" "}
                select
                label={"Gender"}
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
                defaultValue={" "}
                label={"Experience"}
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
                  onChange={(e) => {
                    setAgeError("");
                    setDob({
                      ...dob,
                      month: e.target.value,
                    });
                  }}
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
                  onChange={(e) => {
                    setAgeError("");
                    setDob({
                      ...dob,
                      day: e.target.value,
                    });
                  }}
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
                  onChange={(e) => {
                    setAgeError("");
                    setDob({
                      ...dob,
                      year: e.target.value,
                    });
                  }}
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
                  defaultValue={" "}
                  sx={{
                    width: 300,
                  }}
                />
                <TextField
                  id="outlined-squat"
                  label="Squat Weight"
                  defaultValue={" "}
                  sx={{
                    width: 300,
                  }}
                />
                <TextField
                  id="outlined-bench"
                  label="Bench Weight"
                  defaultValue={" "}
                  sx={{
                    width: 300,
                  }}
                />
                <TextField
                  id="outlined-deadlift"
                  label="Deadlift Weight"
                  defaultValue={" "}
                  sx={{
                    width: 300,
                  }}
                />
              </Box>
            </Stack>
          </Grid>
        </Grid>
        <CustomButton
          buttonProps={{
            label: "Submit",
            onClick: handleSubmit,
          }}
        />
      </Box>
    </Box>
  );
};

export default CreateAccountPage;
