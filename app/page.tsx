"use client";
import ProfileDisplays from "./components/ProfileDisplays";
import SideBar from "./components/SideBar";
import { useState } from "react";
import { Profile, profileTable, Filter } from "./Types/types";
import { supabase } from "./utils/supabase";
import { Box, Grid } from "@mui/material";
import NavBar from "./components/NavBar";

export default function Home() {
  const [profiles, setProfiles] = useState<Profile[]>([]);

  const [filter, setFilter] = useState<Filter>({
    gender: { filMale: false, filFemale: false, filOther: false },
    experience_level: {
      filBeginner: false,
      filIntermediate: false,
      filAdvanced: false,
    },
  });

  const [inputFilter, setInputFilter] = useState<Filter>(filter);

  const handleFilterChange = (field: string) => {
    /* Gender Filter */
    if (field === "Male") {
      setFilter({
        ...filter,
        gender: { ...filter.gender, filMale: !filter.gender.filMale },
      });
    } else if (field === "Female") {
      setFilter({
        ...filter,
        gender: { ...filter.gender, filFemale: !filter.gender.filFemale },
      });
    } else if (field === "Other") {
      setFilter({
        ...filter,
        gender: { ...filter.gender, filOther: !filter.gender.filOther },
      });
    }

    /* Experience Filter*/
    if (field === "Beginner") {
      setFilter({
        ...filter,
        experience_level: {
          ...filter.experience_level,
          filBeginner: !filter.experience_level.filBeginner,
        },
      });
    } else if (field === "Intermediate") {
      setFilter({
        ...filter,
        experience_level: {
          ...filter.experience_level,
          filIntermediate: !filter.experience_level.filIntermediate,
        },
      });
    } else if (field === "Advanced") {
      setFilter({
        ...filter,
        experience_level: {
          ...filter.experience_level,
          filAdvanced: !filter.experience_level.filAdvanced,
        },
      });
    }
  };

  async function readProfiles() {
    const { data, error } = await supabase.from(profileTable).select();
    if (error) {
      alert(`ERROR ${error.code}:\n${error.message}`);
      return;
    }
    setProfiles(data);
  }

  const handleRunFilter = async () => {
    await readProfiles();
    setInputFilter(filter);
  };

  return (
    <Box>
      <NavBar />
      <Grid container spacing={2}>
        <Grid item xs={3}>
          <SideBar
            onChange={handleFilterChange}
            onRunFilter={handleRunFilter}
          />
        </Grid>
        <Grid item xs={9}>
          <ProfileDisplays profiles={profiles} filter={inputFilter} />
        </Grid>
      </Grid>
    </Box>
  );
}
