import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import FilterGroup from "./FilterGroup";
import CustomButton from "./CustomButton";

const SideBar = ({ currentUser, onChange, onRunFilter }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        bgcolor: "#4700ba",
        paddingTop: 2,
        height: "100vh",
        boxShadow: 4,
      }}
    >
      <Box
        sx={{
          bgcolor: "white",
          borderRadius: 2,
          paddingInline: 2,
        }}
      >
        <Typography
          variant="body1"
          sx={{
            fontSize: 24,
            fontWeight: "bold",
            color: "black",
          }}
        >
          {currentUser ? currentUser.username : ""}
        </Typography>
      </Box>
      <Stack spacing={2}>
        <FilterGroup
          title={"Gender"}
          fields={["Male", "Female", "Other"]}
          onSelect={(field: string) => onChange(field)}
        />
        <FilterGroup
          title={"Experience Level"}
          fields={["Beginner", "Intermediate", "Advanced"]}
          onSelect={(field: string) => onChange(field)}
        />
      </Stack>
      <CustomButton
        buttonProps={{
          label: "Run Filter",
          onClick: onRunFilter,
        }}
      />
    </Box>
  );
};

export default SideBar;
