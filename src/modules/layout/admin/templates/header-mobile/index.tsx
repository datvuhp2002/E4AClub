"use client";
import React, { useState } from "react";
import styles from "./HeaderMobile.module.scss";
import Image from "@/modules/common/components/Image";
import Button from "@/modules/common/components/Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import Box from "@mui/material/Box";
import {
  Avatar,
  Collapse,
  Divider,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
} from "@mui/material";
import { Offcanvas } from "react-bootstrap";
import { menuOptionAdmin } from "@/common/consts";
import { directAdminRoutes } from "@/config/router";
import { usePathname } from "next/navigation";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ExpandLess from "@mui/icons-material/ExpandLess";

const Header = () => {
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [showSidebar, setShowSidebar] = useState(false); // State to toggle sidebar

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleCloseSidebar = () => setShowSidebar(false); // Close sidebar

  const [openSubmenus, setOpenSubmenus] = useState<{ [key: string]: boolean }>({
    1: true,
  });
  const handleShowSidebar = () => setShowSidebar(true); // Open sidebar
  const toggleSubmenu = (index: number) => {
    setOpenSubmenus((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const pathName = usePathname();
  return (
    <>
      <div className={`${styles.wrapper} container d-block d-sm-none `}>
        <div className="d-flex align-items-center justify-content-center h-100">
          <div className="row justify-content-between">
            <div className="col-4 d-flex align-items-center justify-content-start">
              <Button
                icon_only
                transparent_btn
                rounded
                className="fs-1"
                onClick={() => {
                  setShowSidebar(!showSidebar);
                }}
              >
                <FontAwesomeIcon
                  icon={faBars}
                  className={styles.icon}
                  color="#fff"
                />
              </Button>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-center">
              <Link href="/admin">
                <Image alt="logo" src={process.env.FILE_URL + "svg/Logo.svg"} />
              </Link>
            </div>
            <div className="col-4 d-flex align-items-center justify-content-end">
              <Box className={`pe-3 d-flex justify-content-end`}>
                <Tooltip title="Open settings" sx={{ position: "relative" }}>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
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
                      <Link
                        href={setting.path}
                        className="fs-4"
                        style={{ color: "var(--text-color-primary)" }}
                      >
                        {setting.title}
                      </Link>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </div>
          </div>
        </div>
      </div>
      <Offcanvas
        show={showSidebar}
        onHide={handleCloseSidebar}
        placement="start"
        className={`${styles.offcanvas} d-relative d-sm-none `}
        backdropClassName={`${styles.backdrop}  d-block d-sm-none`}
        style={{
          top: "calc(var(--header-height) - 6rem)",
          width: "70%",
        }}
      >
        <Offcanvas.Body className={styles.canvas_body}>
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
          {directAdminRoutes.map((item, index) => {
            const isActive = item.path
              ? pathName === item.path ||
                pathName.startsWith(`/admin/${item.path}`)
              : false;
            return (
              <ListItem
                key={index}
                disablePadding
                sx={{ display: "block", zIndex: 2 }}
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
                  className={`sidebar_admin_button ${isActive ? "admin_sidebar_active" : ""}`}
                >
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <FontAwesomeIcon icon={item.icon} className="fs-3" />
                    {showSidebar && (
                      <ListItemText
                        sx={{ opacity: showSidebar ? 1 : 0, mx: 1, my: 0 }}
                        primary={item.text}
                      />
                    )}
                  </div>
                  {showSidebar &&
                    item.subMenu &&
                    (openSubmenus[index] ? (
                      <ExpandLess sx={{ fontSize: 24 }} />
                    ) : (
                      <ExpandMore sx={{ fontSize: 24 }} />
                    ))}
                </ListItemButton>
                {showSidebar && item.subMenu && (
                  <Collapse
                    in={openSubmenus[index]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {showSidebar &&
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
          })}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default Header;
