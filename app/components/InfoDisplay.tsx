import React from "react";
import { Box, Typography } from "@mui/material";

const InfoDisplay = ({ label, info, fontColor }) => {
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
