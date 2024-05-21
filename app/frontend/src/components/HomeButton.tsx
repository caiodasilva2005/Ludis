import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import PhotoDisplay from "./PhotoDisplay";
import Link from "next/link";
import { routes } from "../utils/routes";

const HomeButton = () => {
  return (
    <Link href={routes.HOME}>
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
      >
        <PhotoDisplay img="/LudisLogo.png" width={50} height={40} />
      </Box>
    </Link>
  );
};

export default HomeButton;
