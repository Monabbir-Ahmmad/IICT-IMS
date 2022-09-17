import { Switch, useTheme } from "@mui/material";
import { ThemeContext } from "../../../context/ThemeContext";
import { useContext } from "react";
import styled from "@emotion/styled";
import { DarkIcon, LightIcon } from "./themeSwitcherIcons";

const StyledSwitch = styled((props) => <Switch {...props} />)(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  "& .MuiSwitch-thumb": {
    boxSizing: "border-box",
    width: 22,
    height: 22,
    backgroundColor: theme.palette.mode === "light" ? "#FFA500" : "#000a72",
    "&:before": {
      content: "''",
      position: "absolute",
      width: "100%",
      height: "100%",
      left: 0,
      top: 0,
      transition: "background-image 0.5s ease",
      backgroundRepeat: "no-repeat",
      backgroundPosition: "center",
      backgroundImage: `url('${LightIcon}')`,
    },
  },
  "& .MuiSwitch-track": {
    border: "1px solid #cfcfcf",
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === "light" ? "#f8f8f8" : "#686868",
    opacity: 1,
    transition: "background-image 0.5s ease",
  },
  "& .MuiSwitch-switchBase": {
    padding: 0,
    margin: 2,
    transitionDuration: "300ms",
    "&.Mui-checked": {
      transform: "translateX(16px)",
      "& .MuiSwitch-thumb:before": {
        backgroundImage: `url('${DarkIcon}')`,
      },
      "& + .MuiSwitch-track": {
        backgroundColor: theme.palette.mode === "light" ? "#f8f8f8" : "#686868",
        opacity: 1,
        border: 0,
      },
    },
  },
}));

function ThemeSwitcher() {
  const theme = useTheme();
  const themeContext = useContext(ThemeContext);

  return (
    <StyledSwitch
      checked={theme.palette.mode === "dark"}
      onChange={() => themeContext.toggleColorMode()}
      theme={theme}
    />
  );
}

export default ThemeSwitcher;
