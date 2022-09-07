import { DataGrid } from "@mui/x-data-grid";
import { currencyFormatter } from "../../../utils/utilities";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";

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

function ProcurementTable({ data = [], onRowSelectionChange }) {
  return (
    <div style={{ height: 650, width: "100%" }}>
      <DataGrid
        rows={data}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        components={{
          NoRowsOverlay: EmptyTableOverlay,
        }}
        onSelectionModelChange={onRowSelectionChange}
        sx={{ border: 0 }}
      />
    </div>
  );
}

export default ProcurementTable;
