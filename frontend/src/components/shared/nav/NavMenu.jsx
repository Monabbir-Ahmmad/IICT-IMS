import { Button, List, Stack, Toolbar } from "@mui/material";
import {
  RiDashboardLine as DashboardIcon,
  RiShutDownLine as LogoutIcon,
  RiArchiveLine as InventoryIcon,
  RiFileList3Line as ProcurementIcon,
  RiFileList3Line as QuotationIcon,
  RiUser6Line as UserIcon,
  RiShoppingCartLine as OrderRequestIcon,
  RiShoppingCartLine as PurchaseOrderIcon,
  RiDownload2Line as ReceiveReturnIcon,
  RiUpload2Line as DistributionIcon,
} from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import NavLinkItem from "./NavLinkItem";
import { logout } from "../../../redux/actions/auth.actions";
import { useNavigate } from "react-router-dom";
import { UserRoles } from "../../../constants/enums";

function NavMenu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userAuth } = useSelector((state) => state.userLogin);

  const handleLogoutClick = () => {
    dispatch(logout());
    navigate("/", { replace: true });
  };

  return (
    <Stack height={"100%"}>
      <Toolbar />

      <List component={"nav"} sx={{ flex: 1 }}>
        <NavLinkItem
          title={"Admin Dashboard"}
          link={"/admin-dashboard"}
          icon={DashboardIcon}
          allowedRoles={[UserRoles.ADMIN, UserRoles.DIRECTOR]}
        />

        <NavLinkItem
          title={"Profile"}
          link={`/profile/${userAuth?.id}`}
          icon={UserIcon}
        />

        <NavLinkItem
          title={"Procurements"}
          link={"/procurements"}
          icon={ProcurementIcon}
          allowedRoles={[
            UserRoles.ADMIN,
            UserRoles.DIRECTOR,
            UserRoles.OFFICE_MANAGER,
            UserRoles.OFFICE_OFFICER,
          ]}
        />

        <NavLinkItem
          title={"Quotations"}
          link={"/quotations"}
          icon={QuotationIcon}
          allowedRoles={[UserRoles.ADMIN, UserRoles.SUPPLIER]}
        />

        <NavLinkItem
          title={"Purchase Orders"}
          link={"/purchase-orders"}
          icon={PurchaseOrderIcon}
          allowedRoles={[
            UserRoles.ADMIN,
            UserRoles.DIRECTOR,
            UserRoles.OFFICE_MANAGER,
            UserRoles.OFFICE_OFFICER,
          ]}
        />

        <NavLinkItem
          title={"Order Requests"}
          link={"/order-requests"}
          icon={OrderRequestIcon}
          allowedRoles={[UserRoles.ADMIN, UserRoles.SUPPLIER]}
        />

        <NavLinkItem
          title={"Inventory"}
          link={"/inventory"}
          icon={InventoryIcon}
          allowedRoles={[
            UserRoles.ADMIN,
            UserRoles.DIRECTOR,
            UserRoles.OFFICE_MANAGER,
            UserRoles.OFFICE_OFFICER,
            UserRoles.STORE_MANAGER,
            UserRoles.STORE_OFFICER,
            UserRoles.EMPLOYEE,
          ]}
        />

        <NavLinkItem
          title={"Distribution"}
          link={"/distribution"}
          icon={DistributionIcon}
          allowedRoles={[
            UserRoles.ADMIN,
            UserRoles.DIRECTOR,
            UserRoles.STORE_MANAGER,
            UserRoles.STORE_OFFICER,
          ]}
        />

        <NavLinkItem
          title={"Receive Returns"}
          link={"/receive-returns"}
          icon={ReceiveReturnIcon}
          allowedRoles={[
            UserRoles.ADMIN,
            UserRoles.DIRECTOR,
            UserRoles.STORE_MANAGER,
            UserRoles.STORE_OFFICER,
          ]}
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
