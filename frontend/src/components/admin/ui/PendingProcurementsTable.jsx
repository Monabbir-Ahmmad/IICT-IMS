import { Button, Chip, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";
import moment from "moment/moment";
import { useMemo } from "react";
import { currencyFormatter, statusColors } from "../../../utils/utilities";

function PendingProcurementsTable({
  data = [],
  onRowClick,
  onApproveClick,
  onRejectClick,
}) {
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
        field: "title",
        headerName: "Title",
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
      },
      {
        field: "createdAt",
        headerName: "Issue Date",
        type: "date",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) => moment(value).format("MMM Do, YYYY"),
      },
      {
        field: "deadline",
        headerName: "Deadline",
        type: "date",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) => moment(value).format("MMM Do, YYYY"),
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
      {
        field: "status",
        headerName: "Status",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
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

export default PendingProcurementsTable;
