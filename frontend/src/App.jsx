import { Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import AuthPage from "./components/authentication/page/AuthPage";
import ProcurementCreatePage from "./components/procurement/page/ProcurementCreatePage";
import ProcurementPage from "./components/procurement/page/ProcurementPage";
import QuotationPage from "./components/quotation/page/QuotationPage";
import NavDrawer from "./components/shared/nav/NavDrawer";

function App() {
  return (
    <Routes>
      <Route index element={<AuthPage />} />

      <Route path="/" element={<NavDrawer />}>
        <Route path="procurements" element={<ProcurementPage />} />
        <Route path="procurements/create" element={<ProcurementCreatePage />} />
        <Route path="quotations" element={<QuotationPage />} />
        <Route
          path="*"
          element={<Typography variant="h4">Sorry! Page Not Found</Typography>}
        />
      </Route>
    </Routes>
  );
}

export default App;
