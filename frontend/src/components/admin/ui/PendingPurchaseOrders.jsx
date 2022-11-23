import { Alert, LinearProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { showSuccessAlert } from "../../../redux/actions/alertSnackbar.actions";
import adminService from "../../../services/admin.service";
import PendingPurchaseOrdersTable from "./PendingPurchaseOrdersTable";

function PendingPurchaseOrders({ onApprove }) {
  const dispatch = useDispatch();

  const [pendingPurchaseOrders, setPendingPurchaseOrders] = useState({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await adminService.getPendingPurchaseOrders();
        setPendingPurchaseOrders({
          data: res.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        setPendingPurchaseOrders({
          data: [],
          loading: false,
          error: error.message,
        });
      }
    })();
  }, []);

  const onApproveClick = async (id) => {
    setPendingPurchaseOrders({ ...pendingPurchaseOrders, loading: true });
    try {
      await adminService.approvePurchaseOrder(id);
      setPendingPurchaseOrders({
        data: pendingPurchaseOrders.data.filter((item) => item.id !== id),
        loading: false,
        error: null,
      });
      dispatch(showSuccessAlert("Purchase order approved successfully"));
      onApprove();
    } catch (error) {
      setPendingPurchaseOrders({
        data: pendingPurchaseOrders.data,
        loading: false,
        error: error.message,
      });
    }
  };

  return (
    <Stack spacing={3}>
      {pendingPurchaseOrders.loading && <LinearProgress />}

      {pendingPurchaseOrders.error && (
        <Alert severity="error">{pendingPurchaseOrders.error}</Alert>
      )}

      <PendingPurchaseOrdersTable
        data={pendingPurchaseOrders.data}
        onApproveClick={onApproveClick}
      />
    </Stack>
  );
}
export default PendingPurchaseOrders;
