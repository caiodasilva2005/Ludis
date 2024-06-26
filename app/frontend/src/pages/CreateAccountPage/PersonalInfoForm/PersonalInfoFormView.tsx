import { UserPersonalInfo } from "@/app/shared/src/types/users.types";
import {
  Box,
  CircularProgress,
  FormControl,
  FormLabel,
  Grid,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import React from "react";
import { Control, Controller, UseFormHandleSubmit } from "react-hook-form";
import HomeButton from "../../../components/HomeButton";
import PhotoDisplay from "../../../components/PhotoDisplay";
import UploadFileButton from "../../../components/UploadFileButton";
import CustomButton from "../../../components/CustomButton";
import { getDays, getMonths, getYears } from "../../../utils/datetime";

interface PersonalInfoFormViewProps {
  onImageFile: (imageFile: File) => Promise<string>;
  uploadImageIsLoading: boolean;
  control: Control<UserPersonalInfo, any>;
  genders: string[];
  experienceLevels: string[];
  onSubmit: (personalInfo: UserPersonalInfo) => void;
  handleSubmit: UseFormHandleSubmit<UserPersonalInfo>;
  hasPersonalInfoSet: boolean;
}

const PersonalInfoFormView: React.FC<PersonalInfoFormViewProps> = ({
  onImageFile,
  uploadImageIsLoading,
  control,
  genders,
  experienceLevels,
  onSubmit,
  handleSubmit,
  hasPersonalInfoSet,
}) => {
  return (
    <form
      id={"personal-info-form"}
      onSubmit={(e) => {
        e.stopPropagation();
        handleSubmit(onSubmit)(e);
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100vw",
          height: "100vh",
        }}
      >
        {hasPersonalInfoSet && <HomeButton />}
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
              <Stack spacing={2} alignItems="center">
                <Controller
                  name="image"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <Stack spacing={2} alignItems="center">
                      {uploadImageIsLoading ? (
                        <CircularProgress color="secondary" />
                      ) : (
                        <PhotoDisplay height={200} width={300} img={value} />
                      )}
                      <UploadFileButton
                        onImgFile={onImageFile}
                        onChange={onChange}
                      />
                    </Stack>
                  )}
                />
                <FormControl>
                  <FormLabel>Bio</FormLabel>
                  <Controller
                    name="bio"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        rows={2}
                        id="outlined-bio"
                        onChange={(e) => {
                          onChange(e.target.value);
                        }}
                        value={value}
                      />
                    )}
                  />
                </FormControl>
              </Stack>
            </Grid>
            <Grid item xs={6}>
              <Stack spacing={1}>
                <FormControl>
                  <FormLabel>Display Name</FormLabel>
                  <Controller
                    name="displayName"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        required
                        id="outlined-display-name"
                        onChange={(e) => {
                          onChange(e.target.value);
                        }}
                        value={value}
                      />
                    )}
                  />
                </FormControl>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <FormControl fullWidth>
                    <FormLabel>First Name</FormLabel>
                    <Controller
                      name="firstName"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          required
                          id="outlined-first-name"
                          onChange={(e) => {
                            onChange(e.target.value);
                          }}
                          value={value}
                        />
                      )}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <FormLabel>Last Name</FormLabel>
                    <Controller
                      name="lastName"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextField
                          required
                          id="outlined-last-name"
                          onChange={(e) => {
                            onChange(e.target.value);
                          }}
                          value={value}
                        />
                      )}
                    />
                  </FormControl>
                </Box>
                <FormControl fullWidth>
                  <FormLabel>Gender</FormLabel>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        required
                        id="outlined-select-gender"
                        onChange={(e) => {
                          onChange(e.target.value);
                        }}
                        value={value}
                      >
                        {genders.map((gender) => (
                          <MenuItem key={gender} value={gender}>
                            {gender}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                <FormControl fullWidth>
                  <FormLabel>Experience Level</FormLabel>
                  <Controller
                    name="experienceLevel"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <Select
                        required
                        id="outlined-select-experience"
                        onChange={(e) => {
                          onChange(e.target.value);
                        }}
                        value={value}
                      >
                        {experienceLevels.map((experienceLevel) => (
                          <MenuItem
                            key={experienceLevel}
                            value={experienceLevel}
                          >
                            {experienceLevel}
                          </MenuItem>
                        ))}
                      </Select>
                    )}
                  />
                </FormControl>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-evenly",
                  }}
                >
                  <FormControl fullWidth>
                    <FormLabel>Month</FormLabel>
                    <Controller
                      name="dateOfBirth.month"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          required
                          id="outlined-select-month"
                          onChange={(e) => {
                            onChange(e.target.value);
                          }}
                          value={value}
                        >
                          {getMonths().map((month) => (
                            <MenuItem key={month} value={month}>
                              {month}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <FormLabel>Day</FormLabel>
                    <Controller
                      name="dateOfBirth.day"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          required
                          id="outlined-select-day"
                          onChange={(e) => {
                            onChange(e.target.value);
                          }}
                          value={value}
                        >
                          {getDays().map((day) => (
                            <MenuItem key={day} value={day}>
                              {day}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                  <FormControl fullWidth>
                    <FormLabel>Year</FormLabel>
                    <Controller
                      name="dateOfBirth.year"
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <Select
                          required
                          id="outlined-select-year"
                          onChange={(e) => {
                            onChange(e.target.value);
                          }}
                          value={value}
                        >
                          {getYears().map((year) => (
                            <MenuItem key={year} value={year}>
                              {year}
                            </MenuItem>
                          ))}
                        </Select>
                      )}
                    />
                  </FormControl>
                </Box>
              </Stack>
            </Grid>
          </Grid>
          <CustomButton label="Submit" submitForm={true} />
        </Box>
      </Box>
    </form>
  );
};

export default PersonalInfoFormView;
