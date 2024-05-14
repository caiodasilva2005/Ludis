import React from "react";
import { Box, Stack, Typography, Container } from "@mui/material";
import FilterGroup from "./FilterGroup";
import CustomButton from "./CustomButton";
import { filterValues } from "@/app/shared/src/types/filters.types";

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
          fields={[filterValues.MALE, filterValues.FEMALE, filterValues.OTHER]}
          onSelect={(field: string) => onChange(field)}
        />
        <FilterGroup
          title={"Experience Level"}
          fields={[
            filterValues.BEGINNER,
            filterValues.INTERMEDIATE,
            filterValues.ADVANCED,
          ]}
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
