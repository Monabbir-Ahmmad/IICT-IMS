import { TbTruckDelivery as DeliveryIcon } from "react-icons/tb";
import {
  Button,
  Divider,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { currencyFormatter } from "../../../utils/utilities";
import OrderDeliveryProductTable from "../ui/OrderDeliveryProductTable";
import OrderDeliveryProductInfoAdder from "../ui/OrderDeliveryProductInfoAdder";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import {
  getPurchaseOrder,
  sendDelivery,
} from "../../../redux/actions/purchaseOrder.action";
import { showErrorAlert } from "../../../redux/actions/alertSnackbar.actions";

function OrderRequestDeliveryPage() {
  const dispatch = useDispatch();

  const { purchaseOrder, loading } = useSelector(
    (state) => state.singlePurchaseOrder
  );

  const { success } = useSelector((state) => state.deliverPurchaseOrder);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      deliveryDate: "",
    },
  });
  const { purchaseOrderId } = useParams();

  // const [orderRequest, setOrderRequest] = useState({});
  const [orderedProducts, setOrderedProducts] = useState([]);
  const [productToEdit, setProductToEdit] = useState({});
  const [openProductEditDialog, setOpenProductEditDialog] = useState(false);

  useEffect(() => {
    dispatch(getPurchaseOrder(purchaseOrderId));
  }, [dispatch, purchaseOrderId]);

  useEffect(() => {
    if (purchaseOrder) {
      setOrderedProducts(purchaseOrder.procurement.products);
    }
  }, [purchaseOrder]);

  useEffect(() => {
    if (success) {
      reset();
    }
  }, [success, reset]);

  const onEditProductClick = (product) => {
    console.log(product);
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
      purchaseOrder.quotation.quotedTotalPrice
    )
      dispatch(
        sendDelivery({ ...values, purchaseOrderId, products: orderedProducts })
      );
    else
      dispatch(
        showErrorAlert(
          "Total price of the products should be equal to the quoted total price"
        )
      );
  };

  return (
    <Stack spacing={2}>
      {purchaseOrder.status === "Pending" && (
        <form onSubmit={handleSubmit(onDeliverySubmit)}>
          <Stack spacing={3} alignItems={"start"}>
            <Button
              variant="contained"
              type="submit"
              startIcon={<DeliveryIcon />}
              disabled={orderedProducts?.some((p) => !p.unitPrice)}
            >
              Send Order Delivery
            </Button>

            <Controller
              name="deliveryDate"
              control={control}
              rules={{ required: "Delivery date is required" }}
              render={({ field, fieldState }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    disablePast
                    label="Delivery Date"
                    value={field.value}
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

      <Typography variant="h6">Order Details</Typography>

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
            Quoted Total Price:{" "}
            <strong>
              {currencyFormatter().format(
                purchaseOrder?.quotation?.quotedTotalPrice
              )}
            </strong>
          </Typography>
        </Stack>
      </Paper>
      <Typography variant="h6" sx={{ pt: 3 }}>
        Product List
      </Typography>
      <OrderDeliveryProductTable
        data={orderedProducts}
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

export default OrderRequestDeliveryPage;
