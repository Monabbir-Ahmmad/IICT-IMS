import { Chip, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";
import { currencyFormatter, statusColors } from "../../../utils/utilities";
import moment from "moment/moment";
import { useMemo } from "react";

function OrderRequestTable({ data = [], onRowOpenClick }) {
  const columns = useMemo(
    () => [
      {
        field: "title",
        headerName: "Title",
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        valueGetter: ({ row }) => row?.procurement?.title,
        renderCell: RenderCellExpand,
      },
      {
        field: "createdAt",
        headerName: "Order Date",
        type: "date",
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => moment(value).format("MMM Do, YYYY"),
      },
      {
        field: "deliveryDeadline",
        headerName: "Delivery Deadline",
        type: "date",
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => moment(value).format("MMM Do, YYYY"),
      },
      {
        field: "deliveryDate",
        headerName: "Delivery Date",
        type: "date",
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) =>
          value ? moment(value).format("MMM Do, YYYY") : "N/A",
      },
      {
        field: "totalPrice",
        headerName: "Subtotal Price",
        type: "number",
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        valueFormatter: ({ value }) => currencyFormatter().format(value),
      },

      {
        field: "status",
        headerName: "Status",
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        renderCell: ({ value }) => (
          <Chip variant="outlined" label={value} color={statusColors[value]} />
        ),
      },
    ],
    []
  );

  return (
    <Paper variant="outlined" sx={{ height: 650 }}>
      <DataGrid
        rows={data}
        columns={columns}
        disableSelectionOnClick
        components={{
          NoRowsOverlay: EmptyTableOverlay,
        }}
        onRowClick={(params) => onRowOpenClick(params.id)}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}
export default OrderRequestTable;
