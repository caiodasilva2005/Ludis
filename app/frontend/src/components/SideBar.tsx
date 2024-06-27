import React from "react";
import { Stack, Container, FormControlLabel } from "@mui/material";
import FilterGroup from "./FilterGroup";
import { Filter, filterValues } from "@/app/shared/src/types/filters.types";
import Checkbox from "@mui/material/Checkbox";

interface SidebarProps {
  onFilterChange: (value: string) => void;
  onFriendsOnlyChange: () => void;
  filter: Filter;
}

const SideBar: React.FC<SidebarProps> = ({
  onFilterChange,
  onFriendsOnlyChange,
  filter,
}) => {
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
          onSelect={(field: string) => onFilterChange(field)}
          filter={filter}
        />
        <FilterGroup
          title={"Experience Level"}
          fields={[
            filterValues.BEGINNER,
            filterValues.INTERMEDIATE,
            filterValues.ADVANCED,
          ]}
          onSelect={(field: string) => onFilterChange(field)}
          filter={filter}
        />
        <Container
          sx={{ bgcolor: "#7227a8", borderRadius: "25px", padding: "20px" }}
        >
          <FormControlLabel
            key={"friend-checkbox"}
            control={
              <Checkbox
                checked={filter.onlyFriends}
                onChange={() => onFriendsOnlyChange()}
                color="default"
                sx={{
                  color: "whitesmoke",
                }}
              />
            }
            label={"Friends Only"}
            sx={{
              color: "whitesmoke",
            }}
          />
        </Container>
      </Stack>
    </Container>
  );
};

export default SideBar;
