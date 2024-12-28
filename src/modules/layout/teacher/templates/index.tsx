"use client";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Header from "./header";
import Sidebar from "./sidebar";
import { styled } from "@mui/material/styles";
import styles from "./AdminTemp.module.scss";
import HeaderMobile from "./header-mobile";
const DrawerHeader = styled("div")(({ theme }) => ({
  ...theme.mixins.toolbar,
}));

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [clickOpen, setClickOpen] = React.useState(true);
  const handleOnClickDrawer = () => {
    setOpen(!open);
    setClickOpen(!clickOpen);
  };

  const handleMouseEnter = () => {
    if (!open) setOpen(true);
  };
  const handleMouseLeave = () => {
    if (open && !clickOpen) setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Header open={open} handleDrawerOpen={handleOnClickDrawer} />
      <Sidebar
        open={open}
        handleMouseEnter={handleMouseEnter}
        handleMouseLeave={handleMouseLeave}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: "100vh",
          overflow: "scroll",
          width: "calc(100% - 240px)",
        }}
        className={`${styles.wrapper}`}
      >
        <HeaderMobile />
        <div className="d-none d-sm-block">
          <DrawerHeader />
        </div>
        <div className={`p-3 pt-4`}>{children}</div>
      </Box>
    </Box>
  );
};

export default Layout;
