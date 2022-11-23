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
import TabPanel from "../../shared/tab/TabPanel";
import ThemeSwitcher from "../../shared/themeSwitch/ThemeSwitcher";
import RegisterForm from "../ui/RegisterForm";
import SupplierRegisterForm from "../ui/SupplierRegisterForm";

function RegisterPage() {
  const theme = useTheme();

  const navigate = useNavigate();

  const { userAuth } = useSelector((state) => state.userLogin);

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    if (userAuth?.id) {
      navigate("/home", { replace: true });
    }
  }, [navigate, userAuth]);

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
            <Tab label="IICT Employee" value={0} />
            <Tab label="Supplier" value={1} />
          </Tabs>

          <TabPanel value={activeTab} index={0}>
            <RegisterForm />
          </TabPanel>
          <TabPanel value={activeTab} index={1}>
            <SupplierRegisterForm />
          </TabPanel>

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
