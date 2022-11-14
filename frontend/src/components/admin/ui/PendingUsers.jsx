import { Alert, LinearProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showSuccessAlert } from "../../../redux/actions/alertSnackbar.actions";
import adminService from "../../../services/admin.service";
import PendingUsersTable from "./PendingUsersTable";

function PendingUsers({ onApprove }) {
  const dispatch = useDispatch();

  const [pendingUsers, setPendingUsers] = useState({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await adminService.getPendingUsers();
        setPendingUsers({
          data: res.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        setPendingUsers({
          data: [],
          loading: false,
          error: error.message,
        });
      }
    })();
  }, []);

  const onApproveClick = async (id) => {
    setPendingUsers({ ...pendingUsers, loading: true });
    try {
      await adminService.approveUser(id);
      setPendingUsers({
        data: pendingUsers.data.filter((user) => user.id !== id),
        loading: false,
        error: null,
      });
      dispatch(showSuccessAlert("User approved successfully"));
      onApprove();
    } catch (error) {
      setPendingUsers({
        data: pendingUsers.data,
        loading: false,
        error: error.message,
      });
    }
  };

  const onRejectClick = async (id) => {
    setPendingUsers({ ...pendingUsers, loading: true });
    try {
      await adminService.rejectUser(id);
      setPendingUsers({
        data: pendingUsers.data.filter((user) => user.id !== id),
        loading: false,
        error: null,
      });
      dispatch(showSuccessAlert("User rejected successfully"));
      onApprove();
    } catch (error) {
      setPendingUsers({
        data: pendingUsers.data,
        loading: false,
        error: error.message,
      });
    }
  };

  return (
    <Stack spacing={3}>
      {pendingUsers.loading && <LinearProgress />}

      {pendingUsers.error && (
        <Alert severity="error">{pendingUsers.error}</Alert>
      )}

      <PendingUsersTable
        data={pendingUsers.data}
        onApproveClick={onApproveClick}
        onRejectClick={onRejectClick}
      />
    </Stack>
  );
}
export default PendingUsers;
