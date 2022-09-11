import { Stack, Typography } from "@mui/material";

import AuthPageImage from "../../../assets/images/bg1.png";

function AuthIntro() {
  return (
    <Stack
      sx={{
        width: 1,
        height: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        alt="Art"
        src={AuthPageImage}
        style={{
          width: "80%",
          objectFit: "cover",
        }}
      />

      <Typography variant="h4">
        Manage your inventory and assets with ease
      </Typography>
    </Stack>
  );
}

export default AuthIntro;
