"use client";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import styles from "./Header.module.scss";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import Tooltip from "@mui/material/Tooltip";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Link from "next/link";
import Cookies from "js-cookie";
import { menuOptionAdmin } from "@/common/consts";
import Button from "@/modules/common/components/Button";
interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
  handleDrawerOpen?: () => void;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: 240,
    width: `calc(100% - 240px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header: React.FC<{ open: boolean; handleDrawerOpen: () => void }> = ({
  open,
  handleDrawerOpen,
}) => {
  const [email, setEmail] = useState<any>("");

  useEffect(() => {
    // Lấy dữ liệu hoặc gán giá trị chỉ trên client-side
    setEmail(Cookies.get("email"));
  }, []);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <AppBar
      position="fixed"
      open={open}
      className={`${styles.wrapper} d-none d-sm-block`}
    >
      <Toolbar
        className={`${!open ? "ps-1" : ""} d-flex w-100 align-items-center justify-content-between`}
      >
        <Box className={`d-flex align-items-center`}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              borderRadius: 0,
              px: 3,
            }}
          >
            {open ? (
              <MenuOpenIcon sx={{ fontSize: 30 }} />
            ) : (
              <MenuIcon sx={{ fontSize: 25 }} />
            )}
          </IconButton>
          <div className="mb-0 fs-2 h-100 d-flex align-items-center ms-1">
            {process.env.NEXT_PUBLIC_APP_NAME}
          </div>
        </Box>
        <Box className={`pe-3 `}>
          <Tooltip title="" sx={{ position: "relative" }}>
            <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
              <span className="me-3 fs-3"> {email && email}</span>
              <Avatar alt="Remy Sharp" src="" />
            </IconButton>
          </Tooltip>
          <Menu
            sx={{
              mt: "45px",
              "& .MuiList-root": {
                backgroundColor: "#fff",
              },
            }}
            id="menu-appbar"
            anchorEl={anchorElUser}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={Boolean(anchorElUser)}
            onClose={handleCloseUserMenu}
          >
            {menuOptionAdmin.map((setting, index) => (
              <MenuItem
                key={index}
                onClick={handleCloseUserMenu}
                sx={{ bgcolor: "#fff" }}
              >
                <Button
                  onClick={setting.onclick || undefined}
                  to={setting.path || "#"}
                  className="fs-4 text-black"
                >
                  {setting.title}
                </Button>
              </MenuItem>
            ))}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
