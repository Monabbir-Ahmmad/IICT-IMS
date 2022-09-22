import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import { Stack } from "@mui/system";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { currencyFormatter } from "../../../utils/utilities";

function QuotationAccepter({ open, quotation, onSubmit, onCancel }) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      deliveryDeadline: "",
    },
  });

  useEffect(() => {
    reset();
  }, [open, reset]);

  return (
    <Dialog
      fullWidth
      maxWidth={"sm"}
      open={open}
      onClose={onCancel}
      PaperProps={{
        sx: { bgcolor: "background.paper", backgroundImage: "none" },
      }}
    >
      <DialogTitle>Create Purchase Order</DialogTitle>

      <DialogContent>
        <form id="accept-quotation-form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} pt={3}>
            <Typography variant="body1">
              Procurement Title: <strong>{quotation?.procurementName}</strong>
            </Typography>

            <Typography variant="body1">
              Supplier BIN: <strong>{quotation?.supplier?.bin}</strong>
            </Typography>

            <Typography variant="body1">
              Supplier Name: <strong>{quotation?.supplier?.companyName}</strong>
            </Typography>

            <Typography variant="body1">
              Supplier Email: <strong>{quotation?.supplier?.email}</strong>
            </Typography>

            <Typography variant="body1">
              Supplier Contact No:{" "}
              <strong>{quotation?.supplier?.contactNumber}</strong>
            </Typography>

            <Typography variant="body1">
              Supplier Address: <strong>{quotation?.supplier?.address}</strong>
            </Typography>

            <Typography variant="body1">
              Quotation Created At:{" "}
              <strong>
                {moment(quotation?.createdAt).format("MMM Do, YYYY")}
              </strong>
            </Typography>

            <Typography variant="body1">
              Order Value:{" "}
              <strong>
                {currencyFormatter().format(quotation?.quotedTotalPrice)}
              </strong>
            </Typography>

            <Controller
              name="deliveryDeadline"
              control={control}
              rules={{ required: "Delivery deadline is required" }}
              render={({ field, fieldState }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    disablePast
                    label="Delivery Deadline"
                    value={field.value}
                    onChange={(newValue) =>
                      field.onChange(newValue.format("YYYY-MM-DD"))
                    }
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant={"outlined"}
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                        sx={{ flex: 1 }}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" form="add-procurement-item-form">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default QuotationAccepter;
