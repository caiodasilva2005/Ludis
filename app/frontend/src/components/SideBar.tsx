import React from "react";
import { Stack, Container } from "@mui/material";
import FilterGroup from "./FilterGroup";
import { filterValues } from "@/app/shared/src/types/filters.types";

const SideBar = ({ onChange }) => {
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
      </Stack>
    </Container>
  );
};

export default SideBar;
