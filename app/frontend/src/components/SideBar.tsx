import React from "react";
import { Box, Stack, Typography, Container } from "@mui/material";
import FilterGroup from "./FilterGroup";
import CustomButton from "./CustomButton";

const SideBar = ({ onChange, onRunFilter }) => {
  return (
    <Container
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
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
        <CustomButton
          buttonProps={{
            label: "Search",
            onClick: onRunFilter,
          }}
        />
      </Stack>
    </Container>
  );
};

export default SideBar;
