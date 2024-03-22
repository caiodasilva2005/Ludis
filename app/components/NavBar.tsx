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
        bgcolor: "whitesmoke",
        height: 30,
        boxShadow: 4,
        justifyContent: "space-between",
        alignItems: "center",
        // borderRadius: "25px",
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
