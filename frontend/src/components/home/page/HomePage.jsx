import { Stack, Typography } from "@mui/material";
import HomePageImage from "../../../assets/images/bg3.png";

function HomePage() {
  return (
    <Stack
      spacing={3}
      sx={{
        width: 1,
        height: 0.8,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <img
        alt="Art"
        src={HomePageImage}
        style={{
          width: 400,
          objectFit: "cover",
        }}
      />

      <Typography variant="h4">Welcome To</Typography>
      <Typography variant="h4">IICT Inventory Management System</Typography>
    </Stack>
  );
}
export default HomePage;
