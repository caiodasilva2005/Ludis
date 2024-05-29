import React from "react";
import { Box, Typography } from "@mui/material";

interface InfoDisplayProps {
  label: string;
  info: string;
  fontColor: string;
}

const InfoDisplay: React.FC<InfoDisplayProps> = ({
  label,
  info,
  fontColor,
}) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Typography
        variant="body1"
        sx={{
          fontWeight: "bold",
          marginRight: "0.5rem",
          color: fontColor,
        }}
      >
        {label}:
      </Typography>
      <Typography
        variant="body1"
        sx={{
          color: fontColor,
        }}
      >
        {info}
      </Typography>
    </Box>
  );
};

export default InfoDisplay;
