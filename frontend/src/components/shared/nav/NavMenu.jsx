import { Button, List, Stack, Toolbar } from "@mui/material";
import {
  RiHome5Line as HomeIcon,
  RiShutDownLine as LogoutIcon,
  RiArchiveLine as InventoryIcon,
  RiShoppingCartLine as ProcurementIcon,
  RiFileList3Line as QuotationIcon,
  RiUser6Line as UserIcon,
  RiDraftLine as OrderRequestIcon,
  RiShoppingBag2Line as PurchaseOrderIcon,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import NavLinkItem from "./NavLinkItem";
import { logout } from "../../../redux/actions/auth.actions";
import { useNavigate } from "react-router-dom";
import { UserRoles } from "../../../constants/userRoles";

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

      <List component={"nav"} sx={{ flex: 1 }}>
        <NavLinkItem title={"Home"} link={"/home"} icon={HomeIcon} />

        <NavLinkItem
          title={"Profile"}
          link={`/profile/${userAuthInfo?.id}`}
          icon={UserIcon}
        />

        <NavLinkItem
          title={"Inventory"}
          link={"/inventory"}
          icon={InventoryIcon}
          allowedRoles={[UserRoles.EMPLOYEE]}
        />

        <NavLinkItem
          title={"Procurements"}
          link={"/procurements"}
          icon={ProcurementIcon}
          allowedRoles={[UserRoles.EMPLOYEE]}
        />

        <NavLinkItem
          title={"Quotations"}
          link={"/quotations"}
          icon={QuotationIcon}
          // allowedRoles={[UserRoles.SUPPLIER]}
        />

        <NavLinkItem
          title={"Purchase Orders"}
          link={"/purchase-orders"}
          icon={PurchaseOrderIcon}
          // allowedRoles={[UserRoles.SUPPLIER]}
        />
        <NavLinkItem
          title={"Order Requests"}
          link={"/order-requests"}
          icon={OrderRequestIcon}
          // allowedRoles={[UserRoles.SUPPLIER]}
        />
      </List>

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
