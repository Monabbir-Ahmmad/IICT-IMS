import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  TextField,
  Typography,
} from "@mui/material";
import { FiEye as Visibility, FiEyeOff as VisibilityOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";

import { login } from "../../actions/authActions";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";

const FormContainer = styled.form`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  gap: 2rem;
`;

function LoginForm() {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.userLogin);

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (values) => {
    dispatch(login(values.email, values.password));
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Typography
        variant="h3"
        sx={{ textTransform: "uppercase" }}
        color="primary"
        textAlign={"center"}
      >
        Login
      </Typography>

      <Typography variant="h6" textAlign={"center"} color={"text.secondary"}>
        Login to continue using the app
      </Typography>

      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      <TextField
        {...register("email", {
          required: "Email is required",
        })}
        variant="outlined"
        label="Email"
        type={"email"}
        autoComplete="email"
        error={!!errors?.email}
        helperText={errors?.email ? errors?.email.message : null}
      />

      <TextField
        {...register("password", {
          required: "Password is required",
        })}
        variant="outlined"
        label="Password"
        autoComplete="current-password"
        type={showPassword ? "text" : "password"}
        error={!!errors.password}
        helperText={errors?.password ? errors?.password.message : null}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      <Typography variant="body2" textAlign={"center"} color={"text.secondary"}>
        By continuing, you agree to our User Agreement and Privacy Policy.
      </Typography>

      <Button variant="contained" size="large" type="submit" sx={{ mt: 3 }}>
        Sign in
      </Button>
    </FormContainer>
  );
}

export default LoginForm;
