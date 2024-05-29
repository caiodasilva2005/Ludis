import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";

interface PhotoDisplayProps {
  height: number;
  width: number;
  img?: string;
}

const PhotoDisplay: React.FC<PhotoDisplayProps> = ({ height, width, img }) => {
  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        borderRadius: 4,
        height: { height },
        width: { width },
      }}
    >
      <Image
        src={img ? img : "/next.svg"}
        alt="image"
        layout="fill"
        objectFit="cover"
      />
    </Box>
  );
};

export default PhotoDisplay;
