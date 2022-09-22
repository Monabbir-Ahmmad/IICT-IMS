import { Box, Link, Paper, Stack, Typography, useTheme } from "@mui/material";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import AuthIntro from "../ui/AuthIntro";
import LoginForm from "../ui/LoginForm";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import AppIcon from "../../shared/icon/AppIcon";
import ThemeSwitcher from "../../shared/themeSwitch/ThemeSwitcher";

const Wrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

function LoginPage() {
  const theme = useTheme();

  const navigate = useNavigate();
  const location = useLocation();
  const redirect = location?.state?.from?.pathname || "/";

  const { userAuth } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userAuth?.id) {
      navigate(redirect, { replace: true });
    }
  }, [navigate, redirect, userAuth]);

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

      <Stack direction={{ xs: "column", lg: "row" }}>
        <Wrapper style={{ flex: 1.3 }} display={{ xs: "none", lg: "flex" }}>
          <AuthIntro />
        </Wrapper>
        <Wrapper style={{ flex: 1 }}>
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
              Login
            </Typography>

            <Typography
              variant="h6"
              textAlign={"center"}
              color={"text.secondary"}
            >
              Login to continue using the app
            </Typography>

            <LoginForm />
            <Typography>
              Don't have an account?{" "}
              <Link component={RouterLink} to="/register" underline="hover">
                Sign up
              </Link>
            </Typography>
          </Paper>
        </Wrapper>
      </Stack>
    </Stack>
  );
}

export default LoginPage;
