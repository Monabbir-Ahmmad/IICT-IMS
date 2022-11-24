import { Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import moment from "moment";
import { useMemo } from "react";
import { currencyFormatter } from "../../../utils/utilities";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";

function ReceiveDetailsProductTable({ data = [], onRowClick }) {
  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        headerAlign: "center",
        align: "center",
        minWidth: 100,
      },
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
        field: "category",
        headerName: "Category",
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
        field: "price",
        headerName: "Price",
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
        onRowClick={(params) => onRowClick(params.id)}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
export default ReceiveDetailsProductTable;
