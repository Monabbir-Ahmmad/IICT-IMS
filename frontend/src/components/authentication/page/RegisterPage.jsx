import {
  Box,
  Link,
  Paper,
  Stack,
  Tab,
  Tabs,
  Typography,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import AppIcon from "../../shared/icon/AppIcon";
import ThemeSwitcher from "../../shared/themeSwitch/ThemeSwitcher";
import EmployeeRegisterForm from "../ui/EmployeeRegisterForm";
import SupplierRegisterForm from "../ui/SupplierRegisterForm";

function RegisterPage() {
  const theme = useTheme();

  const navigate = useNavigate();

  const { userAuthInfo } = useSelector((state) => state.userLogin);

  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    if (userAuthInfo?.id) {
      navigate("/home", { replace: true });
    }
  }, [navigate, userAuthInfo]);

  return (
    <Stack
      spacing={2}
      minHeight={"100vh"}
      bgcolor={theme.palette.backgroundColor}
    >
      <Stack
        width={1}
        direction={"row"}
        gap={1}
        alignItems={"center"}
        px={4}
        pt={3}
      >
        <Box
          width={45}
          height={45}
          display={"flex"}
          alignItems={"center"}
          justifyContent={"center"}
          bgcolor={"#fff"}
          borderRadius={100}
        >
          <AppIcon sx={{ fontSize: 30 }} />
        </Box>
        <Typography variant="h5" sx={{ mr: "auto" }}>
          IICT IMS
        </Typography>
        <ThemeSwitcher />
      </Stack>

      <Stack
        flex={1}
        padding={3}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <Paper
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
            px: { xs: 3, sm: 6 },
            py: { xs: 5, sm: 7 },
          }}
        >
          <Typography
            variant="h3"
            sx={{ textTransform: "uppercase" }}
            color="primary"
            textAlign={"center"}
          >
            Signup
          </Typography>
          <Tabs
            variant="fullWidth"
            value={activeTab}
            onChange={(e, value) => setActiveTab(value)}
          >
            <Tab label="IICT Employee" value={1} />
            <Tab label="Supplier" value={2} />
          </Tabs>
          {activeTab === 1 && <EmployeeRegisterForm />}
          {activeTab === 2 && <SupplierRegisterForm />}
          <Typography sx={{ mt: 3 }}>
            Already have an account?{" "}
            <Link component={RouterLink} to="/login" underline="hover">
              Sign in
            </Link>
          </Typography>
        </Paper>
      </Stack>
    </Stack>
  );
}
export default RegisterPage;
