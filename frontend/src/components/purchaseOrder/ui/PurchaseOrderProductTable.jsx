import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useMemo } from "react";
import { currencyFormatter } from "../../../utils/utilities";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";

function PurchaseOrderProductTable({ data = [] }) {
  const columns = useMemo(
    () => [
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
        field: "warrantyExpiryDate",
        headerName: "Warranty Expiry Date",
        type: "date",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) =>
          value ? moment(value).format("MMM Do, YYYY") : "N/A",
      },
      {
        field: "unitPrice",
        headerName: "Unit Price",
        type: "number",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) =>
          value ? currencyFormatter().format(value) : "N/A",
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
        field: "totalPrice",
        headerName: "Total Price",
        type: "number",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) =>
          value ? currencyFormatter().format(value) : "N/A",
      },
    ],
    []
  );

  return (
    <Paper variant="outlined">
      <DataGrid
        autoHeight
        disableColumnMenu
        disableColumnFilter
        rows={data}
        columns={columns}
        disableSelectionOnClick
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
export default PurchaseOrderProductTable;
