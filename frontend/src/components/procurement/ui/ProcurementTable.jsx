import { Button } from "@mui/material";
import { DataGrid, GridFooter, GridFooterContainer } from "@mui/x-data-grid";
import { RiDeleteBinLine as DeleteIcon } from "react-icons/ri";
import { currencyFormatter } from "../../../utils/utilities";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";

function CustomeFooter({ onSelectedRowDeleteClick, selectedRows }) {
  return (
    <GridFooterContainer>
      {selectedRows.length > 0 && (
        <Button
          startIcon={<DeleteIcon />}
          variant="outlined"
          color="error"
          size="small"
          sx={{ mx: 1 }}
          onClick={onSelectedRowDeleteClick}
        >
          Delete selected rows
        </Button>
      )}
      <GridFooter sx={{ border: "none", flex: 1 }} />
    </GridFooterContainer>
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
    headerName: "Estimated price",
    valueFormatter: ({ value }) => currencyFormatter().format(value),
    type: "number",
    width: 150,
  },
  { field: "quantity", headerName: "Quantity", type: "number", width: 150 },
  {
    field: "totalEstimatedPrice",
    headerName: "Total Estimated Price",
    valueFormatter: ({ value }) => currencyFormatter().format(value),
    type: "number",
    width: 200,
  },
];

function ProcurementTable({
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
        components={{
          NoRowsOverlay: EmptyTableOverlay,
          Footer: CustomeFooter,
        }}
        componentsProps={{
          footer: {
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

export default ProcurementTable;
