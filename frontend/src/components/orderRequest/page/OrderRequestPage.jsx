import { Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import purchaseOrderService from "../../../services/purchaseOrder.service";
import OrderRequestTable from "../ui/OrderRequestTable";

function OrderRequestPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [orderRequests, setOrderRequests] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const res = await purchaseOrderService.getAll();
        setOrderRequests(res.data);
      } catch (error) {}
    })();
  }, [dispatch]);

  const onRowOpenClick = (id) => {
    navigate("./" + id);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Order Requests</Typography>

      <OrderRequestTable data={orderRequests} onRowOpenClick={onRowOpenClick} />
    </Stack>
  );
}
export default OrderRequestPage;
