import { LinearProgress, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getPurchaseOrders } from "../../../redux/actions/purchaseOrder.action";
import PurchaseOrderTable from "../ui/PurchaseOrderTable";

function PurchaseOrderPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { purchaseOrders, loading } = useSelector(
    (state) => state.purchaseOrders
  );

  useEffect(() => {
    dispatch(getPurchaseOrders());
  }, [dispatch]);

  const onRowOpenClick = (id) => {
    navigate("./" + id);
  };

  return (
    <Stack spacing={2}>
      <Typography variant="h5">Purchase Orders</Typography>

      {loading && <LinearProgress />}

      <PurchaseOrderTable
        data={purchaseOrders}
        onRowOpenClick={onRowOpenClick}
      />
    </Stack>
  );
}
export default PurchaseOrderPage;
