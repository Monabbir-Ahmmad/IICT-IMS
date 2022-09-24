import styled from "@emotion/styled";
import {
  Alert,
  Button,
  IconButton,
  InputAdornment,
  LinearProgress,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { FiEye as Visibility, FiEyeOff as VisibilityOff } from "react-icons/fi";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { signup } from "../../../redux/actions/auth.actions";
import { UserRoles } from "../../../constants/enums";
import autoCompleteService from "../../../services/autoComplete.service";

const FormContainer = styled.form`
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  max-width: 500px;
  width: 100%;
  gap: 2rem;
`;

function EmployeeRegisterForm() {
  const { handleSubmit, control, watch } = useForm({
    defaultValues: {
      username: "",
      email: "",
      userRoleId: "",
      password: "",
      confirmPassword: "",
    },
  });

  const dispatch = useDispatch();

  const { loading, error } = useSelector((state) => state.userRegister);

  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });

  const [userRoles, setUserRoles] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await autoCompleteService.getUserRoles();
        setUserRoles(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  const handlePasswordShowClick = (value) => {
    setShowPassword({ ...showPassword, [value]: !showPassword[value] });
  };

  const onSubmit = (values) => {
    dispatch(signup(values, UserRoles.EMPLOYEE));
  };

  return (
    <FormContainer onSubmit={handleSubmit(onSubmit)}>
      <Controller
        name="username"
        control={control}
        rules={{ required: "Username is required" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Username"
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        rules={{ required: "Email is required" }}
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

      <Controller
        name="userRoleId"
        control={control}
        rules={{ required: "User role is required" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            select
            label="Role"
            variant="outlined"
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
          >
            {userRoles.map((role) => (
              <MenuItem key={role.id} value={role.id}>
                {role.roleName}
              </MenuItem>
            ))}
          </TextField>
        )}
      />

      <Controller
        name="password"
        control={control}
        rules={{ required: "Password is required" }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Password"
            variant="outlined"
            autoComplete="current-password"
            type={showPassword.password ? "text" : "password"}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handlePasswordShowClick("password")}
                  >
                    {showPassword.password ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        )}
      />

      <Controller
        name="confirmPassword"
        control={control}
        rules={{
          required: "Confirm password is required",
          validate: (value) =>
            value === watch("password") || "Passwords do not match",
        }}
        render={({ field, fieldState }) => (
          <TextField
            {...field}
            label="Confirm Password"
            variant="outlined"
            autoComplete="confirm-password"
            type={showPassword.confirmPassword ? "text" : "password"}
            error={!!fieldState.error}
            helperText={fieldState.error?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => handlePasswordShowClick("confirmPassword")}
                  >
                    {showPassword.confirmPassword ? (
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

      <Typography variant="body2" textAlign={"center"} color={"text.secondary"}>
        By continuing, you agree to our User Agreement and Privacy Policy.
      </Typography>

      <Button variant="contained" size="large" type="submit">
        Sign up as IICT employee
      </Button>

      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error}</Alert>}
    </FormContainer>
  );
}
export default EmployeeRegisterForm;
