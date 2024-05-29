import { Filter } from "@/app/shared/src/types/filters.types";
import { Drawer, IconButton } from "@mui/material";
import React from "react";
import SideBar from "../../../components/SideBar";
import MenuIcon from "@mui/icons-material/Menu";

interface FilterBarProps {
  filter: Filter;
  drawerOpen: boolean;
  setDrawerOpen: (drawerOpen: boolean) => void;
  handleFilterChange: (value: string) => void;
}

const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  handleFilterChange,
  drawerOpen,
  setDrawerOpen,
}) => {
  return (
    <>
      <IconButton
        size="large"
        style={{ color: "white" }}
        onClick={() => {
          setDrawerOpen(true);
        }}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor="left"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      >
        <SideBar filter={filter} onChange={handleFilterChange} />
      </Drawer>
    </>
  );
};

export default FilterBar;
