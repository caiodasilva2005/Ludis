import React from "react";
import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { User } from "@/app/shared/src/types/users.types";
import { routes } from "../utils/routes";
import HomeButton from "./HomeButton";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { logUserOut } from "../utils/auth.utils";

interface Option {
  name: string;
  page: string;
  action?: () => void;
}
const options: Option[] = [
  {
    name: "Update Info",
    page: routes.CREATE_ACCOUNT,
  },
  {
    name: "Log Out",
    page: routes.LOGIN,
    action: logUserOut,
  },
];

interface NavBarProps {
  currentUser?: User;
  anchorEl: HTMLElement | undefined;
  setAnchorEl: (anchorEl: HTMLElement | undefined) => void;
  router: AppRouterInstance;
}

const NavBar: React.FC<NavBarProps> = ({
  currentUser,
  anchorEl,
  setAnchorEl,
  router,
}) => {
  const handleAction = (option: Option) => {
    if (!!option.action) {
      option.action();
    }
    setAnchorEl(undefined);
    router.push(option.page);
  };

  return (
    <Drawer anchor="top" variant="permanent">
      <Box
        sx={{
          padding: 2,
          display: "flex",
          bgcolor: "whitesmoke",
          height: 30,
          boxShadow: 4,
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <HomeButton />
        <Box>
          <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
            <Avatar
              alt="Prof Pic"
              src={currentUser && currentUser.personalInfo.image}
            />
          </IconButton>
          <Menu
            sx={{ mt: "45px" }}
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={!!anchorEl}
            onClose={() => setAnchorEl(undefined)}
          >
            {options.map((option) => (
              <MenuItem
                key={option.name}
                onClick={() => {
                  handleAction(option);
                }}
              >
                <Typography textAlign="center">{option.name}</Typography>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Box>
    </Drawer>
  );
};

export default NavBar;
