import {
  Avatar,
  Button,
  MenuList,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import { BiBox as ProductIcon } from "react-icons/bi";
import {
  RiHome5Line as DiscoverIcon,
  RiShutDownLine as LogoutIcon,
  RiTeamLine as PeopleIcon,
  RiUser6Line as UserIcon,
  RiShoppingCartLine as CartIcon,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { API_HOST } from "../../../constants/apiLinks";
import NavLinkItem from "./NavLinkItem";
import { logout } from "../../../redux/actions/authActions";
import { stringToColour } from "../../../utils/utilities";
import { useNavigate } from "react-router-dom";

function NavMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userAuthInfo } = useSelector((state) => state.userLogin);

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <Stack height={"100%"}>
      <Toolbar
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          px: 2,
          py: 6,
          gap: 2,
        }}
      >
        <Avatar
          alt={userAuthInfo?.name}
          src={
            userAuthInfo?.profileImage
              ? `${API_HOST}/${userAuthInfo?.profileImage}`
              : "broken.png"
          }
          sx={{
            width: 100,
            height: 100,
            fontSize: 60,
            bgcolor: stringToColour(userAuthInfo?.name),
          }}
        />
        <Typography variant="h6">{userAuthInfo?.name}</Typography>
      </Toolbar>

      <MenuList sx={{ flex: 1 }}>
        <NavLinkItem
          title={"Home"}
          link={"/home"}
          icon={<DiscoverIcon fontSize={24} />}
        />
        <NavLinkItem
          title={"Profile"}
          link={`/profile/${userAuthInfo?.id}`}
          icon={<UserIcon fontSize={24} />}
        />
        <NavLinkItem
          title={"Products"}
          link={"/products"}
          icon={<ProductIcon fontSize={24} />}
        />
        <NavLinkItem
          title={"Users"}
          link={"/users"}
          icon={<PeopleIcon fontSize={24} />}
        />

        <NavLinkItem
          title={"Procurement"}
          link={"/procurement"}
          icon={<CartIcon fontSize={24} />}
        />
      </MenuList>

      <Button
        variant="outlined"
        size="large"
        startIcon={<LogoutIcon />}
        sx={{ m: 4 }}
        onClick={handleLogoutClick}
      >
        Logout
      </Button>
    </Stack>
  );
}

export default NavMenu;
