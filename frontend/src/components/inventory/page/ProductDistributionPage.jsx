import {
  Box,
  Button,
  LinearProgress,
  MenuItem,
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
import {
  distributeInventory,
  getDistributableInventoryList,
} from "../../../redux/actions/inventory.actions";
import autoCompleteService from "../../../services/autoComplete.service";
import DistribuableProductsTable from "../ui/DistributableProductsTable";
import DistributingProductsTable from "../ui/DistributingProductsTable";

function ProductDistributionPage() {
  const dispatch = useDispatch();

  const { inventoryList, loading } = useSelector(
    (state) => state.distributableInventoryList
  );
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

  useEffect(() => {
    (async () => {
      try {
        const { data } = await autoCompleteService.getUsers();
        setDistributees(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);

  useEffect(() => {
    dispatch(getDistributableInventoryList());
  }, [dispatch]);

  useEffect(() => {
    setDistributableProducts(inventoryList);
  }, [inventoryList]);

  useEffect(() => {
    if (success) {
      reset();
      setDistributingProducts([]);
    }
  }, [success, reset]);

  const onAddProductsClick = (selectedItems) => {
    setDistributingProducts(
      distributingProducts.concat(
        distributableProducts
          .filter((item) => selectedItems.includes(item.id))
          .concat(distributingProducts)
      )
    );
    setDistributableProducts(
      distributableProducts.filter((item) => !selectedItems.includes(item.id))
    );
  };

  const onRemoveProductsClick = (selectedItems) => {
    setDistributableProducts(
      distributingProducts
        .filter((item) => selectedItems.includes(item.id))
        .concat(distributableProducts)
    );
    setDistributingProducts(
      distributingProducts.filter((item) => !selectedItems.includes(item.id))
    );
  };

  const onSubmit = (data) => {
    console.log({ ...data, products: distributingProducts });
    dispatch(distributeInventory({ ...data, products: distributingProducts }));
  };

  return (
    <Stack spacing={3}>
      {(loading || distributionLoading) && <LinearProgress />}

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
                <TextField
                  {...field}
                  select
                  label="Distributed To"
                  variant="outlined"
                  error={!!fieldState.error}
                  helperText={fieldState.error?.message}
                  sx={{ flex: 2 }}
                >
                  {distributees.map((user) => (
                    <MenuItem key={user.id} value={user.id}>
                      {user.username}
                    </MenuItem>
                  ))}
                </TextField>
              )}
            />

            <Controller
              name="distributionRoom"
              control={control}
              rules={{ required: "Distribution room number is required" }}
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

      <Box>
        <Typography variant="h6" sx={{ my: 2 }}>
          Distributable Products
        </Typography>
        <DistribuableProductsTable
          data={distributableProducts}
          onAddProductsClick={onAddProductsClick}
        />
      </Box>
    </Stack>
  );
}
export default ProductDistributionPage;
