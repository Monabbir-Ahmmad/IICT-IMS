import { MdAdd as AddIcon, MdPublish as UploadIcon } from "react-icons/md";
import {
  Button,
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
import { useState } from "react";
import { currencyFormatter } from "../../../utils/utilities";

function ProcurementCreatePage() {
  const { handleSubmit, control, formState } = useForm({
    defaultValues: {
      title: "",
      tenderingDeadling: "",
      procurementCategoryId: "",
    },
  });
  const [openAddNew, setOpenAddNew] = useState(false);

  const [items, setItems] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const onAddNewItemSubmit = (newItem) => {
    setItems([
      ...items,
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
    setItems(items.filter((item) => !selectedRows.includes(item.id)));
    setSelectedRows([]);
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <Stack spacing={3}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Button
          type="submit"
          disabled={items.length === 0 || !formState.errors}
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
                  items.reduce((acc, item) => acc + item.estimatedTotalPrice, 0)
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
                  <MenuItem value={1}>Category 1</MenuItem>
                </TextField>
              )}
            />

            <Controller
              name="tentderingDeadline"
              control={control}
              rules={{ required: "Tendering deadline is required" }}
              render={({ field, fieldState }) => (
                <LocalizationProvider dateAdapter={AdapterMoment}>
                  <DatePicker
                    disablePast
                    label="Tendering Deadline"
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

      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ justifySelf: "start" }}
        onClick={() => setOpenAddNew(true)}
      >
        Add Products To List
      </Button>

      <ProcurementProductAdder
        open={openAddNew}
        onSubmit={onAddNewItemSubmit}
        onCancel={() => setOpenAddNew(false)}
      />

      <Paper variant="outlined">
        <ProcurementProductTable
          data={items}
          selectedRows={selectedRows}
          onRowSelectionChange={onRowSelectionChange}
          onSelectedRowDeleteClick={onDeleteSelected}
        />
      </Paper>
    </Stack>
  );
}

export default ProcurementCreatePage;
