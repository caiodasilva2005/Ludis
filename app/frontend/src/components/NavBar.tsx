import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";
import PhotoDisplay from "./PhotoDisplay";
import { User } from "@/app/shared/src/types/users.types";

const NavBar = ({ currentUser }: { currentUser: User }) => {
  const handleClick = () => {
    window.location.href = "/Pages/CreateAccountPage";
    sessionStorage.setItem("FromSignUp", "false");
  };

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
      <Box
        sx={{
          cursor: "pointer",
        }}
        onClick={(e) => {
          sessionStorage.setItem("FromSignUp", "false");
          window.location.href = "/";
        }}
      >
        <PhotoDisplay img="/LudisLogo.png" width={50} height={40} />
      </Box>
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
        onClick={handleClick}
      >
        <Image
          src={currentUser ? currentUser.personalInfo.image : "/next.svg"}
          alt="prof pic"
          layout="fill"
          objectFit="cover"
        />
      </Box>
    </Box>
  );
};

export default NavBar;
