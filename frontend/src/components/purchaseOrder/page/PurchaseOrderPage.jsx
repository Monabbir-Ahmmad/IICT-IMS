import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import purchaseOrderService from "../../../services/purchaseOrder.service";
import PurchaseOrderTable from "../ui/PurchaseOrderTable";

function PurchaseOrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [purchaseOrders, setPurchaseOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await purchaseOrderService.getAll();
        setPurchaseOrders(res.data);
      } catch (error) {}
    })();
  }, [dispatch]);

  const onRowOpenClick = (id) => {
    navigate("./" + id);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Order Requests</Typography>

      <PurchaseOrderTable
        data={purchaseOrders}
        onRowOpenClick={onRowOpenClick}
      />
    </Stack>
  );
}
export default PurchaseOrderPage;
