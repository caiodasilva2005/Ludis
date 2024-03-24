"use client";
import ProfileDisplays from "./components/ProfileDisplays";
import SideBar from "./components/SideBar";
import { useEffect, useState } from "react";
import { Profile, profileTable, Filter } from "./Types/types";
import { supabase } from "./utils/supabase";
import { Box, Drawer, IconButton } from "@mui/material";
import NavBar from "./components/NavBar";
import MenuIcon from "@mui/icons-material/Menu";

export default function Home() {
  const [userId, setUserId] = useState<number>(-1);
  const [currentUser, setCurrentUser] = useState<Profile>();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);

  const [filter, setFilter] = useState<Filter>({
    gender: { filMale: false, filFemale: false, filOther: false },
    experience_level: {
      filBeginner: false,
      filIntermediate: false,
      filAdvanced: false,
    },
  });

  const [inputFilter, setInputFilter] = useState<Filter>(filter);

  useEffect(() => {
    const storedUserId = sessionStorage.getItem("CurrentUser");
    if (storedUserId) {
      setUserId(Number(storedUserId));
    }
    console.log("ID:", storedUserId);

    const getProfiles = async () => {
      await readProfiles();
    };

    getProfiles();
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      if (userId !== -1) {
        const { data, error } = await supabase
          .from(profileTable)
          .select()
          .eq("id", userId)
          .single();

        if (error) {
          console.log(`${error.code}: ${error.message}`);
          return;
        }

        setCurrentUser(data);
      }
    };

    fetchProfile();
  }, [userId]);

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
    setInputFilter(filter);
  };

  return (
    <Box>
      <Box>
        <Drawer anchor="top" variant="permanent">
          <NavBar currentUser={currentUser} />
        </Drawer>
      </Box>
      <Box sx={{ mt: 8 }}>
        <IconButton
          size="large"
          style={{ color: "white" }}
          onClick={() => setIsDrawerOpen(true)}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          anchor="left"
          open={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
        >
          <SideBar
            currentUser={currentUser}
            onChange={handleFilterChange}
            onRunFilter={handleRunFilter}
          />
        </Drawer>
        <ProfileDisplays
          currentUser={currentUser}
          profiles={profiles}
          filter={inputFilter}
        />
      </Box>
    </Box>
  );
}
