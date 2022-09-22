import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useTheme,
} from "@mui/material";
import { forwardRef } from "react";
import { RiCheckboxBlankCircleLine as DefaultIcon } from "react-icons/ri";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { UserRoles } from "../../../constants/userRoles";

const LinkBehavior = forwardRef((props, ref) => (
  <NavLink ref={ref} to="/" {...props} role={undefined} />
));

function NavLinkItem({
  title,
  link,
  icon: Icon = DefaultIcon,
  allowedRoles = Object.values(UserRoles),
}) {
  const theme = useTheme();
  const { userAuth } = useSelector((state) => state.userLogin);

  return allowedRoles.includes(userAuth?.role) ? (
    <ListItemButton
      component={LinkBehavior}
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
        <Icon fontSize={24} />
      </ListItemIcon>
      <ListItemText primary={title}>
        <Icon fontSize={24} />
      </ListItemText>
    </ListItemButton>
  ) : null;
}

export default NavLinkItem;
