import {
  Button,
  Chip,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { currencyFormatter, statusColors } from "../../../utils/utilities";
import {
  confirmDelivery,
  getPurchaseOrder,
} from "../../../redux/actions/purchaseOrder.action";
import PurchaseOrderProductTable from "../ui/PurchaseOrderProductTable";
import { Status } from "../../../constants/enums";
import PurchaseOrderReceiveConfirmer from "../ui/PurchaseOrderReceiveConfirmer";
import ImageViewer from "../../shared/imageViewer/ImageViewer";
import { IMAGE_HOST_URL } from "../../../constants/apiLinks";
import PurchaseOrderPrinter from "../ui/PurchaseOrderPrinter";

function PurchaseOrderDetailsPage() {
  const dispatch = useDispatch();

  const { purchaseOrder, loading } = useSelector(
    (state) => state.purchaseOrderDetails
  );

  const { purchaseOrderId } = useParams();

  const [deliveryReceiveConfirmOpen, setDeliveryReceiveConfirmOpen] =
    useState(false);

  useEffect(() => {
    dispatch(getPurchaseOrder(purchaseOrderId));
  }, [dispatch, purchaseOrderId]);

  const onDeliveryReceiveConfirmClick = (voucherImage) => {
    dispatch(confirmDelivery(purchaseOrderId, voucherImage));
    setDeliveryReceiveConfirmOpen(false);
  };

  return (
    <Stack spacing={2}>
      {loading && <LinearProgress />}

      <PurchaseOrderReceiveConfirmer
        open={deliveryReceiveConfirmOpen}
        onClose={() => setDeliveryReceiveConfirmOpen(false)}
        onConfirm={onDeliveryReceiveConfirmClick}
      />

      {purchaseOrder?.status !== Status.DeliveryCompleted && (
        <Button
          variant="contained"
          sx={{ alignSelf: "flex-start" }}
          onClick={() => setDeliveryReceiveConfirmOpen(true)}
          disabled={purchaseOrder?.status !== Status.OrderAccepted}
        >
          Confirm Delivery Receive
        </Button>
      )}

      <Stack
        spacing={2}
        direction={{ xs: "column", lg: "row" }}
        justifyContent={{ xs: "start", lg: "space-between" }}
        alignItems={{ xs: "start", lg: "center" }}
      >
        <Typography variant="h5">
          Order #{purchaseOrder?.id}{" "}
          <Chip
            variant="outlined"
            label={purchaseOrder?.status}
            color={statusColors[purchaseOrder?.status]}
          />
        </Typography>

        <PurchaseOrderPrinter purchaseOrder={purchaseOrder} />
      </Stack>

      {purchaseOrder?.voucher && (
        <ImageViewer
          image={IMAGE_HOST_URL + purchaseOrder?.voucher?.fileName}
          buttonText="View Voucher"
          title="Voucher"
        />
      )}

      <Stack width={1} spacing={3} direction={{ xs: "column", lg: "row" }}>
        <Paper variant="outlined" sx={{ flex: 1 }}>
          <Stack p={3} spacing={3}>
            <Typography variant="h6">Order Details</Typography>

            <Divider />

            <Typography variant={"body1"}>
              Order Title: <strong>{purchaseOrder?.title}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Order Category: <strong>{purchaseOrder?.category}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Order Date:{" "}
              <strong>
                {moment(purchaseOrder?.createdAt).format("MMM Do, YYYY")}
              </strong>
            </Typography>

            <Typography variant={"body1"}>
              Delivery Deadling:{" "}
              <strong>
                {moment(purchaseOrder?.deliveryDeadline).format("MMM Do, YYYY")}
              </strong>
            </Typography>

            <Typography variant={"body1"}>
              Estimated Delivery Date:{" "}
              <strong>
                {purchaseOrder?.deliveryDate
                  ? moment(purchaseOrder?.deliveryDate).format("MMM Do, YYYY")
                  : "N/A"}
              </strong>
            </Typography>

            <Typography variant={"body1"}>
              Total Price:{" "}
              <strong>
                {currencyFormatter().format(purchaseOrder?.totalPrice)}
              </strong>
            </Typography>
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ flex: 1 }}>
          <Stack p={3} spacing={3}>
            <Typography variant={"h6"}>Created By</Typography>
            <Divider />

            <Typography variant={"body1"}>
              Name: <strong>{purchaseOrder?.createdBy?.username}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Email: <strong>{purchaseOrder?.createdBy?.email}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Contact Number:{" "}
              <strong>{purchaseOrder?.createdBy?.contactNumber}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Role: <strong>{purchaseOrder?.createdBy?.role}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Designation:{" "}
              <strong>{purchaseOrder?.createdBy?.designation}</strong>
            </Typography>
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ flex: 1 }}>
          <Stack p={3} spacing={3}>
            <Typography variant={"h6"}>Supplier Info</Typography>
            <Divider />

            <Typography variant={"body1"}>
              Company Name:{" "}
              <strong>{purchaseOrder?.supplier?.companyName}</strong>
            </Typography>

            <Typography variant={"body1"}>
              BIN: <strong>{purchaseOrder?.supplier?.bin}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Email: <strong>{purchaseOrder?.supplier?.email}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Contact Number:{" "}
              <strong>{purchaseOrder?.supplier?.contactNumber}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Supplier Category:{" "}
              <strong>{purchaseOrder?.supplier?.category}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Address: <strong>{purchaseOrder?.supplier?.address}</strong>
            </Typography>
          </Stack>
        </Paper>
      </Stack>
      <Typography variant="h6" sx={{ pt: 3 }}>
        Product List
      </Typography>

      <PurchaseOrderProductTable data={purchaseOrder?.products} />
    </Stack>
  );
}

export default PurchaseOrderDetailsPage;
