import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect } from "react";

function ProcurementProductAdder({ open, onSubmit, onCancel }) {
  const { handleSubmit, control, reset } = useForm({
    defaultValues: {
      id: Date.now(),
      name: "",
      manufacturer: "",
      quantity: "",
      estimatedPrice: "",
      details: "",
    },
  });

  useEffect(() => {
    reset({
      id: Date.now(),
      name: "",
      manufacturer: "",
      quantity: "",
      estimatedPrice: "",
      details: "",
    });
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
      <DialogTitle>Add item</DialogTitle>
      <DialogContent>
        <form id="add-procurement-item-form" onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4} pt={3}>
            <Controller
              name="name"
              control={control}
              rules={{ required: "Name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Name"
                  variant="outlined"
                  placeholder="Enter item name"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="manufacturer"
              control={control}
              rules={{ required: "Manufactured is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Manufacturer"
                  variant="outlined"
                  placeholder="Enter manufacturer name"
                  fullWidth
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="details"
              control={control}
              rules={{ required: "Details is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Details"
                  variant="outlined"
                  placeholder="Enter item details"
                  fullWidth
                  multiline
                  rows={4}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="estimatedPrice"
              control={control}
              rules={{
                required: "Estimated price is required",
                pattern: {
                  value: /^(?:[1-9]\d*|0(?!(?:\.0+)?$))?(?:\.\d+)?$/,
                  message: "Invalid estimated price",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Estimated Price"
                  variant="outlined"
                  placeholder="Enter item's estimated price"
                  fullWidth
                  type={"number"}
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                />
              )}
            />

            <Controller
              name="quantity"
              control={control}
              rules={{
                required: "Quantity is required",
                pattern: {
                  value: /^[1-9]\d*$/,
                  message: "Invalid quantity",
                },
              }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Quantity"
                  variant="outlined"
                  placeholder="Enter quantity"
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
        <Button type="submit" form="add-procurement-item-form">
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProcurementProductAdder;
