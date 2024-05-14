"use client";
import {
  Box,
  Grid,
  Stack,
  TextField,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CustomButton from "@/app/frontend/src/components/CustomButton";
import { User, UserPersonalInfo } from "@/app/shared/src/types/users.types";
import UploadFileButton from "@/app/frontend/src/components/UploadFileButton";
import { imageBucket } from "@/app/shared/src/utils/supabase";
import { supabase } from "@/app/shared/src/utils/supabase";
import { profileTable } from "@/app/shared/src/utils/supabase";
import { v4 as uuidv4 } from "uuid";
import PhotoDisplay from "@/app/frontend/src/components/PhotoDisplay";
import HomeButton from "@/app/frontend/src/components/HomeButton";
import {
  useCurrentUser,
  useSetUserPersonalInfo,
  useUploadImage,
  useUserPersonalInfo,
} from "../../hooks/users.hooks";
import { routes } from "../../utils/routes";
import Link from "next/link";

const CreateAccountPage = () => {
  const currentUser = useCurrentUser();
  const { mutateAsync: uploadImage, isLoading: uploadImageIsLoading } =
    useUploadImage();
  const { mutateAsync: setUserPersonalInfo } = useSetUserPersonalInfo(
    currentUser?.userId!
  );
  const { data: userPersonalInfo } = useUserPersonalInfo(265);
  const [ageError, setAgeError] = useState<String>("");
  const [image, setImage] = useState<string>();
  const [firstName, setFirstName] = useState<string>("Yo");
  const [lastName, setLastName] = useState<string>("Cool");
  const [gender, setGender] = useState<string>("Male");
  const [experienceLevel, setExperienceLevel] = useState<string>("Advanced");
  const [age, setAge] = useState<number>(7);
  const [bio, setBio] = useState<string>("What's up");

  const [dob, setDob] = useState({
    day: "",
    month: "",
    year: "",
  });

  function validateAge() {
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
    const personalInfo: UserPersonalInfo = {
      firstName: firstName,
      lastName: lastName,
      image: image,
      gender: gender,
      experienceLevel: experienceLevel,
      age: age,
      bio: bio,
    };
    console.log("INFO", userPersonalInfo);
    await setUserPersonalInfo(personalInfo);
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
              {uploadImageIsLoading ? (
                <CircularProgress color="secondary" />
              ) : (
                <PhotoDisplay
                  height={200}
                  width={300}
                  img={image ? image : "/next.svg"}
                />
              )}
              <UploadFileButton
                onImgFile={async (e) => {
                  const url = await uploadImage(e.target.files?.[0]);
                  setImage(url);
                }}
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
                  id="outlined-firstname"
                  label={"First Name"}
                  defaultValue={" "}
                  sx={{
                    width: 300,
                  }}
                />
                <TextField
                  required
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
        <Link href={routes.HOME}>
          <CustomButton
            buttonProps={{
              label: "Submit",
              onClick: handleSubmit,
            }}
          />
        </Link>
      </Box>
    </Box>
  );
};

export default CreateAccountPage;
