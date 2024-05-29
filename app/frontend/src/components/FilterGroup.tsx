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
import { isFilterSelected } from "../utils/filters";

const FilterGroup = ({ title, fields, currentFilter, onSelect }) => {
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
          {fields.map((field: string) => {
            return (
              <FormControlLabel
                key={field}
                control={
                  <Switch
                    checked={isFilterSelected(field, currentFilter)}
                    onChange={() => onSelect(field)}
                  />
                }
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
