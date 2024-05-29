import React from "react";
import { Stack, Container } from "@mui/material";
import FilterGroup from "./FilterGroup";
import { Filter, filterValues } from "@/app/shared/src/types/filters.types";

interface SidebarProps {
  onChange: (value: string) => void;
  filter: Filter;
}

const SideBar: React.FC<SidebarProps> = ({ onChange, filter }) => {
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
          filter={filter}
        />
        <FilterGroup
          title={"Experience Level"}
          fields={[
            filterValues.BEGINNER,
            filterValues.INTERMEDIATE,
            filterValues.ADVANCED,
          ]}
          onSelect={(field: string) => onChange(field)}
          filter={filter}
        />
      </Stack>
    </Container>
  );
};

export default SideBar;
