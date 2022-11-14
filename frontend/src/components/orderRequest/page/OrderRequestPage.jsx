import { Alert, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import purchaseOrderService from "../../../services/purchaseOrder.service";
import SearchFilter from "../../shared/searchFilter/SearchFilter";
import OrderRequestTable from "../ui/OrderRequestTable";

function OrderRequestPage() {
  const navigate = useNavigate();

  const [orderRequests, setOrderRequests] = useState({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await purchaseOrderService.getOrderRequestList();
        setOrderRequests({
          data: res.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        setOrderRequests({
          data: [],
          loading: false,
          error: error.message,
        });
      }
    })();
  }, []);

  const onRowOpenClick = (id) => {
    navigate("./" + id);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Order Requests</Typography>

      {orderRequests.loading && <LinearProgress />}

      {orderRequests.error && (
        <Alert severity="error">{orderRequests.error}</Alert>
      )}

      <div>
        <SearchFilter />
        <OrderRequestTable
          data={orderRequests.data}
          onRowOpenClick={onRowOpenClick}
        />
      </div>
    </Stack>
  );
}
export default OrderRequestPage;
