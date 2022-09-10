import { Box, Paper, Stack, Typography, useTheme } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

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

function LoginRegPage() {
  const theme = useTheme();

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const redirect = searchParams.get("redirect");

  const { userAuthInfo } = useSelector((state) => state.userLogin);

  useEffect(() => {
    if (userAuthInfo?.id) {
      navigate(redirect ? `/${redirect}` : "/home", { replace: true });
    }
  }, [navigate, redirect, userAuthInfo]);

  return (
    <Stack
      direction={{ xs: "column", lg: "row" }}
      minHeight={"100vh"}
      bgcolor={theme.palette.backgroundColor}
      position={"relative"}
    >
      <Stack
        width={1}
        direction={"row"}
        gap={1}
        alignItems={"center"}
        position={{ xs: "relative", md: "absolute" }}
        top={0}
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

      <Wrapper style={{ flex: 1.3 }} display={{ xs: "none", lg: "flex" }}>
        <AuthIntro />
      </Wrapper>
      <Wrapper style={{ flex: 1 }}>
        <Paper
          variant="outlined"
          sx={{ px: { xs: 3, sm: 6 }, py: { xs: 5, sm: 10 } }}
        >
          <LoginForm />
        </Paper>
      </Wrapper>
    </Stack>
  );
}

export default LoginRegPage;
