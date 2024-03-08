import React from "react";
import {
  Box,
  Stack,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
} from "@mui/material";

const FilterGroup = ({ title, fields, onSelect }) => {
  return (
    <Box
      sx={{
        width: "100%",
        padding: 2,
        bgcolor: "white",
        borderRadius: 2,
      }}
    >
      <Stack spacing={1}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
          }}
        >
          {title}
        </Typography>
        <FormGroup>
          {fields.map((field) => {
            return (
              <FormControlLabel
                key={field}
                control={<Switch onClick={() => onSelect(field)} />}
                label={field}
              />
            );
          })}
        </FormGroup>
      </Stack>
    </Box>
  );
};

export default FilterGroup;
