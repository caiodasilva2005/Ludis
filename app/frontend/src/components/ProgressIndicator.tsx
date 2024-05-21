import { Box, CircularProgress } from "@mui/material";
import React from "react";

const ProgressIndicator = ({ xpos, ypos }: { xpos: number; ypos: number }) => {
  return (
    <Box
      sx={{
        position: "fixed",
        top: `${xpos}%`,
        left: `${ypos}%`,
      }}
    >
      <CircularProgress color="secondary" />
    </Box>
  );
};

export default ProgressIndicator;
