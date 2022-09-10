import { DataGrid, GridToolbarContainer } from "@mui/x-data-grid";
import { alpha, Button, Typography } from "@mui/material";
import { MdDelete as DeleteIcon } from "react-icons/md";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";
import { currencyFormatter } from "../../../utils/utilities";

function CustomeToolbar({ onSelectedRowDeleteClick, selectedRows }) {
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
      {selectedRows.length > 0 ? (
        <>
          <Typography sx={{ m: 2, mr: "auto" }}>
            {selectedRows.length} Rows Selected
          </Typography>
          <Button
            startIcon={<DeleteIcon />}
            variant="contained"
            color="error"
            size="small"
            sx={{ mx: 2 }}
            onClick={onSelectedRowDeleteClick}
          >
            Delete
          </Button>
        </>
      ) : (
        <Typography sx={{ m: 2 }}>Product List</Typography>
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
    valueFormatter: ({ value }) => currencyFormatter().format(value),
    type: "number",
    width: 150,
  },
  { field: "quantity", headerName: "Quantity", type: "number", width: 150 },
  {
    field: "estimatedTotalPrice",
    headerName: "Estimated Total Price",
    valueFormatter: ({ value }) => currencyFormatter().format(value),
    type: "number",
    width: 200,
  },
];

function ProcurementProductTable({
  data = [],
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
