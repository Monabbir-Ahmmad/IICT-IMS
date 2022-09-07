import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Box, Paper, Stack } from "@mui/material";
import styled from "@emotion/styled";
import { useSelector } from "react-redux";
import AuthIntro from "../ui/AuthIntro";
import LoginForm from "../ui/LoginForm";

const Wrapper = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
`;

function LoginRegPage() {
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
      bgcolor="#f0f5ff"
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
