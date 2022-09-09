import { Box, Paper, Stack, useTheme } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";

import AuthIntro from "../ui/AuthIntro";
import LoginForm from "../ui/LoginForm";
import styled from "@emotion/styled";
import { useEffect } from "react";
import { useSelector } from "react-redux";

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
      bgcolor={theme.palette.mode === "light" ? "#f7f7ff" : "#1a1a1a"}
    >
      <Wrapper style={{ flex: 1.3 }} display={{ xs: "none", lg: "flex" }}>
        <AuthIntro />
      </Wrapper>
      <Wrapper style={{ flex: 1 }}>
        <Paper variant="outlined" sx={{ px: 6, py: 10 }}>
          <LoginForm />
        </Paper>
      </Wrapper>
    </Stack>
  );
}

export default LoginRegPage;
