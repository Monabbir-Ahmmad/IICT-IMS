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
import { getAllProductCategories } from "../../../redux/actions/productCategory.actions";
import { createProcurement } from "../../../redux/actions/procurement.actions";

function ProcurementCreatePage() {
  const dispatch = useDispatch();

  const { productCategories } = useSelector(
    (state) => state.productCategoryList
  );

  const { loading, success, error } = useSelector(
    (state) => state.procurementCreate
  );

  const { handleSubmit, control, formState, reset } = useForm({
    defaultValues: {
      title: "",
      tenderDeadline: "",
      procurementCategoryId: "",
    },
  });
  const [openAddNew, setOpenAddNew] = useState(false);

  const [products, setProducts] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  useEffect(() => {
    dispatch(getAllProductCategories());
  }, [dispatch]);

  useEffect(() => {
    if (success) {
      reset();
      setProducts([]);
      setSelectedRows([]);
    }
  }, [success, reset]);

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

  const onRowSelectionChange = (newSelectedRows) => {
    setSelectedRows(newSelectedRows);
  };

  const onDeleteSelected = () => {
    setProducts(products.filter((item) => !selectedRows.includes(item.id)));
    setSelectedRows([]);
  };

  const onSubmit = (data) => {
    console.log({
      ...data,
      estimatedTotalPrice: products.reduce(
        (acc, item) => acc + item.estimatedTotalPrice,
        0
      ),
      products,
    });

    dispatch(
      createProcurement({
        ...data,
        estimatedTotalPrice: products.reduce(
          (acc, item) => acc + item.estimatedTotalPrice,
          0
        ),
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
            mb={2}
            justifyContent={"space-between"}
          >
            <Typography variant="subtitle1">
              Total Estimated Price:{" "}
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
          <Stack direction={{ xs: "column", lg: "row" }} spacing={4}>
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
              name="tenderDeadline"
              control={control}
              rules={{ required: "Tender deadline is required" }}
              render={({ field, fieldState }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    disablePast
                    label="Tender Deadline"
                    value={field.value}
                    onChange={(newValue) => field.onChange(newValue)}
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
        </Paper>
      </form>

      <ProcurementProductAdder
        open={openAddNew}
        onSubmit={onAddNewProductSubmit}
        onCancel={() => setOpenAddNew(false)}
      />

      <Typography variant="h6" sx={{ pt: 3 }}>
        Product List
      </Typography>

      <Paper variant="outlined">
        <ProcurementProductTable
          data={products}
          selectedRows={selectedRows}
          onAddNewRowClick={() => setOpenAddNew(true)}
          onRowSelectionChange={onRowSelectionChange}
          onSelectedRowDeleteClick={onDeleteSelected}
        />
      </Paper>
    </Stack>
  );
}

export default ProcurementCreatePage;
