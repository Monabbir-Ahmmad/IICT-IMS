import { MdPublish as UploadIcon } from "react-icons/md";
import {
  Button,
  LinearProgress,
  MenuItem,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Controller, useForm } from "react-hook-form";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { currencyFormatter } from "../../../utils/utilities";
import autoCompleteService from "../../../services/autoComplete.service";
import PurchaseOrderReceiveConfirmer from "../../purchaseOrder/ui/PurchaseOrderReceiveConfirmer";
import directPurchaseService from "../../../services/directPurchase.service";
import {
  showErrorAlert,
  showSuccessAlert,
} from "../../../redux/actions/alertSnackbar.actions";
import DirectPurchaseProductTable from "../ui/DirectPurchaseProductTable";
import DirectPurchaseProductAdder from "../ui/DirectPurchaseProductAdder";

function CreateDirectPurchasePage() {
  const dispatch = useDispatch();

  const { handleSubmit, control, formState, reset, watch, getValues } = useForm(
    {
      defaultValues: {
        title: "",
        purchaseDate: "",
        categoryId: "",
        supplierName: "",
        supplierAddress: "",
        supplierContact: "",
      },
    }
  );

  const watchCategory = watch("categoryId");

  const [openAddNew, setOpenAddNew] = useState(false);
  const [openVoucherAdder, setOpenVoucherAdder] = useState(false);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [productCategories, setProductCategories] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await autoCompleteService.getProductCategories();
        setProductCategories(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    setProducts([]);
  }, [watchCategory]);

  const onAddNewProductSubmit = (newItem) => {
    setProducts([
      ...products,
      {
        ...newItem,
        totalPrice: newItem.quantity * newItem.unitPrice,
      },
    ]);
    setOpenAddNew(false);
  };

  const onDeleteSelected = (selectedRows) => {
    setProducts(products.filter((item) => !selectedRows.includes(item.rowId)));
  };

  const onSubmit = async (voucherImage) => {
    setLoading(true);
    setOpenVoucherAdder(false);
    try {
      await directPurchaseService.create({
        ...getValues(),
        voucherImage,
        products,
      });
      reset();
      setProducts([]);
      dispatch(showSuccessAlert("Direct Purchase Created Successfully"));
    } catch (error) {
      dispatch(showErrorAlert(error.message));
    }
    setLoading(false);
  };

  return (
    <Stack spacing={3}>
      {loading && <LinearProgress />}

      <PurchaseOrderReceiveConfirmer
        open={openVoucherAdder}
        onClose={() => setOpenVoucherAdder(false)}
        onConfirm={onSubmit}
      />

      <form onSubmit={handleSubmit(() => setOpenVoucherAdder(true))}>
        <Button
          type="submit"
          disabled={products.length === 0 || !formState.errors}
          variant="contained"
          startIcon={<UploadIcon />}
          sx={{ justifySelf: "end", mb: 3 }}
        >
          Confirm Direct Purchase
        </Button>

        <Paper
          variant="outlined"
          sx={{ p: 3, display: "flex", flexDirection: "column", gap: 3 }}
        >
          <Typography variant="subtitle1">
            Total Price:{" "}
            <strong>
              {currencyFormatter().format(
                products.reduce((acc, item) => acc + item.totalPrice, 0)
              )}
            </strong>
          </Typography>

          <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
            <Controller
              name="categoryId"
              control={control}
              rules={{ required: "Purchase category is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  label="Purchase Category"
                  variant="outlined"
                  placeholder="Select Purchase category"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{ flex: 1 }}
                >
                  {productCategories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="title"
              control={control}
              rules={{ required: "Purchase title is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Purchase Title"
                  variant="outlined"
                  placeholder="Enter purchase title"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{ flex: 2 }}
                />
              )}
            />

            <Controller
              name="purchaseDate"
              control={control}
              rules={{ required: "Purchasing date is required" }}
              render={({ field, fieldState }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    label="Purchasing Date"
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
          </Stack>

          <Typography variant="subtitle1" sx={{ mt: 2 }}>
            <strong>Supplier Information</strong>
          </Typography>

          <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
            <Controller
              name="supplierName"
              control={control}
              rules={{ required: "Supplier name is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Supplier Name"
                  variant="outlined"
                  placeholder="Enter supplier name"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{ flex: 1 }}
                />
              )}
            />

            <Controller
              name="supplierContact"
              control={control}
              rules={{ required: "Supplier contact number is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Supplier Contact Number"
                  variant="outlined"
                  placeholder="Enter supplier contact number"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{ flex: 1 }}
                />
              )}
            />

            <Controller
              name="supplierAddress"
              control={control}
              rules={{ required: "Supplier address is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Supplier address"
                  variant="outlined"
                  placeholder="Enter supplier address"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{ flex: 1 }}
                />
              )}
            />
          </Stack>
        </Paper>
      </form>

      <DirectPurchaseProductAdder
        open={openAddNew}
        onSubmit={onAddNewProductSubmit}
        onCancel={() => setOpenAddNew(false)}
        categoryId={watchCategory}
      />

      <Typography variant="h6" sx={{ pt: 3 }}>
        Product List
      </Typography>

      <DirectPurchaseProductTable
        data={products}
        onAddNewRowClick={() => setOpenAddNew(true)}
        onSelectedRowDeleteClick={onDeleteSelected}
      />
    </Stack>
  );
}

export default CreateDirectPurchasePage;
