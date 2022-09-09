import { ListItemIcon, ListItemText, MenuItem, useTheme } from "@mui/material";
import { RiCheckboxBlankCircleLine as DefaultIcon } from "react-icons/ri";
import { NavLink } from "react-router-dom";

function NavLinkItem({ title, link, icon: Icon = DefaultIcon }) {
  const theme = useTheme();

  return (
    <MenuItem
      component={NavLink}
      to={link}
      sx={{
        padding: 2,
        transition: "background-color 500ms ease",
      }}
      style={({ isActive }) =>
        isActive
          ? {
              color: theme.palette.primary.main,
              backgroundColor: theme.palette.accent.main,
              borderRight: "4px solid",
              borderColor: theme.palette.primary.main,
            }
          : undefined
      }
    >
      <ListItemIcon sx={{ mx: 2, color: "inherit" }}>
        {<Icon fontSize={24} />}
      </ListItemIcon>
      <ListItemText primary={title} />
    </MenuItem>
  );
}

export default NavLinkItem;
