import { Alert, LinearProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showSuccessAlert } from "../../../redux/actions/alertSnackbar.actions";
import adminService from "../../../services/admin.service";
import PendingProcurementsTable from "./PendingProcurementsTable";

function PendingProcurements({ onApprove }) {
  const dispatch = useDispatch();

  const [pendingProcurements, setPendingProcurements] = useState({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await adminService.getPendingProcurements();
        setPendingProcurements({
          data: res.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        setPendingProcurements({
          data: [],
          loading: false,
          error: error.message,
        });
      }
    })();
  }, []);

  const onApproveClick = async (id) => {
    setPendingProcurements({ ...pendingProcurements, loading: true });
    try {
      await adminService.approveProcurement(id);
      setPendingProcurements({
        data: pendingProcurements.data.filter((item) => item.id !== id),
        loading: false,
        error: null,
      });
      dispatch(showSuccessAlert("Procurement approved successfully"));
      onApprove();
    } catch (error) {
      setPendingProcurements({
        data: pendingProcurements.data,
        loading: false,
        error: error.message,
      });
    }
  };

  const onRejectClick = async (id) => {
    setPendingProcurements({ ...pendingProcurements, loading: true });
    try {
      await adminService.rejectProcurement(id);
      setPendingProcurements({
        data: pendingProcurements.data.filter((item) => item.id !== id),
        loading: false,
        error: null,
      });
      dispatch(showSuccessAlert("Procurement rejected successfully"));
    } catch (error) {
      setPendingProcurements({
        data: pendingProcurements.data,
        loading: false,
        error: error.message,
      });
    }
  };

  return (
    <Stack spacing={3}>
      {pendingProcurements.loading && <LinearProgress />}

      {pendingProcurements.error && (
        <Alert severity="error">{pendingProcurements.error}</Alert>
      )}

      <PendingProcurementsTable
        data={pendingProcurements.data}
        onApproveClick={onApproveClick}
        onRejectClick={onRejectClick}
      />
    </Stack>
  );
}
export default PendingProcurements;
