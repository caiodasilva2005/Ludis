import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import PhotoDisplay from "./PhotoDisplay";
import { User } from "@/app/shared/src/types/users.types";
import { routes } from "../utils/routes";
import Link from "next/link";
import HomeButton from "./HomeButton";

const NavBar = ({ currentUser }: { currentUser: User | undefined }) => {
  return (
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
  );
};

export default NavBar;
