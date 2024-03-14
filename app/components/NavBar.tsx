import React from "react";
import Image from "next/image";
import { Box, Typography } from "@mui/material";

const NavBar = ({ currentUser }) => {
  const handleClick = () => {
    window.location.href = "/Pages/CreateAccountPage";
  };

  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        bgcolor: "#6a6a6a",
        width: "98.5vw",
        height: 50,
        boxShadow: 4,
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        LUDIS
      </Typography>
      <Box
        sx={{
          position: "relative",
          overflow: "hidden",
          width: 45,
          height: 45,
          cursor: "pointer",
          borderRadius: "50%",
          "&:hover": {
            bgcolor: "white",
          },
        }}
        onClick={handleClick}
      >
        <Image
          src={currentUser ? currentUser.image : "/next.svg"}
          alt="prof pic"
          layout="fill"
          objectFit="cover"
        />
      </Box>
    </Box>
  );
};

export default NavBar;
