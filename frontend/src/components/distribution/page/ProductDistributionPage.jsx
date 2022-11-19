import {
  Alert,
  Autocomplete,
  Box,
  Button,
  LinearProgress,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { RiUploadFill as DistributeIcon } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { distributeInventory } from "../../../redux/actions/inventory.actions";
import autoCompleteService from "../../../services/autoComplete.service";
import inventoryService from "../../../services/inventory.service";
import { inventoryFilterDef } from "../../shared/searchFilter/filterData";
import SearchFilter from "../../shared/searchFilter/SearchFilter";
import DistribuableProductsTable from "../ui/DistributableProductsTable";
import DistributingProductsTable from "../ui/DistributingProductsTable";

function ProductDistributionPage() {
  const dispatch = useDispatch();

  const { loading: distributionLoading, success } = useSelector(
    (state) => state.distributeInventory
  );

  const { handleSubmit, control, formState, reset } = useForm({
    defaultValues: {
      distributedToId: "",
      distributionDate: moment().format("YYYY-MM-DD"),
      distributionRoom: "",
    },
  });

  const [distributableProducts, setDistributableProducts] = useState([]);
  const [distributingProducts, setDistributingProducts] = useState([]);
  const [distributees, setDistributees] = useState([]);

  const [filter, setFilter] = useState();
  const [sort, setSort] = useState();
  const [pagination, setPagination] = useState({
    pageNumber: 0,
  });

  useEffect(() => {
    getDistributableInventory();
  }, [filter, sort, pagination]);

  useEffect(() => {
    setPagination({ pageNumber: 0 });
  }, [filter, sort]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await autoCompleteService.getUsers();
        setDistributees(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (success) {
      reset();
      setDistributingProducts([]);
    }
  }, [success, reset]);

  const onSortChange = (sortModel) => {
    setSort({
      sortColumn: inventoryFilterDef.find(
        (f) => f.field === sortModel[0]?.field
      )?.key,
      sortDirection: sortModel[0]?.sort,
    });
  };

  const onFilterApply = (filter) => {
    setFilter(filter);
  };

  const onFilterClear = () => {
    setFilter(null);
  };

  const onPageChange = (page) => {
    setPagination({
      pageNumber: page,
    });
  };

  const getDistributableInventory = async () => {
    try {
      const { data } = await inventoryService.getDistributable(
        filter,
        sort,
        pagination.pageNumber
      );
      setDistributableProducts({
        data: data.data?.filter(
          (x) => !distributingProducts.find((y) => y.id === x.id)
        ),
        rowCount: data.rowCount,
        loading: false,
        error: null,
      });
    } catch (error) {
      setDistributableProducts({
        data: [],
        rowCount: 0,
        loading: false,
        error: error.message,
      });
    }
  };

  const onAddProductsClick = (selectedItems) => {
    setDistributingProducts(
      distributingProducts.concat(
        distributableProducts.data
          .filter((item) => selectedItems.includes(item.id))
          .concat(distributingProducts)
      )
    );

    setDistributableProducts({
      ...distributableProducts,
      data: distributableProducts.data.filter(
        (item) => !selectedItems.includes(item.id)
      ),
    });
  };

  const onRemoveProductsClick = (selectedItems) => {
    setDistributableProducts({
      ...distributableProducts,
      data: distributingProducts
        .filter((item) => selectedItems.includes(item.id))
        .concat(distributableProducts.data),
    });
    setDistributingProducts(
      distributingProducts.filter((item) => !selectedItems.includes(item.id))
    );
  };

  const onSubmit = (data) => {
    dispatch(distributeInventory({ ...data, products: distributingProducts }));
  };

  return (
    <Stack spacing={3}>
      {distributionLoading && <LinearProgress />}

      {distributableProducts.error && (
        <Alert severity="error">{distributableProducts.error}</Alert>
      )}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          type="submit"
          disabled={distributingProducts.length === 0 || !formState.errors}
          variant="contained"
          startIcon={<DistributeIcon />}
          sx={{ justifySelf: "end", mb: 3 }}
        >
          Distribute Products
        </Button>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
            <Controller
              name="distributionDate"
              control={control}
              rules={{ required: "Distribution date is required" }}
              render={({ field, fieldState }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    disableFuture
                    label="Distribution Date"
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
                      />
                    )}
                  />
                </LocalizationProvider>
              )}
            />

            <Controller
              name="distributedToId"
              control={control}
              rules={{ required: "Distributee is required" }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  onChange={(event, newValue) => field.onChange(newValue?.id)}
                  options={distributees}
                  getOptionLabel={(option) => option.username || ""}
                  sx={{ flex: 2 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Distribute To"
                      variant="outlined"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
            />

            <Controller
              name="distributionRoom"
              control={control}
              render={({ field, fieldState }) => (
                <TextField
                  {...field}
                  label="Distribution Room Number"
                  variant="outlined"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{ flex: 1 }}
                />
              )}
            />
          </Stack>
        </Paper>
      </form>

      <Box>
        <Typography variant="h6" sx={{ my: 2 }}>
          Distributing Products
        </Typography>
        <DistributingProductsTable
          data={distributingProducts}
          onRemoveProductsClick={onRemoveProductsClick}
        />
      </Box>

      <div>
        <Typography variant="h6" sx={{ my: 2 }}>
          Distributable Products
        </Typography>

        <SearchFilter
          filterDef={inventoryFilterDef}
          onApply={onFilterApply}
          onClear={onFilterClear}
        />
        <DistribuableProductsTable
          loading={distributableProducts.loading}
          data={distributableProducts.data}
          onAddProductsClick={onAddProductsClick}
          onSortChange={onSortChange}
          onPageChange={onPageChange}
          pageNumber={pagination.pageNumber}
          rowCount={distributableProducts.rowCount}
          pageSize={20}
        />
      </div>
    </Stack>
  );
}
export default ProductDistributionPage;
