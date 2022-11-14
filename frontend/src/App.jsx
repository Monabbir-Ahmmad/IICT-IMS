import { IconButton, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/authentication/page/LoginPage";
import ProcurementCreatePage from "./components/procurement/page/ProcurementCreatePage";
import ProcurementPage from "./components/procurement/page/ProcurementPage";
import ProcurementDetailsPage from "./components/procurement/page/ProcurementDetailsPage";
import QuotationDetailsPage from "./components/quotation/page/QuotationDetailsPage";
import QuotationPage from "./components/quotation/page/QuotationPage";
import NavDrawer from "./components/shared/nav/NavDrawer";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RiCloseLine as CloseIcon } from "react-icons/ri";
import RegisterPage from "./components/authentication/page/RegisterPage";
import AuthGuard from "./components/shared/authGuard/AuthGurad";
import { UserRoles } from "./constants/enums";
import InventoryPage from "./components/inventory/page/InventoryPage";
import OrderRequestPage from "./components/orderRequest/page/OrderRequestPage";
import OrderRequestDetailsPage from "./components/orderRequest/page/OrderRequestDetailsPage";
import PurchaseOrderPage from "./components/purchaseOrder/page/PurchaseOrderPage";
import PurchaseOrderDetailsPage from "./components/purchaseOrder/page/PurchaseOrderDetailsPage";
import ProductDistributionPage from "./components/distribution/page/ProductDistributionPage";
import ProductReturnReceivePage from "./components/receive_return/page/ProductReturnReceivePage";
import DistributionPage from "./components/distribution/page/DistributionPage";
import ReceiveReturnPage from "./components/receive_return/page/ReceiveReturnPage";
import AdminDashboardPage from "./components/admin/page/AdminDashboardPage";
import ProfilePage from "./components/profile/page/ProfilePage";

function App() {
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const alertSnackbar = useSelector((state) => state.alertSnackbar);

  useEffect(() => {
    if (alertSnackbar.open) {
      enqueueSnackbar(alertSnackbar.message, {
        variant: alertSnackbar.severity,
        autoHideDuration: 4000,
        anchorOrigin: { vertical: "bottom", horizontal: "center" },
        action: (snackbarId) => (
          <IconButton
            sx={{ color: "#fff" }}
            onClick={() => closeSnackbar(snackbarId)}
          >
            <CloseIcon />
          </IconButton>
        ),
      });
    }
  }, [alertSnackbar, closeSnackbar, enqueueSnackbar]);

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/register" element={<RegisterPage />} />

      <Route element={<AuthGuard />}>
        <Route path="/" element={<NavDrawer />}>
          <Route path="profile/:id" element={<ProfilePage />} />

          <Route element={<AuthGuard allowedRoles={[UserRoles.ADMIN]} />}>
            <Route path="admin-dashboard" element={<AdminDashboardPage />} />

            <Route path="inventory" element={<InventoryPage />} />

            <Route path="distribution" element={<DistributionPage />} />

            <Route
              path="distribution/distribute"
              element={<ProductDistributionPage />}
            />

            <Route path="receive-returns" element={<ReceiveReturnPage />} />

            <Route
              path="receive-returns/receive"
              element={<ProductReturnReceivePage />}
            />

            <Route
              path="procurements/create"
              element={<ProcurementCreatePage />}
            />

            <Route path="procurements" element={<ProcurementPage />} />

            <Route
              path="procurements/:procurementId"
              element={<ProcurementDetailsPage />}
            />

            <Route path="purchase-orders" element={<PurchaseOrderPage />} />
            <Route
              path="purchase-orders/:purchaseOrderId"
              element={<PurchaseOrderDetailsPage />}
            />
          </Route>

          <Route element={<AuthGuard />}>
            <Route path="quotations" element={<QuotationPage />} />

            <Route
              path="quotations/:procurementId"
              element={<QuotationDetailsPage />}
            />

            <Route path="order-requests" element={<OrderRequestPage />} />
            <Route
              path="order-requests/:purchaseOrderId"
              element={<OrderRequestDetailsPage />}
            />
          </Route>

          <Route
            path="unauthorized"
            element={
              <Typography variant="h4">
                You are not authorized to access this page
              </Typography>
            }
          />

          <Route
            path="*"
            element={
              <Typography variant="h4">Sorry! Page Not Found</Typography>
            }
          />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
