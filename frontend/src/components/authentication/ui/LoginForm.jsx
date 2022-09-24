import {
  Alert,
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  IconButton,
  InputAdornment,
  LinearProgress,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from "@mui/material";
import { FiEye as Visibility, FiEyeOff as VisibilityOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { signin } from "../../../redux/actions/auth.actions";
import styled from "@emotion/styled";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { UserRoles } from "../../../constants/enums";

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

  const [loginAs, setLoginAs] = useState(UserRoles.EMPLOYEE);

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.userLogin);

  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = (values) => {
    dispatch(signin(values.email, values.password, loginAs));
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
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

      <FormControl>
        <FormLabel>Login As</FormLabel>
        <RadioGroup
          row
          value={loginAs}
          onChange={(e) => setLoginAs(e.target.value)}
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

      <Typography variant="body2" textAlign={"center"} color={"text.secondary"}>
        By continuing, you agree to our User Agreement and Privacy Policy.
      </Typography>

      <Button variant="contained" size="large" type="submit">
        Sign in
      </Button>
    </FormContainer>
  );
}

export default LoginForm;
