import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import PhotoDisplay from "./PhotoDisplay";

const HomeButton = () => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: 4,
        left: 4,
        bgcolor: "white",
        borderRadius: 2,
        padding: 1,
        cursor: "pointer",
      }}
      onClick={(e) => {
        sessionStorage.setItem("FromSignUp", "false");
        window.location.href = "/";
      }}
    >
      <PhotoDisplay img="/LudisLogo.png" width={50} height={40} />
    </Box>
  );
};

export default HomeButton;
