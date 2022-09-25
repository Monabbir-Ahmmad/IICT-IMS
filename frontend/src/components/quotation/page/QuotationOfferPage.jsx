import {
  Alert,
  Button,
  Divider,
  InputAdornment,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdPublish as SendQuotationIcon } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProcurement } from "../../../redux/actions/procurement.actions";
import { createQuotation } from "../../../redux/actions/quotation.actions";
import { currencyFormatter } from "../../../utils/utilities";
import QuotationOfferProductTable from "../ui/QuotationOfferProductTable";

function QuotationOfferPage() {
  const dispatch = useDispatch();
  const { procurementId } = useParams();

  const { userAuth } = useSelector((state) => state.userLogin);
  const singleProcurement = useSelector((state) => state.singleProcurement);
  const quotationCreate = useSelector((state) => state.quotationCreate);

  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      quotedTotalPrice: "",
    },
  });

  useEffect(() => {
    if (procurementId) dispatch(getProcurement(procurementId));
  }, [dispatch, procurementId]);

  useEffect(() => {
    if (quotationCreate.success) reset();
  }, [quotationCreate.success, reset]);

  const onSubmit = (values) => {
    dispatch(
      createQuotation({ ...values, procurementId, supplierId: userAuth.id })
    );
  };

  return (
    <Stack spacing={3}>
      {(singleProcurement.loading || quotationCreate.loading) && (
        <LinearProgress />
      )}

      {singleProcurement.error && (
        <Alert severity="error">{singleProcurement.error}</Alert>
      )}

      {!singleProcurement.procurement?.quotations.find(
        (quotation) => quotation.supplier.id === Number(userAuth.id)
      ) && (
        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={3} alignItems={"start"}>
            <Button
              variant="contained"
              type="submit"
              startIcon={<SendQuotationIcon />}
            >
              Send quotation offer
            </Button>

            <Controller
              name="quotedTotalPrice"
              control={control}
              rules={{
                required: "Total price offer is required",
                pattern: {
                  value: /^(?:[1-9]\d*|0(?!(?:\.0+)?$))?(?:\.\d+)?$/,
                  message: "Invalid price",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  variant="outlined"
                  label="Total price offer"
                  placeholder="Enter total price offer"
                  type={"number"}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{
                    maxWidth: 500,
                    width: "100%",
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">BDT</InputAdornment>
                    ),
                  }}
                />
              )}
            />
          </Stack>
        </form>
      )}

      <Typography variant="h5">Procurement Details</Typography>

      <Paper variant="outlined">
        <Stack p={2} spacing={2}>
          <Typography variant={"body1"}>
            Title: <strong>{singleProcurement.procurement?.title}</strong>
          </Typography>
          <Divider />
          <Typography variant={"body1"}>
            Issuing Date:{" "}
            <strong>
              {moment(singleProcurement.procurement?.createdAt).format(
                "MMM Do, YYYY"
              )}
            </strong>
          </Typography>
          <Divider />
          <Typography variant={"body1"}>
            Tender Deadling:{" "}
            <strong>
              {moment(singleProcurement.procurement?.deadline).format(
                "MMM Do, YYYY"
              )}
            </strong>
          </Typography>
          <Divider />
          <Typography variant={"body1"}>
            Estimated Total Price:{" "}
            <strong>
              {currencyFormatter().format(
                singleProcurement.procurement?.estimatedTotalPrice
              )}
            </strong>
          </Typography>

          <Divider />

          <Typography variant={"body1"}>
            Your Quoted Total Price:{" "}
            <strong>
              {singleProcurement.procurement?.quotations.find(
                (quotation) => quotation.supplier.id === Number(userAuth.id)
              )
                ? currencyFormatter().format(
                    singleProcurement.procurement?.quotations.find(
                      (quotation) =>
                        quotation.supplier.id === Number(userAuth.id)
                    )?.quotedTotalPrice
                  )
                : "N/A"}
            </strong>
          </Typography>
        </Stack>
      </Paper>
      <Typography variant="h6" sx={{ pt: 3 }}>
        Product List
      </Typography>
      <QuotationOfferProductTable
        data={singleProcurement.procurement?.products}
      />
    </Stack>
  );
}
export default QuotationOfferPage;
