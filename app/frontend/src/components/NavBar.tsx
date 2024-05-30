import React from "react";
import Image from "next/image";
import { Box, Drawer, Typography } from "@mui/material";
import PhotoDisplay from "./PhotoDisplay";
import { User } from "@/app/shared/src/types/users.types";
import { routes } from "../utils/routes";
import HomeButton from "./HomeButton";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";

interface NavBarProps {
  currentUser?: User;
}

const NavBar: React.FC<NavBarProps> = ({ currentUser }) => {
  return (
    <Drawer anchor="top" variant="permanent">
      <Box
        sx={{
          padding: 2,
          display: "flex",
          bgcolor: "whitesmoke",
          height: 30,
          boxShadow: 4,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <HomeButton />
        <Link href={routes.CREATE_ACCOUNT}>
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              width: 50,
              height: 50,
              cursor: "pointer",
              borderRadius: "50%",
              "&:hover": {
                bgcolor: "white",
              },
            }}
          >
            <Image
              src={
                currentUser && currentUser.personalInfo.image
                  ? currentUser.personalInfo.image
                  : "/next.svg"
              }
              alt="prof pic"
              layout="fill"
              objectFit="cover"
            />
          </Box>
        </Link>
      </Box>
    </Drawer>
  );
};

export default NavBar;
