import { Alert, LinearProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showSuccessAlert } from "../../../redux/actions/alertSnackbar.actions";
import adminService from "../../../services/admin.service";
import PendingSuppliersTable from "./PendingSuppliersTable";

function PendingSuppliers({ onChange }) {
  const dispatch = useDispatch();

  const [pendingSuppliers, setPendingSuppliers] = useState({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await adminService.getPendingSuppliers();
        setPendingSuppliers({
          data: res.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        setPendingSuppliers({
          data: [],
          loading: false,
          error: error.message,
        });
      }
    })();
  }, []);

  const onApproveClick = async (id) => {
    setPendingSuppliers({ ...pendingSuppliers, loading: true });
    try {
      await adminService.approveSupplier(id);
      setPendingSuppliers({
        data: pendingSuppliers.data.filter((item) => item.id !== id),
        loading: false,
        error: null,
      });
      dispatch(showSuccessAlert("Supplier approved successfully"));
      onChange();
    } catch (error) {
      setPendingSuppliers({
        data: pendingSuppliers.data,
        loading: false,
        error: error.message,
      });
    }
  };

  const onRejectClick = async (id) => {
    setPendingSuppliers({ ...pendingSuppliers, loading: true });
    try {
      await adminService.rejectSupplier(id);
      setPendingSuppliers({
        data: pendingSuppliers.data.filter((item) => item.id !== id),
        loading: false,
        error: null,
      });
      dispatch(showSuccessAlert("Supplier rejected successfully"));
      onChange();
    } catch (error) {
      setPendingSuppliers({
        data: pendingSuppliers.data,
        loading: false,
        error: error.message,
      });
    }
  };

  return (
    <Stack spacing={3}>
      {pendingSuppliers.loading && <LinearProgress />}

      {pendingSuppliers.error && (
        <Alert severity="error">{pendingSuppliers.error}</Alert>
      )}

      <PendingSuppliersTable
        data={pendingSuppliers.data}
        onApproveClick={onApproveClick}
        onRejectClick={onRejectClick}
      />
    </Stack>
  );
}
export default PendingSuppliers;
