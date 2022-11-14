import { Stack, Tab, Tabs, useMediaQuery, useTheme } from "@mui/material";
import {
  RiFileList3Line as ProcurementIcon,
  RiUser6Line as UserIcon,
  RiShoppingCartLine as PurchaseOrderIcon,
  RiShoppingBasket2Line as SupplierIcon,
} from "react-icons/ri";
import { useEffect, useState } from "react";
import adminService from "../../../services/admin.service";
import TabPanel from "../../shared/tab/TabPanel";
import PendingUsers from "../ui/PendingUsers";
import PendingSuppliers from "../ui/PendingSuppliers";
import PendingProcurements from "../ui/PendingProcurements";
import PendingPurchaseOrders from "../ui/PendingPurchaseOrders";

function AdminDashboardPage() {
  const theme = useTheme();
  const smallScreen = useMediaQuery(theme.breakpoints.up("sm"));

  const [tabValue, setTabValue] = useState(0);

  const [pendingCounts, setPendingCounts] = useState({
    data: {
      pendingUsers: 0,
      pendingSuppliers: 0,
      pendingProcurements: 0,
      pendingPurchaseOrders: 0,
    },
    loading: true,
    error: null,
  });

  useEffect(() => {
    getPendingCounts();
  }, []);

  const getPendingCounts = async () => {
    try {
      const res = await adminService.getPendingCounts();

      setPendingCounts({
        data: res.data,
        loading: false,
        error: null,
      });
    } catch (error) {
      setPendingCounts({
        data: {
          pendingUsers: 0,
          pendingSuppliers: 0,
          pendingProcurements: 0,
          pendingPurchaseOrders: 0,
        },
        loading: false,
        error: error.message,
      });
    }
  };

  const onApprove = () => {
    getPendingCounts();
  };

  return (
    <Stack spacing={3}>
      <Tabs
        value={tabValue}
        onChange={(e, newValue) => setTabValue(newValue)}
        variant={smallScreen ? "fullWidth" : "scrollable"}
        scrollButtons="auto"
        sx={{ borderBottom: 1, borderColor: "divider" }}
      >
        <Tab
          icon={<UserIcon fontSize={24} />}
          label={`Pending User Accounts (${pendingCounts.data.pendingUsers})`}
        />
        <Tab
          icon={<SupplierIcon fontSize={24} />}
          label={`Pending Supplier Accounts (${pendingCounts.data.pendingSuppliers})`}
        />
        <Tab
          icon={<ProcurementIcon fontSize={24} />}
          label={`Pending Procurements (${pendingCounts.data.pendingProcurements})`}
        />
        <Tab
          icon={<PurchaseOrderIcon fontSize={24} />}
          label={`Pending Purchase Orders (${pendingCounts.data.pendingPurchaseOrders})`}
        />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <PendingUsers onApprove={onApprove} />
      </TabPanel>
      <TabPanel value={tabValue} index={1}>
        <PendingSuppliers onApprove={onApprove} />
      </TabPanel>
      <TabPanel value={tabValue} index={2}>
        <PendingProcurements onApprove={onApprove} />
      </TabPanel>

      <TabPanel value={tabValue} index={3}>
        <PendingPurchaseOrders onApprove={onApprove} />
      </TabPanel>
    </Stack>
  );
}
export default AdminDashboardPage;
