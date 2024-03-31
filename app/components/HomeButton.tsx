import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import PhotoDisplay from "./PhotoDisplay";

const HomeButton = () => {
  return (
    <Box
      sx={{
        bgcolor: "white",
        borderRadius: 2,
        padding: 1,
        cursor: "pointer",
      }}
      onClick={(e) => {
        window.location.href = "/";
      }}
    >
      <PhotoDisplay img="/LudisLogo.png" width={50} height={40} />
    </Box>
  );
};

export default HomeButton;
