import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Stack,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  TextField,
} from "@mui/material";
import { useEffect } from "react";
import { useState } from "react";
import { UserRoles } from "../../../constants/enums";

function ForgotPasswordDialog({ open, onClose, inventoryProductId }) {
  const [activeStep, setActiveStep] = useState(0);
  const [email, setEmail] = useState(null);
  const [emailFor, setEmailFor] = useState(UserRoles.EMPLOYEE);

  const [varificationCode, setVarificationCode] = useState(null);

  useEffect(() => {
    setActiveStep(0);
    setEmail(null);
    setVarificationCode(null);
  }, [open]);

  const onSendCode = () => {
    setActiveStep(1);
  };

  const onVerifyCode = () => {
    setActiveStep(2);
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
        <Stepper activeStep={activeStep} orientation="vertical">
          <Step>
            <StepLabel>
              Enter your email address to receive password reset email
            </StepLabel>
            <StepContent>
              <Stack spacing={2}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  type={"email"}
                  onChange={(e) => setEmail(e.target.value)}
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

                <Button
                  variant="contained"
                  disabled={!email?.trim()}
                  onClick={onSendCode}
                >
                  Send Password Reset Code
                </Button>
              </Stack>
            </StepContent>
          </Step>
          <Step>
            <StepLabel>
              Enter the varification code you received in your email to reset
              your password
            </StepLabel>
            <StepContent>
              <TextField
                label="Varification Code"
                variant="outlined"
                fullWidth
                type={"email"}
                onChange={(e) => setEmail(e.target.value)}
              />

              <Button
                variant="contained"
                disabled={!varificationCode?.trim()}
                onClick={onVerifyCode}
                sx={{ my: 2 }}
              >
                Reset Password
              </Button>
            </StepContent>
          </Step>
        </Stepper>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
}
export default ForgotPasswordDialog;
