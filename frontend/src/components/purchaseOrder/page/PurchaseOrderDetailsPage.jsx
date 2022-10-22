import {
  Button,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { currencyFormatter } from "../../../utils/utilities";
import {
  confirmDelivery,
  getPurchaseOrder,
} from "../../../redux/actions/purchaseOrder.action";
import PurchaseOrderProductTable from "../ui/PurchaseOrderProductTable";

function PurchaseOrderDetailsPage() {
  const dispatch = useDispatch();

  const { purchaseOrder, loading } = useSelector(
    (state) => state.purchaseOrderDetails
  );

  const { purchaseOrderId } = useParams();

  useEffect(() => {
    dispatch(getPurchaseOrder(purchaseOrderId));
  }, [dispatch, purchaseOrderId]);

  const onDeliveryReceiveConfirmClick = () => {
    dispatch(confirmDelivery(purchaseOrderId));
  };

  return (
    <Stack spacing={2}>
      {loading && <LinearProgress />}

      {purchaseOrder?.status !== "Delivery Completed" && (
        <Button
          variant="contained"
          sx={{ alignSelf: "flex-start" }}
          onClick={onDeliveryReceiveConfirmClick}
        >
          Confirm Delivery Receive
        </Button>
      )}

      <Typography variant="h5">Order #{purchaseOrder?.id}</Typography>

      <Paper variant="outlined">
        <Stack p={3} spacing={3}>
          <Typography variant={"body1"}>
            Order Title: <strong>{purchaseOrder?.procurement?.title}</strong>
          </Typography>

          <Divider />

          <Typography variant={"body1"}>
            Order Category: <strong>{purchaseOrder?.category}</strong>
          </Typography>

          <Divider />

          <Typography variant={"body1"}>
            Order Date:{" "}
            <strong>
              {moment(purchaseOrder?.createdAt).format("MMM Do, YYYY")}
            </strong>
          </Typography>

          <Divider />

          <Typography variant={"body1"}>
            Delivery Deadling:{" "}
            <strong>
              {moment(purchaseOrder?.deliveryDeadline).format("MMM Do, YYYY")}
            </strong>
          </Typography>

          <Divider />

          <Typography variant={"body1"}>
            Delivery Date:{" "}
            <strong>
              {purchaseOrder?.deliveryDate
                ? moment(purchaseOrder?.deliveryDate).format("MMM Do, YYYY")
                : "N/A"}
            </strong>
          </Typography>

          <Divider />

          <Typography variant={"body1"}>
            Subtotal Price:{" "}
            <strong>
              {currencyFormatter().format(purchaseOrder?.totalPrice)}
            </strong>
          </Typography>
        </Stack>
      </Paper>
      <Typography variant="h6" sx={{ pt: 3 }}>
        Product List
      </Typography>

      <PurchaseOrderProductTable data={purchaseOrder?.products} />
    </Stack>
  );
}

export default PurchaseOrderDetailsPage;
