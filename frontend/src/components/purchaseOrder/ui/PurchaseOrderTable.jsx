import { Chip, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";
import { currencyFormatter, statusColors } from "../../../utils/utilities";
import moment from "moment/moment";
import { useMemo } from "react";

function PurchaseOrderTable({ data = [], onRowOpenClick }) {
  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
      },
      {
        field: "title",
        headerName: "Title",
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        renderCell: RenderCellExpand,
      },
      {
        field: "supplier",
        headerName: "Supplier",
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
        valueGetter: ({ row }) => row?.supplier?.companyName,
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
      {
        field: "isApproved",
        headerName: "Approval",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        renderCell: ({ value }) => (
          <Chip
            variant="outlined"
            label={value ? "Approved" : "Pending"}
            color={statusColors[value ? "Approved" : "Pending"]}
          />
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
export default PurchaseOrderTable;
