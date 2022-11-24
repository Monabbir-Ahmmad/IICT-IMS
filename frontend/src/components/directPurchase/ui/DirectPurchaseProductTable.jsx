import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { alpha, Box, Button, Paper, Typography } from "@mui/material";
import { MdDelete as DeleteIcon, MdAdd as AddIcon } from "react-icons/md";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";
import { currencyFormatter } from "../../../utils/utilities";
import { useState } from "react";
import moment from "moment";

function CustomeToolbar({
  onAddNewRowClick,
  onSelectedRowDeleteClick,
  selectedRows,
}) {
  return (
    <GridToolbarContainer
      sx={{
        bgcolor: (theme) =>
          selectedRows.length > 0 &&
          alpha(
            theme.palette.primary.main,
            theme.palette.action.activatedOpacity
          ),
      }}
    >
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        sx={{ m: 1.5, mr: "auto" }}
        onClick={onAddNewRowClick}
      >
        Add Product
      </Button>

      {selectedRows.length > 0 && (
        <Box
          display={"flex"}
          flexDirection={{ xs: "row-reverse", sm: "row" }}
          alignItems={"center"}
          gap={3}
          m={1.5}
        >
          <Typography>{selectedRows.length} Rows Selected</Typography>
          <Button
            startIcon={<DeleteIcon />}
            variant="contained"
            color="error"
            onClick={() => onSelectedRowDeleteClick(selectedRows)}
          >
            Delete
          </Button>
        </Box>
      )}
    </GridToolbarContainer>
  );
}

const columns = [
  {
    field: "name",
    headerName: "Name",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
    renderCell: RenderCellExpand,
  },
  {
    field: "manufacturer",
    headerName: "Manufacturer",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
    renderCell: RenderCellExpand,
  },
  {
    field: "details",
    headerName: "Details",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
    renderCell: RenderCellExpand,
  },
  {
    field: "unitPrice",
    headerName: "Unit Price",
    type: "number",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
    valueFormatter: ({ value }) => currencyFormatter().format(value),
  },
  {
    field: "quantity",
    headerName: "Quantity",
    type: "number",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
  },
  {
    field: "warrantyExpiryDate",
    headerName: "Warranty Expiry Date",
    type: "date",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
    valueFormatter: ({ value }) =>
      value ? moment(value).format("Do MMMM, YYYY") : "N/A",
  },
  {
    field: "totalPrice",
    headerName: "Subtotal Price",
    type: "number",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
    valueFormatter: ({ value }) => currencyFormatter().format(value),
  },
];

function DirectPurchaseProductTable({
  data = [],
  onAddNewRowClick,
  onSelectedRowDeleteClick,
}) {
  const [selectedRows, setSelectedRows] = useState([]);

  const onSelectionChange = (newSelectedRows) => {
    setSelectedRows(newSelectedRows);
  };

  return (
    <Paper variant="outlined" sx={{ height: 650 }}>
      <DataGrid
        rows={data}
        columns={columns}
        disableColumnMenu
        disableColumnFilter
        checkboxSelection
        disableSelectionOnClick
        hideFooterSelectedRowCount
        getRowId={(row) => row.rowId}
        components={{
          NoRowsOverlay: EmptyTableOverlay,
          Toolbar: CustomeToolbar,
        }}
        componentsProps={{
          toolbar: {
            onAddNewRowClick,
            onSelectedRowDeleteClick,
            selectedRows,
          },
        }}
        onSelectionModelChange={onSelectionChange}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default DirectPurchaseProductTable;
