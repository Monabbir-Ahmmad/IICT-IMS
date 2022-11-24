import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  LinearProgress,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { UserRoles } from "../../../constants/enums";
import {
  showErrorAlert,
  showSuccessAlert,
} from "../../../redux/actions/alertSnackbar.actions";
import authService from "../../../services/auth.service";

function ForgotPasswordDialog({ open, onClose }) {
  const dispatch = useDispatch();
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      email: "",
    },
  });

  const [forgotPassword, setForgotPassword] = useState({
    loading: false,
    success: false,
    error: null,
  });

  const [emailFor, setEmailFor] = useState(UserRoles.EMPLOYEE);

  useEffect(() => {
    reset();
  }, [open, reset]);

  const onSubmit = async (value) => {
    setForgotPassword({ ...forgotPassword, loading: true, error: null });
    try {
      await authService.forgotPassword(
        value.email,
        emailFor === UserRoles.SUPPLIER
      );
      setForgotPassword({ loading: false, error: null, success: true });
      dispatch(showSuccessAlert("Password reset link sent to your email"));
      onClose();
    } catch (error) {
      setForgotPassword({
        loading: false,
        error: error.message,
        success: false,
      });

      dispatch(showErrorAlert(error.message));
    }
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"sm"}
      scroll={"paper"}
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { bgcolor: "background.paper", backgroundImage: "none" },
      }}
    >
      <DialogTitle>Forgot Your Password?</DialogTitle>
      <DialogContent dividers>
        {forgotPassword.loading && <LinearProgress />}

        <form id="forgot-password-form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={2} p={2}>
            <Typography variant={"body2"}>
              Enter your email address and we'll send you a verification mail to
              reset your password.
            </Typography>

            <Controller
              name="email"
              control={control}
              rules={{
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Email"
                  variant="outlined"
                  type={"email"}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <FormControl>
              <FormLabel>Email For</FormLabel>
              <RadioGroup
                row
                value={emailFor}
                onChange={(e) => setEmailFor(e.target.value)}
              >
                <FormControlLabel
                  value={UserRoles.EMPLOYEE}
                  control={<Radio />}
                  label="IICT Employee"
                />
                <FormControlLabel
                  value={UserRoles.SUPPLIER}
                  control={<Radio />}
                  label="Supplier"
                />
              </RadioGroup>
            </FormControl>
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>

        <Button type="submit" form="forgot-password-form">
          Send Verification Email
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default ForgotPasswordDialog;
