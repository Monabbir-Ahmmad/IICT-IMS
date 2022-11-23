import {
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { FiEye as Visibility, FiEyeOff as VisibilityOff } from "react-icons/fi";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updatePassword } from "../../../redux/actions/user.actions";

function UpdatePassword() {
  const dispatch = useDispatch();
  const { handleSubmit, control, watch, reset } = useForm({
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    },
  });

  const { loading, success } = useSelector((state) => state.userPasswordUpdate);

  const [showPassword, setShowPassword] = useState({
    currentPassword: false,
    newPassword: false,
    confirmNewPassword: false,
  });

  useEffect(() => {
    if (success) {
      resetState();
    }
  }, [success]);

  const handlePasswordShowClick = (prop) => {
    setShowPassword((prev) => ({ ...prev, [prop]: !prev[prop] }));
  };

  const resetState = () => {
    reset();
    setShowPassword({
      currentPassword: false,
      newPassword: false,
      confirmNewPassword: false,
    });
  };

  const onSubmit = (data) => {
    dispatch(updatePassword(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography variant={"h6"}>Update Password</Typography>

        {loading && <LinearProgress />}

        <Controller
          name="currentPassword"
          control={control}
          rules={{ required: "Current password is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Current Password"
              variant="outlined"
              autoComplete="current-password"
              type={showPassword.currentPassword ? "text" : "password"}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handlePasswordShowClick("currentPassword")}
                    >
                      {showPassword.currentPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          name="newPassword"
          control={control}
          rules={{ required: "New password is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="New Password"
              variant="outlined"
              autoComplete="new-password"
              type={showPassword.newPassword ? "text" : "password"}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => handlePasswordShowClick("newPassword")}
                    >
                      {showPassword.newPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />

        <Controller
          name="confirmNewPassword"
          control={control}
          rules={{
            required: "Confirm password is required",
            validate: (value) =>
              value === watch("newPassword") || "Passwords do not match",
          }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Confirm New Password"
              variant="outlined"
              autoComplete="confirm-password"
              type={showPassword.confirmNewPassword ? "text" : "password"}
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() =>
                        handlePasswordShowClick("confirmNewPassword")
                      }
                    >
                      {showPassword.confirmNewPassword ? (
                        <VisibilityOff />
                      ) : (
                        <Visibility />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          )}
        />
      </Stack>

      <Stack direction="row" justifyContent="flex-start" spacing={2} mt={2}>
        <Button onClick={resetState}>Clear</Button>
        <Button variant="contained" type="submit">
          Confirm Changes
        </Button>
      </Stack>
    </form>
  );
}

export default UpdatePassword;
