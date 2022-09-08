import { Box, Stack, Typography } from "@mui/material";

import AppIcon from "../../shared/icon/AppIcon";
import AuthPageImage from "../../../assets/images/bg1.png";

function AuthIntro() {
  return (
    <Stack
      sx={{
        width: 1,
        height: 1,
        alignItems: "center",
      }}
    >
      <Box
        display={"flex"}
        alignItems={"center"}
        justifyContent={"center"}
        alignSelf={"start"}
        gap={1}
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
        <Typography variant="h5">IICT IMS</Typography>
      </Box>

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
