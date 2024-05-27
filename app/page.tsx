"use client";
import ProfileDisplays from "./frontend/src/components/ProfileDisplays";
import SideBar from "./frontend/src/components/SideBar";
import { useEffect, useState } from "react";
import { Box, Drawer, IconButton } from "@mui/material";
import NavBar from "./frontend/src/components/NavBar";
import MenuIcon from "@mui/icons-material/Menu";
import { User } from "./shared/src/types/users.types";
import { Filter } from "./shared/src/types/filters.types";
import { useAllUsers, useCurrentUser } from "./frontend/src/hooks/users.hooks";
import { filterChange } from "./frontend/src/utils/filters";
import { getAllMatches } from "./frontend/src/utils/users";
import ProgressIndicator from "./frontend/src/components/ProgressIndicator";

export default function Home() {
  return <div>Welcome to Ludis!</div>;
}
