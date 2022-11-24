import {
  Alert,
  Button,
  Chip,
  Divider,
  InputAdornment,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { MdPublish as SendQuotationIcon } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getProcurement } from "../../../redux/actions/procurement.actions";
import { createQuotation } from "../../../redux/actions/quotation.actions";
import { currencyFormatter, statusColors } from "../../../utils/utilities";
import QuotationOfferProductTable from "../ui/QuotationOfferProductTable";

function QuotationDetailsPage() {
  const dispatch = useDispatch();
  const { procurementId } = useParams();

  const { userAuth } = useSelector((state) => state.userLogin);
  const procurementDetails = useSelector((state) => state.procurementDetails);
  const quotationCreate = useSelector((state) => state.quotationCreate);
  const [quoteOffered, setQuoteOffered] = useState(null);

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

  useEffect(() => {
    if (procurementDetails?.procurement?.quotations) {
      setQuoteOffered(
        procurementDetails.procurement.quotations.find(
          (quotation) => quotation.supplier.id === Number(userAuth.id)
        )
      );
    }
  }, [procurementDetails.procurement, userAuth]);

  const onSubmit = (values) => {
    dispatch(
      createQuotation({ ...values, procurementId, supplierId: userAuth.id })
    );
  };

  const getStatus = useCallback(() => {
    if (quoteOffered?.accepted) return "Offer Accepted";
    else if (quoteOffered) return "Offer Sent";
    else return "Not Offered";
  }, [quoteOffered]);

  return (
    <Stack spacing={3}>
      {(procurementDetails.loading || quotationCreate.loading) && (
        <LinearProgress />
      )}

      {procurementDetails.error && (
        <Alert severity="error">{procurementDetails.error}</Alert>
      )}

      {!quoteOffered && (
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

      <Typography variant="h5">
        Quote Details{" "}
        <Chip
          variant="outlined"
          label={getStatus()}
          color={statusColors[getStatus()]}
        />
      </Typography>

      <Stack width={1} spacing={3} direction={{ xs: "column", lg: "row" }}>
        <Paper variant="outlined" sx={{ flex: 1 }}>
          <Stack p={3} spacing={3}>
            <Typography variant="h6">Procurement Details</Typography>

            <Divider />

            <Typography variant={"body1"}>
              Procurement ID:{" "}
              <strong>{procurementDetails.procurement?.id}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Procurement Title:{" "}
              <strong>{procurementDetails.procurement?.title}</strong>
            </Typography>
            <Typography variant={"body1"}>
              Issuing Date:{" "}
              <strong>
                {moment(procurementDetails.procurement?.createdAt).format(
                  "MMM Do, YYYY"
                )}
              </strong>
            </Typography>
            <Typography variant={"body1"}>
              Tender Deadling:{" "}
              <strong>
                {moment(procurementDetails.procurement?.deadline).format(
                  "MMM Do, YYYY"
                )}
              </strong>
            </Typography>
            <Typography variant={"body1"}>
              Estimated Total Price:{" "}
              <strong>
                {currencyFormatter().format(
                  procurementDetails.procurement?.estimatedTotalPrice
                )}
              </strong>
            </Typography>

            <Typography variant={"body1"}>
              Your Quoted Total Price:{" "}
              <strong>
                {procurementDetails.procurement?.quotations.find(
                  (quotation) => quotation.supplier.id === Number(userAuth.id)
                )
                  ? currencyFormatter().format(
                      procurementDetails.procurement?.quotations.find(
                        (quotation) =>
                          quotation.supplier.id === Number(userAuth.id)
                      )?.quotedTotalPrice
                    )
                  : "N/A"}
              </strong>
            </Typography>
          </Stack>
        </Paper>

        <Paper variant="outlined" sx={{ flex: 1 }}>
          <Stack p={3} spacing={3}>
            <Typography variant="h6">Procurement Created By</Typography>

            <Divider />

            <Typography variant={"body1"}>
              Name:{" "}
              <strong>
                {procurementDetails.procurement?.createdBy?.username}
              </strong>
            </Typography>

            <Typography variant={"body1"}>
              Email:{" "}
              <strong>
                {procurementDetails.procurement?.createdBy?.email}
              </strong>
            </Typography>

            <Typography variant={"body1"}>
              Contact Number:{" "}
              <strong>
                {procurementDetails.procurement?.createdBy?.contactNumber}
              </strong>
            </Typography>

            <Typography variant={"body1"}>
              Role:{" "}
              <strong>{procurementDetails.procurement?.createdBy?.role}</strong>
            </Typography>

            <Typography variant={"body1"}>
              Designation:{" "}
              <strong>
                {procurementDetails.procurement?.createdBy?.designation}
              </strong>
            </Typography>
          </Stack>
        </Paper>
      </Stack>
      <Typography variant="h6" sx={{ pt: 3 }}>
        Product List
      </Typography>
      <QuotationOfferProductTable
        data={procurementDetails.procurement?.products}
      />
    </Stack>
  );
}
export default QuotationDetailsPage;
