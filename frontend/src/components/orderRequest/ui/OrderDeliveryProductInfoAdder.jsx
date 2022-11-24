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
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";

function OrderDeliveryProductInfoAdder({ open, product, onSubmit, onCancel }) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      unitPrice: "",
      warrantyExpiryDate: null,
    },
  });

  useEffect(() => {
    reset();
  }, [open, reset]);
  return (
    <Dialog
      fullWidth
      maxWidth={"sm"}
      scroll={"paper"}
      open={open}
      onClose={onCancel}
      PaperProps={{
        sx: { bgcolor: "background.paper", backgroundImage: "none" },
      }}
    >
      <DialogTitle>Product Info</DialogTitle>

      <DialogContent dividers>
        <form id="delivery-product-form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} pt={2}>
            <Typography variant="body1">
              Name: <strong>{product?.name}</strong>
            </Typography>

            <Typography variant="body1">
              Manufacturer: <strong>{product?.manufacturer}</strong>
            </Typography>

            <Typography variant="body1">
              Details: <strong>{product?.details}</strong>
            </Typography>

            <Typography variant="body1">
              Quantity: <strong>{product?.quantity}</strong>
            </Typography>

            <Controller
              name="warrantyExpiryDate"
              control={control}
              render={({ field, fieldState }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    disablePast
                    label="Warranty Expiry Date"
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
                        sx={{ flex: 1 }}
                        inputProps={{ ...params.inputProps, readOnly: true }}
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />

            <Controller
              name="unitPrice"
              control={control}
              rules={{
                required: "Unit price is required",
                pattern: {
                  value: /^(?:[1-9]\d*|0(?!(?:\.0+)?$))?(?:\.\d+)?$/,
                  message: "Invalid unit price",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Unit Price"
                  variant="outlined"
                  fullWidth
                  type={"number"}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />
          </Stack>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        <Button type="submit" form="delivery-product-form">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}
export default OrderDeliveryProductInfoAdder;
