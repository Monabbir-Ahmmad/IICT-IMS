import { Button, LinearProgress, TextField, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfile } from "../../../redux/actions/user.actions";

function UserUpdateProfile({ profile }) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      email: profile?.email,
      designation: profile?.designation,
      contactNumber: profile?.contactNumber,
    },
  });

  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.userProfileUpdate);

  const onSubmit = (data) => {
    dispatch(updateUserProfile(data));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <Typography variant={"h6"}>Update Profile</Typography>

        {loading && <LinearProgress />}

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
          name="designation"
          control={control}
          rules={{ required: "Designation is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Designation"
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />

        <Controller
          name="contactNumber"
          control={control}
          rules={{ required: "Contact Number is required" }}
          render={({ field, fieldState }) => (
            <TextField
              {...field}
              label="Contact Number"
              variant="outlined"
              error={!!fieldState.error}
              helperText={fieldState.error?.message}
            />
          )}
        />
      </Stack>
      <Stack direction="row" justifyContent="flex-start" spacing={2} mt={2}>
        <Button onClick={() => reset()}>Clear</Button>
        <Button variant="contained" type="submit">
          Confirm Changes
        </Button>
      </Stack>
    </form>
  );
}
export default UserUpdateProfile;
