import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { alpha, Box, Button, Typography } from "@mui/material";
import { MdDelete as DeleteIcon, MdAdd as AddIcon } from "react-icons/md";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";
import { currencyFormatter } from "../../../utils/utilities";

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
        Add New Product To List
      </Button>

      {selectedRows.length > 0 && (
        <Box display={"flex"} alignItems={"center"} gap={3} m={1.5}>
          <Typography>{selectedRows.length} Rows Selected</Typography>
          <Button
            startIcon={<DeleteIcon />}
            variant="contained"
            color="error"
            onClick={onSelectedRowDeleteClick}
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
    width: 300,
    renderCell: RenderCellExpand,
  },
  {
    field: "manufacturer",
    headerName: "Manufacturer",
    renderCell: RenderCellExpand,
    width: 200,
  },
  {
    field: "details",
    headerName: "Details",
    width: 400,
    renderCell: RenderCellExpand,
  },
  {
    field: "estimatedPrice",
    headerName: "Estimated Price",
    type: "number",
    width: 150,
    valueFormatter: ({ value }) => currencyFormatter().format(value),
  },
  { field: "quantity", headerName: "Quantity", type: "number", width: 150 },
  {
    field: "estimatedTotalPrice",
    headerName: "Estimated Total Price",
    type: "number",
    width: 200,
    valueFormatter: ({ value }) => currencyFormatter().format(value),
  },
];

function ProcurementProductTable({
  data = [],
  onAddNewRowClick,
  onRowSelectionChange,
  onSelectedRowDeleteClick,
  selectedRows,
}) {
  return (
    <div style={{ height: 650, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        hideFooterSelectedRowCount
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
        onSelectionModelChange={onRowSelectionChange}
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default ProcurementProductTable;
