import { IconButton, Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./components/authentication/page/LoginPage";
import ProcurementCreatePage from "./components/procurement/page/ProcurementCreatePage";
import ProcurementPage from "./components/procurement/page/ProcurementPage";
import SingleProcurementPage from "./components/procurement/page/SingleProcurementPage";
import QuotationOfferPage from "./components/quotation/page/QuotationOfferPage";
import QuotationPage from "./components/quotation/page/QuotationPage";
import NavDrawer from "./components/shared/nav/NavDrawer";
import { useSnackbar } from "notistack";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { RiCloseLine as CloseIcon } from "react-icons/ri";
import RegisterPage from "./components/authentication/page/RegisterPage";

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

      <Route path="/" element={<NavDrawer />}>
        <Route path="procurements" element={<ProcurementPage />} />
        <Route
          path="procurements/:procurementId"
          element={<SingleProcurementPage />}
        />
        <Route path="procurements/create" element={<ProcurementCreatePage />} />
        <Route path="quotations" element={<QuotationPage />} />
        <Route
          path="quotations/:procurementId"
          element={<QuotationOfferPage />}
        />
        <Route
          path="*"
          element={<Typography variant="h4">Sorry! Page Not Found</Typography>}
        />
      </Route>
    </Routes>
  );
}

export default App;
