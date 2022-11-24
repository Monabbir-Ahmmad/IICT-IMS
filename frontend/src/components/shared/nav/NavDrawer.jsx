import { Link, useTheme } from "@mui/material";
import { Outlet, Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import AppIcon from "../icon/AppIcon";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import { FiMenu as MenuOpenIcon, FiX as MenuCloseIcon } from "react-icons/fi";
import NavMenu from "./NavMenu";
import ThemeSwitcher from "../themeSwitch/ThemeSwitcher";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";

const drawerWidth = 350;

function NavDrawer({ window }) {
  const theme = useTheme();

  const [mobileOpen, setMobileOpen] = useState(false);

  const container =
    window !== undefined ? () => window().document.body : undefined;

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "100vh",
        bgcolor: theme.palette.backgroundColor,
      }}
    >
      <AppBar
        position="fixed"
        sx={{
          zIndex: (theme) => theme.zIndex.drawer + 1,
          boxShadow: "none",
          background: theme.palette.background.paper,
          borderBottom: "1px solid",
          borderBottomColor: "divider",
        }}
      >
        <Toolbar>
          <Box flexGrow={1} display={"flex"} gap={1}>
            <IconButton
              color="primary"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ display: { md: "none" } }}
            >
              {mobileOpen ? <MenuCloseIcon /> : <MenuOpenIcon />}
            </IconButton>

            <Link
              component={RouterLink}
              to="/"
              underline="none"
              sx={{
                display: "flex",
                gap: 1,
              }}
            >
              <AppIcon sx={{ fontSize: 40 }} />
              <Typography variant="h6" color={"text.primary"} fontSize={26}>
                IICT IMS
              </Typography>
            </Link>
          </Box>

          <ThemeSwitcher />
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: "block", md: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth * 0.85,
            },
          }}
          PaperProps={{
            sx: { bgcolor: "background.paper", backgroundImage: "none" },
          }}
        >
          <NavMenu />
        </Drawer>
        <Drawer
          variant="permanent"
          open
          sx={{
            display: { xs: "none", md: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          <NavMenu />
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { md: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
}

export default NavDrawer;
