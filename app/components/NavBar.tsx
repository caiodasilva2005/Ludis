import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";

const NavBar = () => {
  return (
    <Box
      sx={{
        padding: 2,
        display: "flex",
        bgcolor: "#6a6a6a",
        width: "98.5vw",
        height: 50,
        borderRadius: 2,
        borderTopRightRadius: 2,
        borderTopLeftRadius: 2,
        boxShadow: 4,
      }}
    ></Box>
  );
};

export default NavBar;
