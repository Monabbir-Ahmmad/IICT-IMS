import { Alert, LinearProgress, Stack } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { showSuccessAlert } from "../../../redux/actions/alertSnackbar.actions";
import adminService from "../../../services/admin.service";
import PendingPurchaseOrdersTable from "./PendingPurchaseOrdersTable";

function PendingPurchaseOrders({ onChange }) {
  const navigate = useNavigate();
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
      onChange();
    } catch (error) {
      setPendingPurchaseOrders({
        data: pendingPurchaseOrders.data,
        loading: false,
        error: error.message,
      });
    }
  };

  const onRejectClick = async (id) => {
    setPendingPurchaseOrders({ ...pendingPurchaseOrders, loading: true });
    try {
      await adminService.rejectPurchaseOrder(id);
      setPendingPurchaseOrders({
        data: pendingPurchaseOrders.data.filter((item) => item.id !== id),
        loading: false,
        error: null,
      });
      dispatch(showSuccessAlert("Purchase order rejected successfully"));
      onChange();
    } catch (error) {
      setPendingPurchaseOrders({
        data: pendingPurchaseOrders.data,
        loading: false,
        error: error.message,
      });
    }
  };

  const onRowClick = (id) => {
    navigate(`/purchase-orders/${id}`);
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
        onRejectClick={onRejectClick}
        onRowClick={onRowClick}
      />
    </Stack>
  );
}
export default PendingPurchaseOrders;
