import { LinearProgress, Paper, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { UserRoles } from "../../../constants/enums";
import { getUserDetails } from "../../../redux/actions/user.actions";
import ProfileDetails from "../ui/ProfileDetails";
import SupplierUpdateProfile from "../ui/SupplierUpdateProfile";
import UpdatePassword from "../ui/UpdatePassword";
import UserUpdateProfile from "../ui/UserUpdateProfile";

function ProfilePage() {
  const dispatch = useDispatch();

  const { userAuth } = useSelector((state) => state.userLogin);
  const { user, loading } = useSelector((state) => state.userDetails);

  useEffect(() => {
    dispatch(getUserDetails());
  }, [dispatch]);

  return (
    <Stack spacing={2}>
      {loading && <LinearProgress />}

      <Typography variant={"h5"}>Profile Details</Typography>

      <Stack direction={{ xs: "column", lg: "row" }} spacing={2}>
        <Paper variant={"outlined"} sx={{ p: 3, flex: 1 }}>
          <ProfileDetails profile={user} role={userAuth?.role} />
        </Paper>

        {user?.id && (
          <Stack flex={2} spacing={2}>
            <Paper variant={"outlined"} sx={{ p: 3 }}>
              {userAuth?.role === UserRoles.SUPPLIER ? (
                <SupplierUpdateProfile profile={user} />
              ) : (
                <UserUpdateProfile profile={user} />
              )}
            </Paper>
            <Paper variant={"outlined"} sx={{ p: 3 }}>
              <UpdatePassword />
            </Paper>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
export default ProfilePage;
