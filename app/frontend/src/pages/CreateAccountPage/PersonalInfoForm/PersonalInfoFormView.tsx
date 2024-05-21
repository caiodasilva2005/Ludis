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
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import HomeButton from "../../../components/HomeButton";
import PhotoDisplay from "../../../components/PhotoDisplay";
import UploadFileButton from "../../../components/UploadFileButton";
import { routes } from "../../../utils/routes";
import Link from "next/link";
import CustomButton from "../../../components/CustomButton";

interface PersonalInfoFormViewProps {
  setFirstName: (firstName: string) => void;
  setLastName: (lastName: string) => void;
  setBio: (bio: string) => void;
  control: Control<UserPersonalInfo, any>;
  genders: string[];
  experienceLevels: string[];
  onSubmit: (personalInfo: UserPersonalInfo) => void;
  handleSubmit: UseFormHandleSubmit<UserPersonalInfo>;
  hasPersonalInfoSet: boolean;
}

const fieldOnChange = (
  event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  setField: (field: string) => void
) => {
  if (event.target.value) {
    setField(event.target.value);
  } else {
    setField("");
  }
};

const PersonalInfoFormView: React.FC<PersonalInfoFormViewProps> = ({
  setFirstName,
  setLastName,
  setBio,
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
              <Stack spacing={4} alignItems="center">
                <Controller
                  name="bio"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <TextField
                      required
                      label={"bio"}
                      id="outlined-bio"
                      onChange={(e) => {
                        fieldOnChange(e, setBio);
                        onChange(e.target.value);
                      }}
                      value={value}
                    />
                  )}
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
                  <Controller
                    name="firstName"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        required
                        label={"First Name"}
                        id="outlined-first-name"
                        onChange={(e) => {
                          fieldOnChange(e, setFirstName);
                          onChange(e.target.value);
                        }}
                        value={value}
                      />
                    )}
                  />
                  <Controller
                    name="lastName"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextField
                        required
                        label={"Last Name"}
                        id="outlined-last-name"
                        onChange={(e) => {
                          fieldOnChange(e, setLastName);
                          onChange(e.target.value);
                        }}
                        value={value}
                      />
                    )}
                  />
                </Box>
                <FormControl fullWidth>
                  <FormLabel>Gender</FormLabel>
                  <Controller // TO-DO: Understand form controller
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
              </Stack>
            </Grid>
          </Grid>
          <CustomButton
            buttonProps={{
              sumbitForm: true,
              label: "Submit",
              onClick: handleSubmit,
            }}
          />
        </Box>
      </Box>
    </form>
  );
};

export default PersonalInfoFormView;
