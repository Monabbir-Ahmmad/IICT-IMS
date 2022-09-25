import { Button, Chip, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";
import { currencyFormatter } from "../../../utils/utilities";
import moment from "moment/moment";
import { useMemo } from "react";

function PurchaseOrderTable({
  data = [],
  onRowOpenClick,
  onDeliveryReceiveConfirmClick,
}) {
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
        headerName: "Total Price",
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
          <Chip
            variant="outlined"
            label={value}
            color={
              value === "Pending"
                ? "warning"
                : value === "Delivery Sent"
                ? "info"
                : "success"
            }
          />
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        flex: 1,
        minWidth: 100,
        getActions: ({ row }) => [
          <Button
            variant="contained"
            color={row.status === "Delivery Completed" ? "success" : "primary"}
            onClick={() => onDeliveryReceiveConfirmClick(row.id)}
          >
            {row.status === "Delivery Completed" ? "Received" : "Confirm"}
          </Button>,
        ],
      },
    ],
    [onDeliveryReceiveConfirmClick]
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
