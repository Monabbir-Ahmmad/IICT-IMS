import { MdPublish as UploadIcon } from "react-icons/md";
import {
  Alert,
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
import ProcurementProductAdder from "../ui/ProcurementProductAdder";
import ProcurementProductTable from "../ui/ProcurementProductTable";
import moment from "moment";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { currencyFormatter } from "../../../utils/utilities";
import { createProcurement } from "../../../redux/actions/procurement.actions";
import autoCompleteService from "../../../services/autoComplete.service";

function ProcurementCreatePage() {
  const dispatch = useDispatch();

  const { loading, success, error } = useSelector(
    (state) => state.procurementCreate
  );

  const { handleSubmit, control, formState, reset, watch } = useForm({
    defaultValues: {
      title: "",
      deadline: "",
      procurementCategoryId: "",
    },
  });

  const watchCategory = watch("procurementCategoryId");

  const [openAddNew, setOpenAddNew] = useState(false);
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
    if (success) {
      reset();
      setProducts([]);
    }
  }, [success, reset]);

  useEffect(() => {
    setProducts([]);
  }, [watchCategory]);

  const onAddNewProductSubmit = (newItem) => {
    setProducts([
      ...products,
      {
        ...newItem,
        estimatedTotalPrice: newItem.quantity * newItem.estimatedPrice,
      },
    ]);
    setOpenAddNew(false);
  };

  const onDeleteSelected = (selectedRows) => {
    setProducts(products.filter((item) => !selectedRows.includes(item.rowId)));
  };

  const onSubmit = (data) => {
    dispatch(
      createProcurement({
        ...data,
        products,
      })
    );
  };

  return (
    <Stack spacing={3}>
      {loading && <LinearProgress />}

      {error && <Alert severity="error">{error}</Alert>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          type="submit"
          disabled={products.length === 0 || !formState.errors}
          variant="contained"
          startIcon={<UploadIcon />}
          sx={{ justifySelf: "end", mb: 3 }}
        >
          Publish Procurement
        </Button>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack
            direction={{ xs: "column", lg: "row" }}
            spacing={1}
            mb={3}
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle1">
              Estimated Total Price:{" "}
              <strong>
                {currencyFormatter().format(
                  products.reduce(
                    (acc, item) => acc + item.estimatedTotalPrice,
                    0
                  )
                )}
              </strong>
            </Typography>
            <Typography variant="subtitle1">
              Issue Date:{" "}
              <strong>{moment(Date.now()).format("MMM Do, YYYY")}</strong>
            </Typography>
          </Stack>
          <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
            <Controller
              name="procurementCategoryId"
              control={control}
              rules={{ required: "Procurement category is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  select
                  label="Procurement Category"
                  variant="outlined"
                  placeholder="Select procurement category"
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
              rules={{ required: "Procurement title is required" }}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Procurement Title"
                  variant="outlined"
                  placeholder="Enter procurement title"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{ flex: 2 }}
                />
              )}
            />

            <Controller
              name="deadline"
              control={control}
              rules={{ required: "Tender deadline is required" }}
              render={({ field, fieldState }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    disablePast
                    label="Tender Deadline"
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
        </Paper>
      </form>

      <ProcurementProductAdder
        open={openAddNew}
        onSubmit={onAddNewProductSubmit}
        onCancel={() => setOpenAddNew(false)}
        categoryId={watchCategory}
      />

      <Typography variant="h6" sx={{ pt: 3 }}>
        Product List
      </Typography>

      <ProcurementProductTable
        data={products}
        onAddNewRowClick={() => setOpenAddNew(true)}
        onSelectedRowDeleteClick={onDeleteSelected}
      />
    </Stack>
  );
}

export default ProcurementCreatePage;
