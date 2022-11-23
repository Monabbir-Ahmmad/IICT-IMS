import { Button, Paper } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import EmptyTableOverlay from "../../shared/dataTable/EmptyTableOverlay";
import RenderCellExpand from "../../shared/dataTable/RenderCellExpand";
import moment from "moment/moment";
import { useMemo } from "react";

function PendingSuppliersTable({ data = [], onApproveClick, onRejectClick }) {
  const columns = useMemo(
    () => [
      {
        field: "id",
        headerName: "ID",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
      },
      {
        field: "companyName",
        headerName: "Company Name",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        renderCell: RenderCellExpand,
      },
      {
        field: "email",
        headerName: "Email",
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
        field: "bin",
        headerName: "BIN",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
      },
      {
        field: "contactNumber",
        headerName: "Contact Number",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        renderCell: RenderCellExpand,
      },
      {
        field: "address",
        headerName: "Address",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueGetter: ({ row }) => (row.address ? row.address : "N/A"),
        renderCell: RenderCellExpand,
      },
      {
        field: "website",
        headerName: "Website",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueGetter: ({ row }) => (row.website ? row.website : "N/A"),
        renderCell: RenderCellExpand,
      },
      {
        field: "createdAt",
        headerName: "Account Created At",
        type: "date",
        headerAlign: "center",
        align: "center",
        flex: 1,
        minWidth: 100,
        valueFormatter: ({ value }) => moment(value).format("MMM Do, YYYY"),
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
        components={{
          NoRowsOverlay: EmptyTableOverlay,
        }}
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

export default PendingSuppliersTable;
