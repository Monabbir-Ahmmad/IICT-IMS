import { Button, Chip, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";
import moment from "moment/moment";
import { useMemo } from "react";
import { currencyFormatter, statusColors } from "../../../utils/utilities";

function PendingPurchaseOrdersTable({
  data = [],
  onApproveClick,
  onRejectClick,
  onRowClick,
}) {
  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
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
        valueGetter: ({ row }) => row?.title,
        renderCell: RenderCellExpand,
      },
      {
        field: "category",
        headerName: "Category",
        flex: 1,
        minWidth: 100,
        headerAlign: "center",
        align: "center",
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
          <Chip variant="outlined" label={value} color={statusColors[value]} />
        ),
      },
      {
        field: "actions",
        headerName: "Actions",
        type: "actions",
        flex: 1,
        minWidth: 100,
        getActions: (params) => [
          <Button
            variant="contained"
            color="primary"
            size="small"
            onClick={() => onApproveClick(params.id)}
          >
            Approve
          </Button>,
          <Button
            variant="contained"
            color="error"
            size="small"
            onClick={() => onRejectClick(params.id)}
          >
            Reject
          </Button>,
        ],
      },
    ],
    [onApproveClick, onRejectClick]
  );

  return (
    <Paper variant="outlined" sx={{ height: 600 }}>
      <DataGrid
        rows={data}
        columns={columns}
        disableSelectionOnClick
        onRowClick={(params) => onRowClick(params.id)}
        components={{
          NoRowsOverlay: EmptyTableOverlay,
        }}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default PendingPurchaseOrdersTable;
