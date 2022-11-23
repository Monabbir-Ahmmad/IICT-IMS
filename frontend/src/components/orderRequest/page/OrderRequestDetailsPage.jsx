import { TbTruckDelivery as DeliveryIcon } from "react-icons/tb";
import {
  Button,
  Chip,
  Divider,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { currencyFormatter, statusColors } from "../../../utils/utilities";
import OrderDeliveryProductTable from "../ui/OrderDeliveryProductTable";
import OrderDeliveryProductInfoAdder from "../ui/OrderDeliveryProductInfoAdder";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  getOrderRequest,
  confirmOrderReceive,
} from "../../../redux/actions/purchaseOrder.action";
import { showErrorAlert } from "../../../redux/actions/alertSnackbar.actions";

function OrderRequestDetailsPage() {
  const dispatch = useDispatch();

  const { purchaseOrder, loading } = useSelector(
    (state) => state.purchaseOrderDetails
  );

  const { success, loading: deliveryLoading } = useSelector(
    (state) => state.deliverPurchaseOrder
  );

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      deliveryDate: "",
    },
  });

  const { purchaseOrderId } = useParams();

  const [orderedProducts, setOrderedProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState({});
  const [openProductEditDialog, setOpenProductEditDialog] = useState(false);

  useEffect(() => {
    dispatch(getOrderRequest(purchaseOrderId));
  }, [dispatch, purchaseOrderId]);

  useEffect(() => {
    if (purchaseOrder) {
      setOrderedProducts(purchaseOrder.products);
    }
  }, [purchaseOrder]);

  useEffect(() => {
    if (success) {
      reset();
    }
  }, [success, reset]);

  const onEditProductClick = (product) => {
    setProductToEdit(product);
    setOpenProductEditDialog(true);
  };

  const onProductEditSubmit = (value) => {
    setOrderedProducts(
      orderedProducts.map((p) =>
        p.id === productToEdit.id
          ? { ...p, ...value, totalPrice: value?.unitPrice * p.quantity }
          : p
      )
    );

    setOpenProductEditDialog(false);
  };

  const onDeliverySubmit = (values) => {
    if (
      orderedProducts.reduce((acc, p) => acc + p.totalPrice, 0) ===
      purchaseOrder.totalPrice
    )
      dispatch(
        confirmOrderReceive({
          ...values,
          purchaseOrderId,
          products: orderedProducts,
        })
      );
    else
      dispatch(
        showErrorAlert(
          "Total price of the products should be equal to the order total price"
        )
      );
  };

  return (
    <Stack spacing={2}>
      {(loading || deliveryLoading) && <LinearProgress />}

      {purchaseOrder?.status === "Pending" && (
        <form onSubmit={handleSubmit(onDeliverySubmit)}>
          <Stack spacing={3} alignItems={"start"}>
            <Button
              variant="contained"
              type="submit"
              startIcon={<DeliveryIcon />}
              disabled={orderedProducts?.some((p) => !p.unitPrice)}
            >
              Confirm Order Receive
            </Button>

            <Controller
              name="deliveryDate"
              control={control}
              rules={{ required: "Delivery date is required" }}
              render={({ field, fieldState }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Delivery Date"
                    value={field.value}
                    disablePast
                    maxDate={new Date(purchaseOrder?.deliveryDeadline)}
                    onChange={(newValue) =>
                      field.onChange(newValue?.format("YYYY-MM-DD"))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant={"outlined"}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{
                          maxWidth: 500,
                          width: "100%",
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </Stack>
        </form>
      )}

      <Typography variant="h5">
        Order #{purchaseOrder?.id}{" "}
        <Chip
          variant="outlined"
          label={purchaseOrder?.status}
          color={statusColors[purchaseOrder?.status]}
        />
      </Typography>

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
              Delivery Date:{" "}
              <strong>
                {purchaseOrder?.deliveryDate
                  ? moment(purchaseOrder?.deliveryDate).format("MMM Do, YYYY")
                  : "N/A"}
              </strong>
            </Typography>

            <Typography variant={"body1"}>
              Subtotal Price:{" "}
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
      </Stack>

      <Typography variant="h6" sx={{ pt: 3 }}>
        Product List
      </Typography>
      <OrderDeliveryProductTable
        data={orderedProducts}
        deliveryNotSent={purchaseOrder?.status === "Pending"}
        onEditProductClick={onEditProductClick}
      />

      <OrderDeliveryProductInfoAdder
        open={openProductEditDialog}
        product={productToEdit}
        onCancel={() => setOpenProductEditDialog(false)}
        onSubmit={onProductEditSubmit}
      />
    </Stack>
  );
}

export default OrderRequestDetailsPage;
