import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { currencyFormatter } from "../../../utils/utilities";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";

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
    field: "estimatedPrice",
    headerName: "Estimated Price",
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
    field: "estimatedTotalPrice",
    headerName: "Estimated Total Price",
    type: "number",
    headerAlign: "center",
    align: "center",
    flex: 1,
    minWidth: 100,
    valueFormatter: ({ value }) => currencyFormatter().format(value),
  },
];

function QuotationOfferProductTable({ data = [] }) {
  return (
    <Paper variant="outlined">
      <DataGrid
        autoHeight
        rows={data}
        columns={columns}
        disableSelectionOnClick
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
export default QuotationOfferProductTable;
