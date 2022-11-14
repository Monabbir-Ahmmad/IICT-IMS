import { Alert, LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import purchaseOrderService from "../../../services/purchaseOrder.service";
import SearchFilter from "../../shared/searchFilter/SearchFilter";
import PurchaseOrderTable from "../ui/PurchaseOrderTable";

function PurchaseOrderPage() {
  const navigate = useNavigate();

  const [purchaseOrders, setPurchaseOrders] = useState({
    data: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await purchaseOrderService.getAll();
        setPurchaseOrders({
          data: res.data,
          loading: false,
          error: null,
        });
      } catch (error) {
        setPurchaseOrders({
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
      <Typography variant="h5">Purchase Orders</Typography>

      {purchaseOrders.loading && <LinearProgress />}

      {purchaseOrders.error && (
        <Alert severity="error">{purchaseOrders.error}</Alert>
      )}

      <div>
        <SearchFilter />
        <PurchaseOrderTable
          data={purchaseOrders.data}
          onRowOpenClick={onRowOpenClick}
        />
      </div>
    </Stack>
  );
}
export default PurchaseOrderPage;
