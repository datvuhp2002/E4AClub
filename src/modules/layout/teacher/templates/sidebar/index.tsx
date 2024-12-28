import React, { useState } from "react";
import { styled, Theme, CSSObject } from "@mui/material/styles";
import MuiDrawer from "@mui/material/Drawer";
import Divider from "@mui/material/Divider";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Image from "@/modules/common/components/Image";
import Link from "next/link";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import styles from "./Sidebar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { usePathname } from "next/navigation";
import { directTeacherRoutes } from "@/config/router";
const drawerWidth = 240;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const Sidebar: React.FC<{
  open: boolean;
  handleMouseEnter: () => void;
  handleMouseLeave: () => void;
}> = ({ open, handleMouseEnter, handleMouseLeave }) => {
  const pathName = usePathname();
  // open submenu dựa theo pathName
  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>(
    () => {
      const initialState: { [key: string]: boolean } = {};
      directTeacherRoutes.forEach((item, index) => {
        if (item.subMenu?.some((sub) => pathName.startsWith(sub.path))) {
          initialState[index] = true;
        }
      });
      return initialState;
    }
  );
  const toggleSubmenu = (index: number) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const renderSidebarItem = () => {
    return directTeacherRoutes.map((item, index) => {
      const isActive = item.path
        ? pathName === item.path || pathName.startsWith(`/admin/${item.path}`)
        : false;
      return (
        <ListItem
          key={index}
          disablePadding
          sx={{ display: "block" }}
          className={styles.list_item_wrapper}
        >
          <ListItemButton
            sx={{
              minHeight: 60,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
            }}
            onClick={() => {
              item.subMenu ? toggleSubmenu(index) : undefined;
            }}
            component={item.path && !item.subMenu ? Link : "button"}
            {...(item.path && !item.subMenu ? { href: item.path } : {})}
            className={`sidebar_admin_button ${isActive ? "admin_sidebar_active" : ""} ${!open ? "justify-content-center" : ""}`}
          >
            <div style={{ display: "flex", alignItems: "center" }}>
              <FontAwesomeIcon icon={item.icon} className="fs-3" />
              {open && (
                <ListItemText
                  sx={{ opacity: open ? 1 : 0, mx: 1, my: 0 }}
                  primary={item.text}
                />
              )}
            </div>
            {open &&
              item.subMenu &&
              (openSubmenus[index] ? (
                <ExpandLess sx={{ fontSize: 24 }} />
              ) : (
                <ExpandMore sx={{ fontSize: 24 }} />
              ))}
          </ListItemButton>
          {open && item.subMenu && (
            <Collapse in={openSubmenus[index]} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                {open &&
                  item.subMenu.map((subItem, subIndex) => {
                    const isSubmenuActive = item.path
                      ? pathName === subItem.path ||
                        pathName.startsWith(
                          `/admin/${item.path}/${subItem.path}`
                        )
                      : false;
                    return (
                      <ListItemButton
                        key={subIndex}
                        sx={{ pl: 4 }}
                        component={Link}
                        href={subItem.path}
                        className={`sidebar_admin_button ${isSubmenuActive ? "admin_sidebar_active" : ""}`}
                      >
                        <FontAwesomeIcon
                          icon={subItem.icon}
                          style={{ fontSize: ".8rem" }}
                        />
                        <ListItemText
                          className="text-start ms-2 "
                          primary={subItem.text}
                        />
                      </ListItemButton>
                    );
                  })}
              </List>
            </Collapse>
          )}
          <Divider />
        </ListItem>
      );
    });
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.bg_img} h-100 w-100`}
        style={{
          backgroundImage: `url(${process.env.FILE_URL}/images/sidebar_bg.jpg)`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className={`${styles.bg_layer} h-100 w-100`}></div>
      </div>

      <Drawer
        open={open}
        className={`${styles.wrapper} d-none d-sm-block`}
        variant="permanent"
      >
        <DrawerHeader
          className={`${styles.logo} d-flex align-items-center justify-content-center `}
        >
          <Link href="/admin">
            <Image
              alt="logo"
              src={process.env.FILE_URL + "svg/Logo.svg"}
              logo
              className={!open ? "d-none" : ""}
            />
          </Link>
        </DrawerHeader>
        <Divider />
        <List onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {renderSidebarItem()}
        </List>
      </Drawer>
    </div>
  );
};

export default Sidebar;
