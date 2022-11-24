import {
  Alert,
  Autocomplete,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  Tab,
  Tabs,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import TabPanel from "../../shared/tab/TabPanel";
import autoCompleteService from "../../../services/autoComplete.service";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

function DirectPurchaseProductAdder({ open, onSubmit, onCancel, categoryId }) {
  const [tabValue, setTabValue] = useState(0);
  const [autoCompleteProducts, setAutoCompleteProducts] = useState([]);

  const { handleSubmit, control, reset, watch, setValue } = useForm({
    defaultValues: {
      rowId: Date.now(),
      name: "",
      manufacturer: "",
      quantity: "",
      unitPrice: "",
      details: "",
      warrantyExpiryDate: null,
    },
  });

  const watchExistingProduct = watch("existingProduct");

  useEffect(() => {
    reset({
      rowId: Date.now(),
      name: "",
      manufacturer: "",
      quantity: "",
      unitPrice: "",
      details: "",
      warrantyExpiryDate: null,
    });
  }, [open, reset]);

  useEffect(() => {
    if (categoryId && tabValue === 1 && open) {
      (async () => {
        try {
          const { data } = await autoCompleteService.getProducts(categoryId);
          setAutoCompleteProducts(data);
        } catch (error) {}
      })();

      setValue("existingProduct", null);
    }
  }, [categoryId, open, setValue, tabValue]);

  const onExistingProductSubmit = (data) => {
    onSubmit({
      ...data,
      ...data.existingProduct,
    });
  };

  return (
    <Dialog
      fullWidth
      maxWidth={"md"}
      scroll={"paper"}
      open={open}
      onClose={onCancel}
      PaperProps={{
        sx: { bgcolor: "background.paper", backgroundImage: "none" },
      }}
    >
      <DialogTitle>Add item</DialogTitle>
      <DialogContent dividers>
        {!categoryId && (
          <Alert severity={"warning"} sx={{ mb: 2 }}>
            Please select a category first
          </Alert>
        )}

        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          variant={"fullWidth"}
          scrollButtons="auto"
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label={"Add new item"} />
          <Tab label={"Add existing item"} />
        </Tabs>
        <TabPanel value={tabValue} index={0}>
          <form
            id="add-new-procurement-item-form"
            onSubmit={handleSubmit(onSubmit)}
          >
            <Stack spacing={4} pt={2}>
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
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          <form
            id="add-existing-procurement-item-form"
            onSubmit={handleSubmit(onExistingProductSubmit)}
          >
            <Stack spacing={4} pt={2}>
              <Controller
                name="existingProduct"
                control={control}
                rules={{ required: "Product is required" }}
                render={({ field, fieldState }) => (
                  <Autocomplete
                    onChange={(event, newValue) => field.onChange(newValue)}
                    options={autoCompleteProducts}
                    getOptionLabel={(option) => option.name || ""}
                    sx={{ flex: 2 }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Product"
                        variant="outlined"
                        error={!!fieldState.error}
                        helperText={fieldState.error?.message}
                      />
                    )}
                  />
                )}
              />

              {watchExistingProduct?.id && (
                <>
                  <Typography variant={"body1"}>
                    Product Name: <strong>{watchExistingProduct?.name}</strong>
                  </Typography>

                  <Typography variant={"body1"}>
                    Product Category:{" "}
                    <strong>{watchExistingProduct?.category?.name}</strong>
                  </Typography>

                  <Typography variant={"body1"}>
                    Product Manufacturer:{" "}
                    <strong>{watchExistingProduct?.manufacturer}</strong>
                  </Typography>

                  <Typography variant={"body1"}>
                    Product Details:{" "}
                    <strong>{watchExistingProduct?.details}</strong>
                  </Typography>
                </>
              )}

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
        </TabPanel>
      </DialogContent>
      <DialogActions>
        <Button onClick={onCancel}>Cancel</Button>
        {tabValue === 0 && (
          <Button type="submit" form="add-new-procurement-item-form">
            Confirm
          </Button>
        )}
        {tabValue === 1 && (
          <Button type="submit" form="add-existing-procurement-item-form">
            Confirm
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}

export default DirectPurchaseProductAdder;
