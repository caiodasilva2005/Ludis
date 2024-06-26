import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import PhotoDisplay from "./PhotoDisplay";
import Link from "next/link";
import { routes } from "../utils/routes";

interface HomeButtonProps {
  right?: boolean;
  xpos?: number;
}

const HomeButton: React.FC<HomeButtonProps> = ({ right, xpos }) => {
  const position = xpos ?? 4;
  return (
    <Link href={routes.HOME}>
      <Box
        sx={{
          position: "fixed",
          top: 4,
          left: right ? undefined : position,
          right: right ? position : undefined,
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
