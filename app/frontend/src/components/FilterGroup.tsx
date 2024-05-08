import React from "react";
import {
  Box,
  Stack,
  Typography,
  FormGroup,
  FormControlLabel,
  Switch,
  Container,
} from "@mui/material";

const FilterGroup = ({ title, fields, onSelect }) => {
  return (
    <Container
      sx={{ bgcolor: "#7227a8", borderRadius: "25px", padding: "20px" }}
    >
      <Stack spacing={1} sx={{ textAlign: "center" }}>
        <Typography
          variant="body1"
          sx={{
            fontWeight: "bold",
            color: "whitesmoke",
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
                sx={{
                  color: "whitesmoke",
                }}
              />
            );
          })}
        </FormGroup>
      </Stack>
    </Container>
  );
};

export default FilterGroup;
