import { Typography } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import NavDrawer from "./components/nav/NavDrawer";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import PeoplePage from "./pages/PeoplePage";
import ProductAddPage from "./pages/ProductAddPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";

function App() {
  return (
    <Routes>
      <Route index element={<AuthPage />} />

      <Route path="/" element={<NavDrawer />}>
        <Route path="home" element={<HomePage />} />
        <Route path="profile/:userId" element={<ProfilePage />} />
        <Route path="users" element={<PeoplePage />} />
        <Route path="products" element={<ProductPage />} />
        <Route path="products/add" element={<ProductAddPage />} />
        <Route
          path="*"
          element={<Typography variant="h4">Sorry! Page Not Found</Typography>}
        />
      </Route>
    </Routes>
  );
}

export default App;
