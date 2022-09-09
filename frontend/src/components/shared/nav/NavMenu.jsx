import { Button, MenuList, Stack, Toolbar } from "@mui/material";
import {
  RiHome5Line as HomeIcon,
  RiShutDownLine as LogoutIcon,
  RiTeamLine as PeopleIcon,
  RiArchiveLine as ProductIcon,
  RiShoppingCartLine as ProcurementIcon,
  RiFileList3Line as QuotationIcon,
  RiUser6Line as UserIcon,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import NavLinkItem from "./NavLinkItem";
import { logout } from "../../../redux/actions/auth.actions";
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
      <Toolbar />

      <MenuList sx={{ flex: 1 }}>
        <NavLinkItem title={"Home"} link={"/home"} icon={HomeIcon} />

        <NavLinkItem
          title={"Profile"}
          link={`/profile/${userAuthInfo?.id}`}
          icon={UserIcon}
        />
        <NavLinkItem title={"Products"} link={"/products"} icon={ProductIcon} />

        <NavLinkItem title={"Users"} link={"/users"} icon={PeopleIcon} />

        <NavLinkItem
          title={"Procurements"}
          link={"/procurement"}
          icon={ProcurementIcon}
        />

        <NavLinkItem
          title={"Quotations"}
          link={"/quotation"}
          icon={QuotationIcon}
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
