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
import { hasInfoSet } from "../../utils/users";
import PersonalInfoForm from "./PersonalInfoForm/PersonalInfoForm";

const CreateAccountPage = () => {
  const currentUser = useCurrentUser();
  const { mutateAsync: uploadImage, isLoading: uploadImageIsLoading } =
    useUploadImage();
  const { data: personalInfo } = useUserPersonalInfo(currentUser?.userId!);
  const { mutateAsync: setUserPersonalInfo } = useSetUserPersonalInfo(
    currentUser?.userId!
  );

  /*
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
  */

  const onSubmit = async (formData: UserPersonalInfo) => {
    console.log("WORKING:", formData);
    const updatedPersonalInfo = await setUserPersonalInfo(formData);
    return updatedPersonalInfo;
  };

  return (
    <PersonalInfoForm submitData={onSubmit} defaultValues={personalInfo} />
  );

  /*
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
      {isFormFilled && <HomeButton />}
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
            <Stack spacing={6}>
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
                onChange={(e) => console.log("Hi")}
                label={"Gender"}
                value="Male"
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
  */
};

export default CreateAccountPage;
