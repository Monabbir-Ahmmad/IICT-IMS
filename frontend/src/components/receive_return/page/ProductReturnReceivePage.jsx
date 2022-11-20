import {
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
import { RiDownloadFill as ReceiveIcon } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { receiveReturnInventory } from "../../../redux/actions/inventory.actions";
import autoCompleteService from "../../../services/autoComplete.service";
import inventoryService from "../../../services/inventory.service";
import { distributableInventoryFilterDef } from "../../shared/searchFilter/filterData";
import SearchFilter from "../../shared/searchFilter/SearchFilter";
import ReceivableProductsTable from "../ui/ReceivableProductsTable";
import ReceivingProductsTable from "../ui/ReceivingProductsTable";

function ProductReturnReceivePage() {
  const dispatch = useDispatch();

  const { loading: receiveReturnLoading, success } = useSelector(
    (state) => state.receiveReturnInventory
  );

  const { handleSubmit, control, formState, reset } = useForm({
    defaultValues: {
      receivedFromId: "",
      receivingDate: moment().format("YYYY-MM-DD"),
    },
  });

  const [receivableProducts, setReceivableProducts] = useState([]);
  const [receivingingProducts, setReceivingProducts] = useState([]);
  const [receiveFrom, setReceiveFrom] = useState([]);

  const [filter, setFilter] = useState();
  const [sort, setSort] = useState();
  const [pagination, setPagination] = useState({
    pageNumber: 0,
  });

  useEffect(() => {
    getReceivableInventory();
  }, [filter, sort, pagination]);

  useEffect(() => {
    setPagination({ pageNumber: 0 });
  }, [filter, sort]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await autoCompleteService.getUsers();
        setReceiveFrom(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    if (success) {
      reset();
      setReceivingProducts([]);
    }
  }, [success, reset]);

  const onSortChange = (sortModel) => {
    setSort({
      sortColumn: distributableInventoryFilterDef.find(
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

  const getReceivableInventory = async () => {
    setReceivableProducts({
      ...receivableProducts,
      loading: true,
      error: null,
    });

    try {
      const { data } = await inventoryService.getReceivable(
        filter,
        sort,
        pagination.pageNumber
      );
      setReceivableProducts({
        data: data.data?.filter(
          (x) => !receivingingProducts.find((y) => y.id === x.id)
        ),
        rowCount: data.rowCount,
        loading: false,
        error: null,
      });
    } catch (error) {
      setReceivableProducts({
        data: [],
        rowCount: 0,
        loading: false,
        error: error.message,
      });
    }
  };

  const onAddProductsClick = (selectedItems) => {
    setReceivingProducts(
      receivingingProducts.concat(
        receivableProducts.data.filter((item) =>
          selectedItems.includes(item.id)
        )
      )
    );

    setReceivableProducts({
      ...receivableProducts,
      data: receivableProducts.data.filter(
        (item) => !selectedItems.includes(item.id)
      ),
    });
  };

  const onRemoveProductsClick = (selectedItems) => {
    setReceivableProducts({
      ...receivableProducts,
      data: receivingingProducts
        .filter((item) => selectedItems.includes(item.id))
        .concat(receivableProducts.data),
    });
    setReceivingProducts(
      receivingingProducts.filter((item) => !selectedItems.includes(item.id))
    );
  };

  const onSubmit = (data) => {
    dispatch(
      receiveReturnInventory({ ...data, products: receivingingProducts })
    );
  };

  return (
    <Stack spacing={3}>
      {receiveReturnLoading && <LinearProgress />}

      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          type="submit"
          disabled={receivingingProducts.length === 0 || !formState.errors}
          variant="contained"
          startIcon={<ReceiveIcon />}
          sx={{ justifySelf: "end", mb: 3 }}
        >
          Receive Products
        </Button>

        <Paper variant="outlined" sx={{ p: 3 }}>
          <Stack direction={{ xs: "column", lg: "row" }} spacing={3}>
            <Controller
              name="receivingDate"
              control={control}
              rules={{ required: "Receiving date is required" }}
              render={({ field, fieldState }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    disableFuture
                    label="Receiving Date"
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
              name="receivedFromId"
              control={control}
              rules={{ required: "Receive from is required" }}
              render={({ field, fieldState }) => (
                <Autocomplete
                  onChange={(event, newValue) => field.onChange(newValue?.id)}
                  options={receiveFrom}
                  getOptionLabel={(option) => option.username || ""}
                  sx={{ flex: 1 }}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Received From"
                      variant="outlined"
                      error={!!fieldState.error}
                      helperText={fieldState.error?.message}
                    />
                  )}
                />
              )}
            />
          </Stack>
        </Paper>
      </form>

      <Box>
        <Typography variant="h6" sx={{ my: 2 }}>
          Receiving Products
        </Typography>
        <ReceivingProductsTable
          data={receivingingProducts}
          onRemoveProductsClick={onRemoveProductsClick}
        />
      </Box>

      <div>
        <Typography variant="h6" sx={{ my: 2 }}>
          Receivable Products
        </Typography>

        <SearchFilter
          filterDef={distributableInventoryFilterDef}
          onApply={onFilterApply}
          onClear={onFilterClear}
        />
        <ReceivableProductsTable
          loading={receivableProducts.loading}
          data={receivableProducts.data}
          onAddProductsClick={onAddProductsClick}
          onSortChange={onSortChange}
          onPageChange={onPageChange}
          pageNumber={pagination.pageNumber}
          rowCount={receivableProducts.rowCount}
          pageSize={20}
        />
      </div>
    </Stack>
  );
}
export default ProductReturnReceivePage;
